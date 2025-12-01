import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await params
    const result = await query<any>(
      `SELECT i.*, u.id AS vendedor_id, u.nombre AS nombre_vendedor, u.email AS email_vendedor, u.foto_perfil AS foto_vendedor, c.nombre AS nombre_categoria, c.id AS categoria_id
      FROM items i JOIN usuarios u ON i.usuario_id = u.id LEFT JOIN categorias c ON i.categoria_id = c.id WHERE i.id = ?`,
      [id],
    )
    if (result.rows.length === 0) return NextResponse.json({ success: false, error: "No encontrado" }, { status: 404 })
    const item = { ...result.rows[0], imagenes: typeof result.rows[0].imagenes === "string" ? JSON.parse(result.rows[0].imagenes) : result.rows[0].imagenes }
    return NextResponse.json({ success: true, data: item })
  } catch (error) { return NextResponse.json({ success: false, error: "Error" }, { status: 500 }) }
}

// Helper para ID
async function getUserId(request: NextRequest): Promise<number | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  if (token) {
    const payload = verifyToken(token)
    if (payload) return payload.userId
  }
  return null
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
    try {
        const { id } = await params
        const userId = await getUserId(request)
        if (!userId) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
        
        const body = await request.json()
        const { titulo, descripcion, precio, estado, imagenes, ciudad, condicion, tipo, categoria_id } = body

        await query(`UPDATE items SET titulo=COALESCE(?,titulo), descripcion=COALESCE(?,descripcion), precio=COALESCE(?,precio), estado=COALESCE(?,estado), ciudad=COALESCE(?,ciudad), condicion=COALESCE(?,condicion), tipo=COALESCE(?,tipo), categoria_id=COALESCE(?,categoria_id), imagenes=COALESCE(?,imagenes) WHERE id = ? AND usuario_id = ?`, 
        [titulo, descripcion, precio, estado, ciudad, condicion, tipo, categoria_id, imagenes ? JSON.stringify(imagenes) : null, id, userId])
        
        return NextResponse.json({ success: true })
    } catch(e) { return NextResponse.json({success: false}, {status: 500}) }
}

// DELETE 
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const userId = await getUserId(request)
        
        if (!userId) {
            return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
        }
        
        // Verificar que sea el dueño
        const itemCheck = await query<any>("SELECT usuario_id FROM items WHERE id = ?", [id])
        if (itemCheck.rows.length === 0 || Number(itemCheck.rows[0].usuario_id) !== Number(userId)) {
            return NextResponse.json({ success: false, error: "No autorizado" }, { status: 403 })
        }

        // SOFT DELETE: Cambiar estado a 'eliminado' y activo a false
        await query("UPDATE items SET estado = 'cancelado', activo = FALSE WHERE id = ?", [id])

        return NextResponse.json({ success: true, message: "Artículo eliminado correctamente" })
    } catch (error) {
        console.error("[API DELETE] Error:", error)
        return NextResponse.json({ success: false, error: "Error al eliminar" }, { status: 500 })
    }
}