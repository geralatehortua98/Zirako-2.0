import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    const payload = verifyToken(token)
    if (!payload) return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 })

    // 1. Obtener info del ítem para validar dueño y tipo
    const itemResult = await query<any>("SELECT * FROM items WHERE id = ?", [id])
    if (itemResult.rows.length === 0) return NextResponse.json({ success: false, error: "Ítem no encontrado" }, { status: 404 })
    
    const item = itemResult.rows[0]

    // Validar dueño
    if (Number(item.usuario_id) !== Number(payload.userId)) {
        return NextResponse.json({ success: false, error: "No eres el dueño de este artículo" }, { status: 403 })
    }

    // Validar que no esté ya completado
    if (item.estado === 'completado') {
        return NextResponse.json({ success: false, error: "Este artículo ya fue completado" }, { status: 400 })
    }

    // 2. Definir Puntos y CO2 según el tipo
    let puntosGanados = 0
    let co2Ganado = 0
    let descripcionImpacto = ""

    if (item.tipo === 'venta') {
        puntosGanados = 10 // Puntos que antes dabas por publicar, ahora por vender
        co2Ganado = 1.0
        descripcionImpacto = `Venta completada: ${item.titulo}`
    } else if (item.tipo === 'donacion') {
        puntosGanados = 30 // Más puntos por donar
        co2Ganado = 3.0
        descripcionImpacto = `Donación realizada: ${item.titulo}`
    } else {
        // Intercambio 
        puntosGanados = 20
        co2Ganado = 5.0
        descripcionImpacto = `Intercambio manual: ${item.titulo}`
    }

    // 3. Actualizar Estado del Ítem
    await query("UPDATE items SET estado = 'completado' WHERE id = ?", [id])

    // 4. Asignar Puntos al Usuario
    await query("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?", [puntosGanados, payload.userId])

    // 5. Registrar Impacto Ambiental
    await query(
        `INSERT INTO impacto_ambiental (usuario_id, item_id, tipo_accion, co2_ahorrado, descripcion)
         VALUES (?, ?, ?, ?, ?)`,
        [payload.userId, id, item.tipo, co2Ganado, descripcionImpacto]
    )

    return NextResponse.json({ 
        success: true, 
        message: "¡Ciclo completado con éxito!",
        data: { puntos: puntosGanados, co2: co2Ganado }
    })

  } catch (error: any) {
    console.error("[API COMPLETE ITEM] Error:", error)
    return NextResponse.json({ success: false, error: "Error al completar el ítem" }, { status: 500 })
  }
}