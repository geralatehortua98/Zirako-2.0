import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rol = searchParams.get("rol")

    if (rol === 'empresa_recolectora') {
       
        const result = await query<any>(
            `SELECT id, nombre, email 
             FROM usuarios 
             WHERE rol_id = 3`
        )
        return NextResponse.json({ success: true, data: result.rows })
    }
    // --------------------------------------------------------

    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 })
    }

    const result = await query<any>(
      `SELECT id, email, nombre, telefono, ciudad, direccion, foto_perfil, puntos, rol_id, email_verificado, created_at, nombre_empresa, nivel
       FROM usuarios WHERE id = ?`,
      [payload.userId],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    const user = result.rows[0]

    // Stats seguros
    let stats = {}
    try {
        const statsRes = await query<any>(
          `SELECT 
            (SELECT COUNT(*) FROM items WHERE usuario_id = ?) AS total_items,
            (SELECT COUNT(*) FROM recolecciones WHERE usuario_id = ? OR recolector_id = ?) AS total_recolecciones`,
          [payload.userId, payload.userId, payload.userId],
        )
        stats = statsRes.rows[0]
    } catch (e) {
        console.log("Error cargando stats secundarias")
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        estadisticas: stats,
      },
    })
  } catch (error) {
    console.error("[API USERS] Error general:", error)
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}


export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const body = await request.json()
    const { nombre, telefono, ciudad, direccion, foto_perfil, nombre_empresa } = body

    await query(
      `UPDATE usuarios SET 
        nombre = COALESCE(?, nombre),
        telefono = COALESCE(?, telefono),
        ciudad = COALESCE(?, ciudad),
        direccion = COALESCE(?, direccion),
        foto_perfil = COALESCE(?, foto_perfil),
        nombre_empresa = COALESCE(?, nombre_empresa)
      WHERE id = ?`,
      [nombre, telefono, ciudad, direccion, foto_perfil, nombre_empresa, payload.userId],
    )

    return NextResponse.json({ success: true, message: "Perfil actualizado" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}