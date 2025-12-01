import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"


export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "Auth requerida" }, { status: 401 })
    const payload = verifyToken(token)

    // Buscar Ventas Pendientes
    const ventas = await query<any>(
        `SELECT v.id, v.created_at, v.precio_final as valor, v.notas as mensaje, 'venta' as tipo,
                i.titulo as item_titulo, i.imagenes as item_imagenes,
                u.nombre as solicitante_nombre
         FROM ventas v
         JOIN items i ON v.item_id = i.id
         JOIN usuarios u ON v.comprador_id = u.id
         WHERE v.vendedor_id = ? AND v.estado = 'pendiente'`,
        [payload.userId]
    )

    // Buscar Donaciones Pendientes
    const donaciones = await query<any>(
        `SELECT d.id, d.created_at, 0 as valor, d.mensaje, 'donacion' as tipo,
                i.titulo as item_titulo, i.imagenes as item_imagenes,
                u.nombre as solicitante_nombre
         FROM donaciones d
         JOIN items i ON d.item_id = i.id
         JOIN usuarios u ON d.receptor_id = u.id
         WHERE d.donante_id = ? AND d.estado = 'pendiente'`,
        [payload.userId]
    )

    const todas = [...ventas.rows, ...donaciones.rows].map(s => ({
        ...s,
        item_imagenes: typeof s.item_imagenes === 'string' ? JSON.parse(s.item_imagenes) : s.item_imagenes
    }))

    todas.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json({ success: true, data: todas })

  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al cargar solicitudes" }, { status: 500 })
  }
}

//  Aceptar o Rechazar
export async function PUT(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth-token")?.value
        if (!token) return NextResponse.json({ success: false }, { status: 401 })
        const payload = verifyToken(token)

        const body = await request.json()
        const { id, tipo, accion } = body

        if(accion === 'rechazar') {
            const tabla = tipo === 'venta' ? 'ventas' : 'donaciones'
            await query(`UPDATE ${tabla} SET estado = 'cancelada' WHERE id = ?`, [id])
            return NextResponse.json({ success: true, message: "Solicitud rechazada" })
        }

        // --- SI SE ACEPTA:LIMPIAR ---
        if (accion === 'aceptar') {
            let solicitud = null
            let puntos = 0
            let co2 = 0
            
            if (tipo === 'venta') {
                const res = await query<any>("SELECT * FROM ventas WHERE id = ?", [id])
                solicitud = res.rows[0]
                puntos = 10; co2 = 1.0;
                await query("UPDATE ventas SET estado = 'completada' WHERE id = ?", [id])
            } else {
                const res = await query<any>("SELECT * FROM donaciones WHERE id = ?", [id])
                solicitud = res.rows[0]
                puntos = 30; co2 = 3.0;
                await query("UPDATE donaciones SET estado = 'completada' WHERE id = ?", [id])
            }

            if (!solicitud) throw new Error("Solicitud no encontrada")

            const itemId = solicitud.item_id

            // 1. Marcar Ítem como Completado
            await query("UPDATE items SET estado = 'completado' WHERE id = ?", [itemId])

            // =========================================================
            // 2. BLOQUE ANTI-DOBLE GASTO (Cancelar todo lo demás)
            // =========================================================
            // Cancelar otras ventas
            await query("UPDATE ventas SET estado = 'cancelada' WHERE item_id = ? AND estado = 'pendiente' AND id != ?", [itemId, id]);
            // Cancelar otras donaciones
            await query("UPDATE donaciones SET estado = 'cancelada' WHERE item_id = ? AND estado = 'pendiente' AND id != ?", [itemId, id]);
            // Cancelar intercambios que involucren este ítem
            await query("UPDATE intercambios SET estado = 'cancelada' WHERE (item_ofrecido_id = ? OR item_solicitado_id = ?) AND estado = 'pendiente'", [itemId, itemId]);
            // =========================================================

            // 3. Puntos e Impacto
            await query("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?", [puntos, payload.userId])
            await query(
                `INSERT INTO impacto_ambiental (usuario_id, item_id, tipo_accion, co2_ahorrado, descripcion)
                 VALUES (?, ?, ?, ?, ?)`,
                [payload.userId, itemId, tipo, co2, `${tipo} completada`]
            )

            return NextResponse.json({ success: true, message: "Ciclo completado con éxito." })
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: "Error procesando solicitud" }, { status: 500 })
    }
}