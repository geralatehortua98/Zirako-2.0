import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

// GET /api/items/mis-articulos
export async function GET(request: NextRequest) {
  try {
    // 1. Obtener ID del usuario
    let userId = null
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (token) {
      const payload = verifyToken(token)
      if (payload) userId = payload.userId
    }

    if (!userId) {
      // Respaldo para desarrollo: leer de URL
      const { searchParams } = new URL(request.url)
      const paramId = searchParams.get("userId")
      if (paramId) userId = Number(paramId)
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: "Usuario no identificado" }, { status: 401 })
    }

    // 2. AUMENTAR MEMORIA DE ORDENAMIENTO (SOLUCIÓN AL ERROR)
    // Intentamos asignar 4MB de buffer solo para esta sesión
    try {
        await query("SET SESSION sort_buffer_size = 1024 * 1024 * 4"); 
    } catch (e) {
        console.warn("No se pudo ajustar el sort_buffer_size, continuando...");
    }

    // 3. Consulta a la Base de Datos
    const sql = `
      SELECT 
        i.id, i.titulo, i.precio, i.ciudad, i.condicion, i.estado, i.tipo, i.created_at, i.vistas, i.imagenes,
        COALESCE(c.nombre, 'General') AS nombre_categoria
      FROM items i
      LEFT JOIN categorias c ON i.categoria_id = c.id
      WHERE i.usuario_id = ?
      ORDER BY i.created_at DESC
    `
    
    const result = await query<any>(sql, [userId])
    const rows = result.rows || result;

    const items = Array.isArray(rows) ? rows.map((item: any) => {
      let imagenesParsed = []
      try {
        imagenesParsed = typeof item.imagenes === "string" 
          ? JSON.parse(item.imagenes) 
          : item.imagenes || []
      } catch (e) {
        imagenesParsed = []
      }

      return {
        ...item,
        imagenes: imagenesParsed,
        precio: Number(item.precio) || 0
      }
    }) : []

    return NextResponse.json({ success: true, data: items })

  } catch (error: any) {
    console.error("[API MIS-ARTICULOS] Error CRÍTICO:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Error: " + (error.sqlMessage || error.message)
    }, { status: 500 })
  }
}