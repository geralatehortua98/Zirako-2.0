import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

// GET /api/items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const status = searchParams.get("status") || "disponible"
    const type = searchParams.get("type") // <--- NUEVO: Recibir tipo
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? parseInt(limitParam, 10) : 50
    const excludeUserIdParam = searchParams.get("excludeUserId")
    const excludeUserId = excludeUserIdParam ? parseInt(excludeUserIdParam, 10) : null

    let sql = `
      SELECT 
        i.*,
        u.nombre AS nombre_vendedor,
        u.foto_perfil AS foto_vendedor,
        c.nombre AS nombre_categoria
      FROM items i
      JOIN usuarios u ON i.usuario_id = u.id
      LEFT JOIN categorias c ON i.categoria_id = c.id
      WHERE i.estado = ?
    `
    const params: any[] = [status]

    // --- LOGICA DE FILTRADO POR TIPO ---
    if (type) {
        sql += " AND i.tipo = ?"
        params.push(type)
    }
    // -----------------------------------

    if (excludeUserId !== null && !isNaN(excludeUserId)) {
        sql += " AND i.usuario_id != ?"
        params.push(excludeUserId)
    }
    if (category && category !== 'todas') {
      const catId = parseInt(category, 10)
      if (!isNaN(catId)) {
          sql += " AND i.categoria_id = ?"
          params.push(catId)
      }
    }
    if (search) {
      sql += " AND (i.titulo LIKE ? OR i.descripcion LIKE ? OR c.nombre LIKE ?)"
      const term = `%${search}%`
      params.push(term, term, term)
    }

    sql += ` ORDER BY i.created_at DESC LIMIT ${limit}`

    const result = await query<any>(sql, params)
    const rows = result.rows || result; 

    const items = Array.isArray(rows) ? rows.map((item: any) => ({
      ...item,
      imagenes: typeof item.imagenes === "string" ? JSON.parse(item.imagenes) : item.imagenes,
    })) : []

    return NextResponse.json({ success: true, data: items })

  } catch (error: any) {
    console.error("[API ITEMS] Error:", error)
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}

// POST /api/items 
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    let userId = null

    if (token) {
        const payload = verifyToken(token)
        if (payload) userId = payload.userId
    }

    const body = await request.json()
    const finalUserId = userId || body.userId;

    if (!finalUserId) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    }

    const { titulo, descripcion, categoria_id, tipo, condicion, precio, ciudad, imagenes } = body

    if (!titulo || !descripcion || !categoria_id || !ciudad) {
      return NextResponse.json({ success: false, error: "Datos incompletos" }, { status: 400 })
    }

    const catId = Number(categoria_id);
    const catFinal = isNaN(catId) ? 11 : catId;

    const result = await query<any>(
      `INSERT INTO items (usuario_id, categoria_id, titulo, descripcion, tipo, condicion, precio, ciudad, imagenes, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'disponible')`,
      [
        finalUserId, 
        catFinal, 
        titulo, 
        descripcion, 
        tipo, 
        condicion, 
        precio || 0, 
        ciudad, 
        JSON.stringify(imagenes || [])
      ],
    )
    
    const insertId = (result as any).insertId || (result as any).rows?.insertId;

    return NextResponse.json({ success: true, message: "Publicado", data: { id: insertId } }, { status: 201 })
  } catch (error: any) {
    console.error("[API ITEMS POST] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}