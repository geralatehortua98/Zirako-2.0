import nodemailer from "nodemailer"

/**
 * CONFIGURACIÓN DE CORREO ELECTRÓNICO - ZIRAKO
 */

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

// Crear transportador SMTP (singleton)
let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mi.com.co",
      port: Number.parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true" || true,
      auth: {
        user: process.env.SMTP_USER || "geraldine@mi.com.co",
        pass: process.env.SMTP_PASSWORD || "Horoscopo12*",
      },
    })
  }
  return transporter
}

export async function sendEmail(options: EmailOptions) {
  try {
    const transporter = getTransporter()

    const info = await transporter.sendMail({
      from: '"ZIRAKO" <geraldine@mi.com.co>',
      replyTo: options.replyTo || "soporte@zirako.co",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log("[ZIRAKO EMAIL] Correo enviado:", info.messageId, "a:", options.to)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("[ZIRAKO EMAIL] Error al enviar correo:", error)
    throw error 
  }
}

// ==========================================
// PLANTILLA BASE (ESTRUCTURA DE LOS OTROS)
// ==========================================

// LOGO HEXAGONAL BLANCO
const ZIRAKO_LOGO_SVG = `
<svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
  <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" fill="white" stroke="white" stroke-width="2" />
</svg>
`

// HEADER VERDE
const EMAIL_HEADER = `
  <div style="background: linear-gradient(135deg, #1a5f3a 0%, #2d8659 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <div style="margin-bottom: 15px;">
      ${ZIRAKO_LOGO_SVG}
    </div>
    <h1 style="margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800;">ZIRAKO</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Reutiliza con propósito</p>
  </div>
`

// FOOTER
const EMAIL_FOOTER = `
  <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee;">
    <p style="margin: 0;">© 2025 ZIRAKO - Todos los derechos reservados</p>
    <p style="margin: 5px 0 0 0;">Cali, Valle del Cauca, Colombia</p>
    <p style="margin: 10px 0 0 0;">
      <a href="https://zirako-delta.vercel.app/" style="color: #1a5f3a; text-decoration: none;">zirako.co</a>
    </p>
  </div>
`

// ==========================================
// FUNCIONES DE ENVÍO
// ==========================================

/**
 * 1. Enviar correo de bienvenida al registrarse
 */
export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1a5f3a; text-align: center;">¡Bienvenido/a, ${name}! 🌱</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Gracias por unirte a <strong>ZIRAKO</strong>. Estamos emocionados de tenerte como parte de nuestra comunidad de economía circular en el Valle del Cauca.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;">✅ <strong>Publica</strong> artículos que ya no uses.</p>
              <p style="margin: 5px 0;">✅ <strong>Encuentra</strong> tesoros a precios justos.</p>
              <p style="margin: 5px 0;">✅ <strong>Ayuda</strong> al planeta reduciendo residuos.</p>
            </div>

            <center>
              <a href="https://zirako-delta.vercel.app/auth/login" style="display: inline-block; background: #1a5f3a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Explorar ZIRAKO</a>
            </center>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `
  return sendEmail({ to: email, subject: "¡Bienvenido/a a ZIRAKO! 🌱", html })
}

/**
 * 2. Enviar contraseña temporal
 */
export async function sendTemporaryPasswordEmail(email: string, name: string, temporaryPassword: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1a5f3a; text-align: center;">Recuperación de Cuenta</h2>
            <p>Hola ${name}, hemos recibido una solicitud para restablecer tu contraseña. Aquí está tu clave temporal:</p>
            
            <div style="background: white; padding: 20px; text-align: center; border: 2px solid #1a5f3a; border-radius: 8px; margin: 25px 0;">
              <p style="font-size: 28px; font-weight: bold; color: #1a5f3a; margin: 0; letter-spacing: 2px;">${temporaryPassword}</p>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #856404;">⚠️ Por seguridad, te recomendamos cambiar esta contraseña inmediatamente después de iniciar sesión.</p>
            </div>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `
  return sendEmail({ to: email, subject: "🔐 Tu nueva contraseña temporal", html })
}

/**
 * 3. Enviar notificación de recolección (ACTUALIZADA MULTI-DESTINATARIO)
 * Usa la misma plantilla pero añade el bloque del Código de Servicio
 */
export async function sendCollectionConfirmationEmail(
  userEmail: string,
  userName: string,
  recolectorEmail: string,
  recolectorName: string,
  codigoRecoleccion: string, // <-- AQUÍ ENTRA EL CÓDIGO
  fecha: string,
  horario: string,
  direccion: string,
  ciudad: string,
  descripcion: string,
) {
  const commonHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1a5f3a; text-align: center;">🚚 Nueva Recolección Programada</h2>
            <p style="text-align: center; color: #666;">Se ha agendado una recolección a través de ZIRAKO.</p>
            
            <!-- BLOQUE DE CÓDIGO DE RECOLECCIÓN DESTACADO -->
            <div style="background: #1a5f3a; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; opacity: 0.9; text-transform: uppercase;">Código de Servicio</p>
              <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: 800; letter-spacing: 2px;">${codigoRecoleccion}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1a5f3a; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Detalles de la Orden</h3>
              <p style="margin: 8px 0;"><strong>👤 Solicitante:</strong> ${userName}</p>
              <p style="margin: 8px 0;"><strong>🏢 Empresa Recolectora:</strong> ${recolectorName}</p>
              <p style="margin: 8px 0;"><strong>📅 Fecha:</strong> ${fecha}</p>
              <p style="margin: 8px 0;"><strong>🕐 Horario:</strong> ${horario}</p>
              <p style="margin: 8px 0;"><strong>📍 Dirección:</strong> ${direccion}, ${ciudad}</p>
              <p style="margin: 8px 0;"><strong>📦 Materiales:</strong> ${descripcion}</p>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #666; margin-top: 20px;">
              Este código debe presentarse al momento de la recolección.
            </p>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `

  // 1. Correo al Usuario Creador
  await sendEmail({
    to: userEmail,
    subject: `✅ Recolección Confirmada [${codigoRecoleccion}]`,
    html: commonHtml,
  })

  // 2. Correo a la Empresa Recolectora
  await sendEmail({
    to: recolectorEmail,
    subject: `🚚 Nueva Solicitud de Recolección [${codigoRecoleccion}]`,
    html: commonHtml,
  })

  // 3. Correo al Admin (Geraldine)
  await sendEmail({
    to: "geraldine@mi.com.co",
    subject: `🔔 Admin: Nueva Recolección [${codigoRecoleccion}]`,
    html: commonHtml,
  })

  return { success: true }
}

/**
 * 4. Enviar ticket de soporte
 */
export async function sendSupportTicketEmail(
  ticketId: string | number,
  email: string,
  name: string,
  asunto: string,
  mensaje: string,
) {
  const adminHtml = `
    <div style="font-family: Arial;">
      <h2 style="color: #9b59b6;">🎫 Nuevo Ticket de Soporte</h2>
      <p><strong>Ticket ID:</strong> #${ticketId}</p>
      <p><strong>De:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #9b59b6;">
        ${mensaje}
      </div>
    </div>
  `

  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1a5f3a; text-align: center;">Ticket Recibido</h2>
            <p>Hola ${name}, hemos recibido tu solicitud de soporte.</p>
            
            <div style="background: #1a5f3a; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Número de Ticket</p>
              <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold;">${ticketId}</p>
            </div>
            
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p style="color: #666; font-size: 14px;">Nuestro equipo revisará tu caso y te responderá en un plazo de 24 a 48 horas.</p>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `

  await sendEmail({ to: "geraldine@mi.com.co", subject: `🎫 Ticket [${ticketId}]: ${asunto}`, html: adminHtml, replyTo: email })
  await sendEmail({ to: email, subject: `✅ Ticket Recibido [${ticketId}]`, html: clientHtml })

  return { success: true }
}

/**
 * 5. Enviar mensaje de chat de soporte
 */
export async function sendChatSupportEmail(name: string, email: string, message: string) {
  const html = `
    <div style="font-family: Arial;">
      <h2 style="color: #3498db;">💬 Nuevo Mensaje de Chat</h2>
      <p><strong>Usuario:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <div style="background: #f0f7fb; padding: 15px; border-radius: 5px; border: 1px solid #cceeff;">
        ${message}
      </div>
      <p style="font-size: 12px; color: #666;">Responde a este correo para contestar directamente al usuario.</p>
    </div>
  `
  return sendEmail({ to: "geraldine@mi.com.co", subject: `💬 Chat: ${name}`, html, replyTo: email })
}

/**
 * 6. Enviar solicitud de intercambio
 */
export async function sendExchangeRequestEmail(
  email: string,
  name: string,
  itemTitulo: string,
  solicitanteNombre: string,
  itemOfrecido: string,
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #d97706; text-align: center;">🔄 Propuesta de Intercambio</h2>
            <p>Hola ${name},</p>
            <p><strong>${solicitanteNombre}</strong> está interesado en hacer un intercambio contigo.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="width: 45%;">
                  <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Tu artículo</p>
                  <p style="font-weight: bold; color: #1a5f3a;">${itemTitulo}</p>
                </div>
                <div style="font-size: 24px; color: #d97706;">⇄</div>
                <div style="width: 45%;">
                  <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Te ofrece</p>
                  <p style="font-weight: bold; color: #1a5f3a;">${itemOfrecido}</p>
                </div>
              </div>
            </div>

            <center>
              <a href="https://zirako-delta.vercel.app/intercambio" style="display: inline-block; background: #d97706; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Detalles</a>
            </center>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `
  return sendEmail({ to: email, subject: `🔄 Solicitud de intercambio para "${itemTitulo}"`, html })
}

/**
 * 7. Enviar solicitud de DONACIÓN
 */
export async function sendDonationRequestEmail(
  email: string,
  name: string,
  itemTitulo: string,
  solicitanteNombre: string,
  solicitanteEmail: string,
  mensaje: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #9333ea; text-align: center;">💜 Solicitud de Donación</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>¡Buenas noticias! <strong>${solicitanteNombre}</strong> está interesado en recibir el artículo que estás donando.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333ea; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">Artículo solicitado:</p>
              <h3 style="margin: 0 0 15px 0; color: #333;">${itemTitulo}</h3>
              <p style="margin: 0; font-size: 12px; color: #666;">Mensaje del solicitante:</p>
              <p style="font-style: italic; color: #555; margin-top: 5px;">"${mensaje}"</p>
            </div>

            <p style="text-align: center;">Puedes ponerte en contacto directamente:</p>
            <center>
              <a href="mailto:${solicitanteEmail}" style="display: inline-block; background: #9333ea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Responder a ${solicitanteNombre}</a>
            </center>
            <p style="text-align: center; font-size: 12px; color: #666; margin-top: 10px;">(${solicitanteEmail})</p>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `
  return sendEmail({ to: email, subject: `💜 Alguien quiere tu donación: "${itemTitulo}"`, html, replyTo: solicitanteEmail })
}

/**
 * 8. Enviar propuesta de COMPRA
 */
export async function sendPurchaseProposalEmail(
  email: string,
  name: string,
  itemTitulo: string,
  solicitanteNombre: string,
  solicitanteEmail: string,
  propuesta: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          ${EMAIL_HEADER}
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #059669; text-align: center;">💰 Oferta de Compra</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p><strong>${solicitanteNombre}</strong> está interesado en comprar tu artículo y ha enviado una propuesta.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">Artículo:</p>
              <h3 style="margin: 0 0 15px 0; color: #333;">${itemTitulo}</h3>
              <div style="background: #ecfdf5; padding: 10px; border-radius: 5px; border: 1px dashed #059669;">
                <p style="margin: 0; font-weight: bold; color: #065f46;">Propuesta:</p>
                <p style="margin: 5px 0 0 0; color: #333;">${propuesta}</p>
              </div>
            </div>

            <center>
              <a href="mailto:${solicitanteEmail}" style="display: inline-block; background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Contactar Comprador</a>
            </center>
            <p style="text-align: center; font-size: 12px; color: #666; margin-top: 10px;">o escribe a: ${solicitanteEmail}</p>
          </div>
          ${EMAIL_FOOTER}
        </div>
      </body>
    </html>
  `
  return sendEmail({ to: email, subject: `💰 Oferta de compra para "${itemTitulo}"`, html, replyTo: solicitanteEmail })
}

// Funciones de compatibilidad para código antiguo
export async function sendVerificationEmail(email: string, name: string, token: string) {
  return sendWelcomeEmail(email, name)
}

export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const temporaryPassword = Math.random().toString(36).slice(-8).toUpperCase()
  return sendTemporaryPasswordEmail(email, name, temporaryPassword)
}

export async function sendCollectionReminderEmail(
  email: string,
  name: string,
  collectionId: string,
  fecha: string,
  horario: string,
  direccion: string,
) {
  return sendCollectionConfirmationEmail(
    email,
    name,
    "soporte@zirako.co",
    "ZIRAKO",
    collectionId,
    fecha,
    horario,
    direccion,
    "Valle del Cauca",
    "",
  )
}

export async function sendTicketConfirmationEmail(name: string, email: string, ticketId: number) {
  return { success: true }
}