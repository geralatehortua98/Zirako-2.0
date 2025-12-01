import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { sendSupportTicketEmail } from "@/lib/email"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

// Función para generar código aleatorio (Ej: ZRK-A1B2)
function generarCodigoTicket() {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ZRK-${random}`;
}

// GET /api/support/tickets
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    let userId = null;
    
    if (token) {
        const payload = verifyToken(token);
        if (payload) userId = payload.userId;
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let sql = "SELECT * FROM tickets_soporte WHERE 1=1"
    const params: any[] = []

    if (userId) {
      sql += " AND usuario_id = ?"
      params.push(userId)
    }
    if (status) {
      sql += " AND estado = ?"
      params.push(status)
    }

    sql += " ORDER BY created_at DESC"
    const result = await query<any>(sql, params)
    const rows = result.rows || result;

    return NextResponse.json({ success: true, data: Array.isArray(rows) ? rows : [] })
  } catch (error) {
    console.error("[API SUPPORT] Error:", error)
    return NextResponse.json({ success: false, error: "Error al obtener tickets" }, { status: 500 })
  }
}

// POST /api/support/tickets - Crear ticket
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
    const { nombre, email, asunto, mensaje, categoria, prioridad = "media" } = body

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 })
    }

    // 1. GENERAR EL CÓDIGO AQUÍ (Antes de guardar)
    const codigoTicket = generarCodigoTicket();

    // 2. GUARDARLO EN LA BD (Incluyendo el campo codigo_ticket)
    await query(
      `INSERT INTO tickets_soporte (usuario_id, codigo_ticket, nombre, email, asunto, mensaje, categoria, prioridad)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, codigoTicket, nombre, email, asunto, mensaje, categoria || null, prioridad],
    )

    console.log(`[API SUPPORT] Ticket creado: ${codigoTicket}`);

    // 3. ENVIAR CORREO USANDO EL CÓDIGO GENERADO
    try {
      
      await sendSupportTicketEmail(codigoTicket as any, email, nombre, asunto, mensaje)
      
    } catch (emailError) {
      console.error("[API SUPPORT] Error email:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Ticket creado",
      data: { 
        id: codigoTicket // Devolvemos el código al frontend
      },
    }, { status: 201 })

  } catch (error) {
    console.error("[API SUPPORT] Error:", error)
    return NextResponse.json({ success: false, error: "Error al crear ticket" }, { status: 500 })
  }
}