import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { sendCollectionConfirmationEmail } from "@/lib/email"

// --- Genera código único asegurando que no exista ---
async function generarCodigoUnico(): Promise<string> {
  let codigo = "";
  let existe = true;
  
  while (existe) {
    const random = Math.floor(10000 + Math.random() * 90000); // Ej: 54823
    codigo = `REC-${random}`;
    
    const check = await query<any>("SELECT id FROM recolecciones WHERE codigo_recoleccion = ?", [codigo]);
    if (check.rows.length === 0) {
      existe = false; // ¡Está libre!
    }
  }
  return codigo;
}

// GET
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)
    if (!payload) return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 })

    let sql = `
      SELECT 
        r.*, 
        u_rec.nombre as recolector_nombre,
        u_sol.nombre as solicitante_nombre,
        u_sol.telefono as solicitante_telefono
      FROM recolecciones r
      LEFT JOIN usuarios u_rec ON r.recolector_id = u_rec.id
      LEFT JOIN usuarios u_sol ON r.usuario_id = u_sol.id
      WHERE 1=1
    `
    const params: any[] = []

    sql += " AND (r.usuario_id = ? OR r.recolector_id = ?)"
    params.push(payload.userId, payload.userId)

    sql += " ORDER BY r.created_at DESC"

    const result = await query<any>(sql, params)
    return NextResponse.json({ success: true, data: result.rows })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al obtener recolecciones" }, { status: 500 })
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)
    if (!payload) return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 })

    const body = await request.json()
    const { direccion, ciudad, fecha, horario, descripcion, recolector_id, tipo_material } = body

    if (!direccion || !fecha || !recolector_id) return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 })

    const fechaProgramada = new Date(fecha).toISOString().split("T")[0]
    
    const codigoRecoleccion = await generarCodigoUnico(); 

    await query<any>(
      `INSERT INTO recolecciones (usuario_id, recolector_id, codigo_recoleccion, direccion, ciudad, fecha_programada, horario_preferido, descripcion, tipo_material, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')`,
      [payload.userId, recolector_id, codigoRecoleccion, direccion, ciudad, fechaProgramada, horario, descripcion, tipo_material || 'Mezclado'],
    )

    // Notificación por correo
    const empresaResult = await query<any>("SELECT email, nombre FROM usuarios WHERE id = ?", [recolector_id]);
    
    if (empresaResult.rows.length > 0) {
        try {
            await sendCollectionConfirmationEmail(
                payload.email, 
                payload.name, 
                empresaResult.rows[0].email, 
                empresaResult.rows[0].nombre, 
                codigoRecoleccion, 
                fechaProgramada, 
                horario, 
                direccion, 
                ciudad, 
                descripcion
            )
        } catch(e) {
            console.error("Error enviando email recolección", e)
        }
    }

    return NextResponse.json({ success: true, message: "Recolección programada", data: { id: codigoRecoleccion } }, { status: 201 })
  } catch (error: any) {
    console.error("Error en POST Collection:", error)
    return NextResponse.json({ success: false, error: "Error al programar: " + error.message }, { status: 500 })
  }
}

// PUT
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const body = await request.json()
    const { id, estado } = body

    const recCheck = await query<any>("SELECT * FROM recolecciones WHERE id = ?", [id])
    if (recCheck.rows.length === 0) return NextResponse.json({ success: false, error: "No encontrado" }, { status: 404 })
    const recoleccion = recCheck.rows[0]

    if (Number(recoleccion.recolector_id) !== Number(payload.userId)) {
        return NextResponse.json({ success: false, error: "No tienes permiso" }, { status: 403 })
    }

    await query("UPDATE recolecciones SET estado = ? WHERE id = ?", [estado, id])

    if (estado === 'completada') {
        // Puntos y CO2
        await query("UPDATE usuarios SET puntos = puntos + 50 WHERE id = ?", [recoleccion.usuario_id])
        await query(
            `INSERT INTO impacto_ambiental (usuario_id, tipo_accion, co2_ahorrado, descripcion) 
             VALUES (?, 'recoleccion', 10.0, ?)`,
            [recoleccion.usuario_id, `Recolección ${recoleccion.codigo_recoleccion} completada`]
        )
        // Puntos para la empresa 
        await query("UPDATE usuarios SET puntos = puntos + 30 WHERE id = ?", [recoleccion.recolector_id])
    }

    return NextResponse.json({ success: true, message: "Estado actualizado" })

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}