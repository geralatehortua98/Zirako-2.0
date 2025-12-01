import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

// Obtener perfil
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)
    if (!payload) return NextResponse.json({ success: false, error: "Sesión expirada" }, { status: 401 })


    const userResult = await query<any>(
      `SELECT id, nombre, email, telefono, ciudad, direccion, foto_perfil, puntos, created_at 
       FROM usuarios WHERE id = ?`,
      [payload.userId],
    )

    if (userResult.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
    }

    const usuario = userResult.rows[0]
    
    // Cálculos de nivel y estadísticas
    const nivel = calcularNivel(usuario.puntos || 0)
    
    let stats = { total_articulos: 0, total_intercambios: 0, total_recolecciones: 0 }
    try {
        const statsResult = await query<any>(
          `SELECT 
            (SELECT COUNT(*) FROM items WHERE usuario_id = ?) AS total_articulos,
            (SELECT COUNT(*) FROM intercambios WHERE usuario_propone_id = ? OR usuario_recibe_id = ?) AS total_intercambios,
            (SELECT COUNT(*) FROM recolecciones WHERE usuario_id = ? OR recolector_id = ?) AS total_recolecciones`,
          [payload.userId, payload.userId, payload.userId, payload.userId, payload.userId],
        )
        const raw = statsResult.rows[0] || {}
        stats = {
            total_articulos: Number(raw.total_articulos) || 0,
            total_intercambios: Number(raw.total_intercambios) || 0,
            total_recolecciones: Number(raw.total_recolecciones) || 0
        }
    } catch (e) {}

    let impacto = { total_co2_ahorrado: 0, acciones: { donaciones: 0, ventas: 0, intercambios: 0, recolecciones: 0 } }
    try {
        const impactoResult = await query<any>(
          `SELECT 
            COALESCE(SUM(co2_ahorrado), 0) AS total_co2,
            COUNT(CASE WHEN tipo_accion = 'donacion' THEN 1 END) AS acciones_donacion,
            COUNT(CASE WHEN tipo_accion = 'venta' THEN 1 END) AS acciones_venta,
            COUNT(CASE WHEN tipo_accion = 'intercambio' THEN 1 END) AS acciones_intercambio,
            COUNT(CASE WHEN tipo_accion = 'recoleccion' THEN 1 END) AS acciones_recoleccion
           FROM impacto_ambiental WHERE usuario_id = ?`,
          [payload.userId],
        )
        const rawImp = impactoResult.rows[0] || {}
        impacto = {
            total_co2_ahorrado: Number(rawImp.total_co2) || 0,
            acciones: {
                donaciones: Number(rawImp.acciones_donacion) || 0,
                ventas: Number(rawImp.acciones_venta) || 0,
                intercambios: Number(rawImp.acciones_intercambio) || 0,
                recolecciones: Number(rawImp.acciones_recoleccion) || 0,
            }
        }
    } catch (e) {}

    return NextResponse.json({
      success: true,
      data: {
        ...usuario,
        nivel: nivel,
        nivel_nombre: obtenerNombreNivel(nivel),
        puntos_siguiente_nivel: puntosParaSiguienteNivel(usuario.puntos || 0),
        estadisticas: stats,
        impacto_ambiental: impacto,
      },
    })
  } catch (error) {
    console.error("[API PERFIL] Error:", error)
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}

// Actualizar perfil
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)

    const body = await request.json()

    const { nombre, telefono, ciudad, direccion, foto_perfil } = body

  
    await query(
      `UPDATE usuarios SET 
        nombre = COALESCE(?, nombre),
        telefono = COALESCE(?, telefono),
        ciudad = COALESCE(?, ciudad),
        direccion = COALESCE(?, direccion),
        foto_perfil = COALESCE(?, foto_perfil)
      WHERE id = ?`,
      [
        nombre || null, 
        telefono || null, 
        ciudad || null, 
        direccion || null, 
        foto_perfil || null, 
        payload.userId
      ],
    )

    return NextResponse.json({ success: true, message: "Perfil actualizado correctamente" })
  } catch (error) {
    console.error("Error actualizando perfil:", error)
    return NextResponse.json({ success: false, error: "Error interno al actualizar" }, { status: 500 })
  }
}

// Funciones auxiliares (Sin cambios)
function calcularNivel(puntos: number): number {
  if (puntos >= 5000) return 5
  if (puntos >= 2000) return 4
  if (puntos >= 1000) return 3
  if (puntos >= 500) return 2
  return 1
}

function obtenerNombreNivel(nivel: number): string {
  const niveles: Record<number, string> = { 1: "Bronce", 2: "Plata", 3: "Oro", 4: "Platino", 5: "Diamante" }
  return niveles[nivel] || "Bronce"
}

function puntosParaSiguienteNivel(puntos: number): number {
  if (puntos >= 5000) return 0
  if (puntos >= 2000) return 5000 - puntos
  if (puntos >= 1000) return 2000 - puntos
  if (puntos >= 500) return 1000 - puntos
  return 500 - puntos
}