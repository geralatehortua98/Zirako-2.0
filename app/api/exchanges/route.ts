import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { sendExchangeRequestEmail } from "@/lib/email"
import { cookies } from "next/headers"

// GET
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let sql = `
      SELECT 
        i.*,
        io.titulo AS titulo_ofrecido,
        io.imagenes AS imagenes_ofrecido,
        is2.titulo AS titulo_solicitado,
        is2.imagenes AS imagenes_solicitado,
        up.nombre AS nombre_propone,
        ur.nombre AS nombre_recibe
      FROM intercambios i
      JOIN items io ON i.item_ofrecido_id = io.id
      JOIN items is2 ON i.item_solicitado_id = is2.id
      JOIN usuarios up ON i.usuario_propone_id = up.id
      JOIN usuarios ur ON i.usuario_recibe_id = ur.id
      WHERE i.usuario_propone_id = ? OR i.usuario_recibe_id = ?
    `
    const params: any[] = [payload.userId, payload.userId]

    if (status) {
      sql += " AND i.estado = ?"
      params.push(status)
    }
    sql += " ORDER BY i.created_at DESC"

    const result = await query<any>(sql, params)
    const exchanges = result.rows.map((ex: any) => ({
      ...ex,
      imagenes_ofrecido: typeof ex.imagenes_ofrecido === "string" ? JSON.parse(ex.imagenes_ofrecido) : ex.imagenes_ofrecido,
      imagenes_solicitado: typeof ex.imagenes_solicitado === "string" ? JSON.parse(ex.imagenes_solicitado) : ex.imagenes_solicitado,
    }))

    return NextResponse.json({ success: true, data: exchanges })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al obtener intercambios" }, { status: 500 })
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const body = await request.json()
    const { item_ofrecido_id, item_solicitado_id, mensaje } = body

    if (!item_ofrecido_id || !item_solicitado_id) return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 })

    const itemSolicitado = await query<any>("SELECT usuario_id, titulo FROM items WHERE id = ?", [item_solicitado_id])
    
    await query(
      `INSERT INTO intercambios (item_ofrecido_id, item_solicitado_id, usuario_propone_id, usuario_recibe_id, mensaje, estado)
       VALUES (?, ?, ?, ?, ?, 'pendiente')`,
      [item_ofrecido_id, item_solicitado_id, payload.userId, itemSolicitado.rows[0].usuario_id, mensaje || null],
    )

    // Email...
    try {
      const userRecibe = await query<any>("SELECT email, nombre FROM usuarios WHERE id = ?", [itemSolicitado.rows[0].usuario_id])
      const itemOfrecido = await query<any>("SELECT titulo FROM items WHERE id = ?", [item_ofrecido_id])
      
      if (userRecibe.rows.length > 0) {
        await sendExchangeRequestEmail(
          userRecibe.rows[0].email, userRecibe.rows[0].nombre, itemSolicitado.rows[0].titulo, payload.name, itemOfrecido.rows[0].titulo
        )
      }
    } catch (e) { console.error("Email error", e) }

    return NextResponse.json({ success: true, message: "Propuesta enviada" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}

// PUT: Aceptar/Rechazar Intercambio
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const body = await request.json()
    const { id, estado } = body

    const resEx = await query<any>("SELECT * FROM intercambios WHERE id = ?", [id])
    if (resEx.rows.length === 0) return NextResponse.json({ success: false, error: "No encontrado" }, { status: 404 })
    const exchange = resEx.rows[0]

    if (Number(exchange.usuario_recibe_id) !== Number(payload.userId)) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 403 })
    }

    await query("UPDATE intercambios SET estado = ? WHERE id = ?", [estado, id])

    // --- SI SE ACEPTA: DOBLE LIMPIEZA ---
    if (estado === "aceptado" || estado === "completado") {
        
        // 1. Dar de baja AMBOS ítems
        await query("UPDATE items SET estado = 'completado' WHERE id IN (?, ?)", [exchange.item_ofrecido_id, exchange.item_solicitado_id])

      
        const itemsInvolucrados = [exchange.item_ofrecido_id, exchange.item_solicitado_id];

        for (const itemId of itemsInvolucrados) {
            // Cancelar ventas
            await query("UPDATE ventas SET estado = 'cancelada' WHERE item_id = ? AND estado = 'pendiente'", [itemId]);
            // Cancelar donaciones
            await query("UPDATE donaciones SET estado = 'cancelada' WHERE item_id = ? AND estado = 'pendiente'", [itemId]);
            // Cancelar OTROS intercambios (excluyendo el actual)
            await query("UPDATE intercambios SET estado = 'cancelada' WHERE (item_ofrecido_id = ? OR item_solicitado_id = ?) AND estado = 'pendiente' AND id != ?", [itemId, itemId, id]);
        }
        // =================================================================================

        // 2. Puntos e Impacto
        await query("UPDATE usuarios SET puntos = puntos + 20 WHERE id IN (?, ?)", [exchange.usuario_propone_id, exchange.usuario_recibe_id])
        
        await query(
            `INSERT INTO impacto_ambiental (usuario_id, item_id, tipo_accion, co2_ahorrado, descripcion) 
             VALUES (?, ?, 'intercambio', 5.0, 'Intercambio completado')`,
            [exchange.usuario_propone_id, exchange.item_ofrecido_id]
        )
        await query(
            `INSERT INTO impacto_ambiental (usuario_id, item_id, tipo_accion, co2_ahorrado, descripcion) 
             VALUES (?, ?, 'intercambio', 5.0, 'Intercambio completado')`,
            [exchange.usuario_recibe_id, exchange.item_solicitado_id]
        )
    }

    return NextResponse.json({ success: true, message: `Intercambio ${estado}` })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}