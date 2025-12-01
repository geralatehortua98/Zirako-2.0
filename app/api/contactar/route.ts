import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { sendDonationRequestEmail, sendPurchaseProposalEmail, sendEmail } from "@/lib/email"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    const body = await request.json()
    const { itemId, itemName, sellerEmail, sellerName, mensaje, tipo, ofertaPrecio } = body

    if (!mensaje) return NextResponse.json({ success: false, error: "Mensaje requerido" }, { status: 400 })

    let userId = null
    let contactadorNombre = "Usuario Zirako"
    let contactadorEmail = "soporte@zirako.co"

    if (token) {
        const payload = verifyToken(token)
        if (payload) userId = payload.userId
    }

    // 1. OBTENER DATOS DEL REMITENTE
    if (userId) {
        try {
            const userRes = await query<any>("SELECT nombre, email FROM usuarios WHERE id = ?", [userId])
            if (userRes.rows.length > 0) {
                contactadorNombre = userRes.rows[0].nombre
                contactadorEmail = userRes.rows[0].email
            }
        } catch (e) {
            console.error("Error obteniendo usuario remitente", e)
        }
    }

    // 2. OBTENER DATOS DEL DUEÑO DEL ARTÍCULO
    let itemInfo = null
    if (itemId) {
        const res = await query<any>("SELECT * FROM items WHERE id = ?", [itemId])
        if (res.rows.length > 0) itemInfo = res.rows[0]
    }

    // 3. INSERTAR EN BASE DE DATOS
    if (userId && itemInfo && Number(userId) !== Number(itemInfo.usuario_id)) {
        
        if (tipo === 'compra') {
            const precio = ofertaPrecio ? parseFloat(ofertaPrecio.toString().replace(/[^0-9.]/g, '')) : itemInfo.precio
            
          
            await query(
                `INSERT INTO ventas (vendedor_id, comprador_id, item_id, precio_final, estado, notas) 
                 VALUES (?, ?, ?, ?, 'pendiente', ?)`,
                [itemInfo.usuario_id, userId, itemId, precio, mensaje] 
            )
            // ---------------------------------------------------------------------

        } else if (tipo === 'donacion') {
            await query(
                `INSERT INTO donaciones (donante_id, receptor_id, item_id, estado, mensaje) 
                 VALUES (?, ?, ?, 'pendiente', ?)`,
                [itemInfo.usuario_id, userId, itemId, mensaje]
            )
        }
    }

    // 4. ENVIAR CORREOS
    if (tipo === 'donacion') {
      await sendDonationRequestEmail(sellerEmail, sellerName, itemName, contactadorNombre, contactadorEmail, mensaje);
    } else if (tipo === 'compra') {
      await sendPurchaseProposalEmail(sellerEmail, sellerName, itemName, contactadorNombre, contactadorEmail, mensaje);
    } else {
      await sendEmail({
        to: sellerEmail,
        subject: `[ZIRAKO] Consulta sobre "${itemName}"`,
        html: `<p>${mensaje}</p>`, 
        replyTo: contactadorEmail
      })
    }

    // 5. GUARDAR EN HISTORIAL DE MENSAJES ENVIADOS EN LAS PROPUESTAS DONACIÓN, INTERCAMBIO Y VENTA.
    if (userId && itemInfo) {
       try {
           await query(`INSERT INTO mensajes (remitente_id, destinatario_id, item_id, contenido) VALUES (?, ?, ?, ?)`, 
           [userId, itemInfo.usuario_id, itemId, mensaje])
       } catch (e) {
           console.log("No se pudo guardar en chat, continuando...")
       }
    }

    return NextResponse.json({ success: true, message: "Solicitud registrada y enviada" })
  } catch (error) {
    console.error("[API CONTACTAR] Error:", error)
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 })
  }
}