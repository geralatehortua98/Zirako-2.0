module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/Downloads/PRUEBAIA/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "query",
    ()=>query,
    "testConnection",
    ()=>testConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/mysql2@3.15.3/node_modules/mysql2/promise.js [app-route] (ecmascript)");
;
let pool;
// 2. Configuración de la conexión
// Usamos las variables de entorno que configuramos en .env.local
const dbConfig = {
    uri: process.env.DATABASE_URL,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};
// 3. Lógica Singleton: Si ya existe un pool, úsalo. Si no, créalo.
if (!global.mysqlPool) {
    // Si hay una URL completa (DATABASE_URL), úsala
    if (process.env.DATABASE_URL) {
        global.mysqlPool = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
            uri: process.env.DATABASE_URL,
            waitForConnections: true,
            connectionLimit: 10,
            enableKeepAlive: true
        });
    } else {
        // Si no, usa los parámetros individuales
        global.mysqlPool = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool(dbConfig);
    }
}
pool = global.mysqlPool;
async function query(sql, params) {
    try {
        const [rows, fields] = await pool.execute(sql, params || []);
        return {
            rows: rows,
            fields
        };
    } catch (error) {
        console.error("[ZIRAKO DB] Error ejecutando query:", error);
        throw error;
    }
}
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        console.log("[ZIRAKO DB] Conexión a MySQL Railway exitosa");
        return true;
    } catch (error) {
        console.error("[ZIRAKO DB] Error conectando a MySQL Railway:", error);
        return false;
    }
}
const __TURBOPACK__default__export__ = pool;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/Downloads/PRUEBAIA/lib/email.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendChatSupportEmail",
    ()=>sendChatSupportEmail,
    "sendCollectionConfirmationEmail",
    ()=>sendCollectionConfirmationEmail,
    "sendCollectionReminderEmail",
    ()=>sendCollectionReminderEmail,
    "sendDonationRequestEmail",
    ()=>sendDonationRequestEmail,
    "sendEmail",
    ()=>sendEmail,
    "sendExchangeRequestEmail",
    ()=>sendExchangeRequestEmail,
    "sendPasswordResetEmail",
    ()=>sendPasswordResetEmail,
    "sendPurchaseProposalEmail",
    ()=>sendPurchaseProposalEmail,
    "sendSupportTicketEmail",
    ()=>sendSupportTicketEmail,
    "sendTemporaryPasswordEmail",
    ()=>sendTemporaryPasswordEmail,
    "sendTicketConfirmationEmail",
    ()=>sendTicketConfirmationEmail,
    "sendVerificationEmail",
    ()=>sendVerificationEmail,
    "sendWelcomeEmail",
    ()=>sendWelcomeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$nodemailer$40$7$2e$0$2e$11$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/nodemailer@7.0.11/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
// Crear transportador SMTP (singleton)
let transporter = null;
function getTransporter() {
    if (!transporter) {
        transporter = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$nodemailer$40$7$2e$0$2e$11$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
            host: process.env.SMTP_HOST || "smtp.mi.com.co",
            port: Number.parseInt(process.env.SMTP_PORT || "465"),
            secure: process.env.SMTP_SECURE === "true" || true,
            auth: {
                user: process.env.SMTP_USER || "geraldine@mi.com.co",
                pass: process.env.SMTP_PASSWORD || "Horoscopo12*"
            }
        });
    }
    return transporter;
}
async function sendEmail(options) {
    try {
        const transporter = getTransporter();
        const info = await transporter.sendMail({
            from: '"ZIRAKO" <geraldine@mi.com.co>',
            replyTo: options.replyTo || "soporte@zirako.co",
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        });
        console.log("[ZIRAKO EMAIL] Correo enviado:", info.messageId, "a:", options.to);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error("[ZIRAKO EMAIL] Error al enviar correo:", error);
        throw error;
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
`;
// HEADER VERDE
const EMAIL_HEADER = `
  <div style="background: linear-gradient(135deg, #1a5f3a 0%, #2d8659 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <div style="margin-bottom: 15px;">
      ${ZIRAKO_LOGO_SVG}
    </div>
    <h1 style="margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800;">ZIRAKO</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Reutiliza con propósito</p>
  </div>
`;
// FOOTER
const EMAIL_FOOTER = `
  <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee;">
    <p style="margin: 0;">© 2025 ZIRAKO - Todos los derechos reservados</p>
    <p style="margin: 5px 0 0 0;">Cali, Valle del Cauca, Colombia</p>
    <p style="margin: 10px 0 0 0;">
      <a href="https://zirako-delta.vercel.app/" style="color: #1a5f3a; text-decoration: none;">zirako.co</a>
    </p>
  </div>
`;
async function sendWelcomeEmail(email, name) {
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
  `;
    return sendEmail({
        to: email,
        subject: "¡Bienvenido/a a ZIRAKO! 🌱",
        html
    });
}
async function sendTemporaryPasswordEmail(email, name, temporaryPassword) {
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
  `;
    return sendEmail({
        to: email,
        subject: "🔐 Tu nueva contraseña temporal",
        html
    });
}
async function sendCollectionConfirmationEmail(userEmail, userName, recolectorEmail, recolectorName, codigoRecoleccion, fecha, horario, direccion, ciudad, descripcion) {
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
  `;
    // 1. Correo al Usuario Creador
    await sendEmail({
        to: userEmail,
        subject: `✅ Recolección Confirmada [${codigoRecoleccion}]`,
        html: commonHtml
    });
    // 2. Correo a la Empresa Recolectora
    await sendEmail({
        to: recolectorEmail,
        subject: `🚚 Nueva Solicitud de Recolección [${codigoRecoleccion}]`,
        html: commonHtml
    });
    // 3. Correo al Admin (Geraldine)
    await sendEmail({
        to: "geraldine@mi.com.co",
        subject: `🔔 Admin: Nueva Recolección [${codigoRecoleccion}]`,
        html: commonHtml
    });
    return {
        success: true
    };
}
async function sendSupportTicketEmail(ticketId, email, name, asunto, mensaje) {
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
  `;
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
  `;
    await sendEmail({
        to: "geraldine@mi.com.co",
        subject: `🎫 Ticket [${ticketId}]: ${asunto}`,
        html: adminHtml,
        replyTo: email
    });
    await sendEmail({
        to: email,
        subject: `✅ Ticket Recibido [${ticketId}]`,
        html: clientHtml
    });
    return {
        success: true
    };
}
async function sendChatSupportEmail(name, email, message) {
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
  `;
    return sendEmail({
        to: "geraldine@mi.com.co",
        subject: `💬 Chat: ${name}`,
        html,
        replyTo: email
    });
}
async function sendExchangeRequestEmail(email, name, itemTitulo, solicitanteNombre, itemOfrecido) {
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
  `;
    return sendEmail({
        to: email,
        subject: `🔄 Solicitud de intercambio para "${itemTitulo}"`,
        html
    });
}
async function sendDonationRequestEmail(email, name, itemTitulo, solicitanteNombre, solicitanteEmail, mensaje) {
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
  `;
    return sendEmail({
        to: email,
        subject: `💜 Alguien quiere tu donación: "${itemTitulo}"`,
        html,
        replyTo: solicitanteEmail
    });
}
async function sendPurchaseProposalEmail(email, name, itemTitulo, solicitanteNombre, solicitanteEmail, propuesta) {
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
  `;
    return sendEmail({
        to: email,
        subject: `💰 Oferta de compra para "${itemTitulo}"`,
        html,
        replyTo: solicitanteEmail
    });
}
async function sendVerificationEmail(email, name, token) {
    return sendWelcomeEmail(email, name);
}
async function sendPasswordResetEmail(email, name, token) {
    const temporaryPassword = Math.random().toString(36).slice(-8).toUpperCase();
    return sendTemporaryPasswordEmail(email, name, temporaryPassword);
}
async function sendCollectionReminderEmail(email, name, collectionId, fecha, horario, direccion) {
    return sendCollectionConfirmationEmail(email, name, "soporte@zirako.co", "ZIRAKO", collectionId, fecha, horario, direccion, "Valle del Cauca", "");
}
async function sendTicketConfirmationEmail(name, email, ticketId) {
    return {
        success: true
    };
}
}),
"[project]/Downloads/PRUEBAIA/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addPointsToUser",
    ()=>addPointsToUser,
    "generatePasswordResetToken",
    ()=>generatePasswordResetToken,
    "generateToken",
    ()=>generateToken,
    "generateVerificationToken",
    ()=>generateVerificationToken,
    "getUserById",
    ()=>getUserById,
    "hashPassword",
    ()=>hashPassword,
    "loginUser",
    ()=>loginUser,
    "registerUser",
    ()=>registerUser,
    "requestPasswordReset",
    ()=>requestPasswordReset,
    "resetPassword",
    ()=>resetPassword,
    "verifyEmail",
    ()=>verifyEmail,
    "verifyPassword",
    ()=>verifyPassword,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/db.ts [app-route] (ecmascript)");
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || "zirako-secret-key-2024-change-in-production";
const JWT_EXPIRES_IN = "7d";
async function hashPassword(password) {
    const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(12);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, salt);
}
async function verifyPassword(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
}
function generateToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error al verificar token:", error);
        return null;
    }
}
function generateVerificationToken() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        purpose: "email-verification"
    }, JWT_SECRET, {
        expiresIn: "24h"
    });
}
function generatePasswordResetToken() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        purpose: "password-reset"
    }, JWT_SECRET, {
        expiresIn: "1h"
    });
}
async function registerUser({ email, password, name, rol_id, tipo_documento, numero_documento, phone, ciudad, direccion }) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE email = ?", [
            email
        ]);
        if (existingUser.rows.length > 0) {
            return {
                success: false,
                error: "El correo electrónico ya está registrado"
            };
        }
        // Verificar si el documento ya existe
        const existingDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE numero_documento = ?", [
            numero_documento
        ]);
        if (existingDoc.rows.length > 0) {
            return {
                success: false,
                error: "El número de documento ya está registrado"
            };
        }
        // Hash de la contraseña
        const passwordHash = await hashPassword(password);
        const verificationToken = generateVerificationToken();
        // Insertar usuario (usando rol_id)
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO usuarios (
          email, password_hash, nombre, rol_id, tipo_documento, numero_documento, 
          telefono, ciudad, direccion, token_verificacion, puntos, nivel
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1)`, [
            email,
            passwordHash,
            name,
            rol_id || 1,
            tipo_documento || 'CC',
            numero_documento,
            phone || null,
            ciudad || "Cali",
            direccion || null,
            verificationToken
        ]);
        // Obtener el usuario insertado con el nombre de su rol
        const newUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.nombre, r.nombre as rol, u.created_at 
       FROM usuarios u 
       JOIN roles r ON u.rol_id = r.id 
       WHERE u.email = ?`, [
            email
        ]);
        const user = newUser.rows[0];
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.nombre,
                rol: user.rol,
                createdAt: user.created_at
            },
            verificationToken
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error registro:", error);
        return {
            success: false,
            error: "Error interno al registrar"
        };
    }
}
async function loginUser(email, password) {
    try {
        // Buscar usuario por email y obtener el nombre de su rol
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.password_hash, u.nombre, r.nombre as rol, 
              u.telefono, u.ciudad, u.puntos, u.nivel, u.email_verificado 
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.email = ?`, [
            email
        ]);
        if (result.rows.length === 0) {
            return {
                success: false,
                error: "Credenciales inválidas"
            };
        }
        const user = result.rows[0];
        // Verificar contraseña
        const isValidPassword = await verifyPassword(password, user.password_hash);
        if (!isValidPassword) {
            return {
                success: false,
                error: "Credenciales inválidas"
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?", [
            user.id
        ]);
        // Generar token JWT
        const token = generateToken({
            userId: user.id,
            email: user.email,
            name: user.nombre
        });
        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.nombre,
                rol: user.rol,
                phone: user.telefono,
                city: user.ciudad,
                points: user.puntos,
                level: user.nivel || 1,
                emailVerified: user.email_verificado
            }
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error al iniciar sesión:", error);
        return {
            success: false,
            error: "Error al iniciar sesión"
        };
    }
}
async function verifyEmail(token) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id, email, nombre FROM usuarios WHERE token_verificacion = ?", [
            token
        ]);
        if (result.rows.length === 0) {
            return {
                success: false,
                error: "Token de verificación inválido"
            };
        }
        const user = result.rows[0];
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET email_verificado = TRUE, token_verificacion = NULL WHERE id = ?", [
            user.id
        ]);
        return {
            success: true,
            message: "Email verificado exitosamente",
            user
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error al verificar email:", error);
        return {
            success: false,
            error: "Error al verificar email"
        };
    }
}
async function requestPasswordReset(email) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id, nombre FROM usuarios WHERE email = ?", [
            email
        ]);
        if (result.rows.length === 0) {
            return {
                success: true,
                message: "Si el correo existe, recibirás un enlace de recuperación"
            };
        }
        const user = result.rows[0];
        const resetToken = generatePasswordResetToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora
        ;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET token_reset_password = ?, reset_password_expira = ? WHERE id = ?", [
            resetToken,
            expiresAt,
            user.id
        ]);
        return {
            success: true,
            resetToken,
            user
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error recuperación contraseña:", error);
        return {
            success: false,
            error: "Error al procesar la solicitud"
        };
    }
}
async function resetPassword(token, newPassword) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE token_reset_password = ? AND reset_password_expira > NOW()", [
            token
        ]);
        if (result.rows.length === 0) {
            return {
                success: false,
                error: "Token inválido o expirado"
            };
        }
        const user = result.rows[0];
        const passwordHash = await hashPassword(newPassword);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET password_hash = ?, token_reset_password = NULL, reset_password_expira = NULL WHERE id = ?", [
            passwordHash,
            user.id
        ]);
        return {
            success: true,
            message: "Contraseña actualizada exitosamente"
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error restablecer contraseña:", error);
        return {
            success: false,
            error: "Error al restablecer contraseña"
        };
    }
}
async function getUserById(id) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.nombre, r.nombre as rol, u.telefono, u.ciudad, u.direccion, 
              u.puntos, u.nivel, u.email_verificado, u.created_at 
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ?`, [
            id
        ]);
        if (result.rows.length === 0) return null;
        const user = result.rows[0];
        return {
            id: user.id,
            email: user.email,
            name: user.nombre,
            rol: user.rol,
            phone: user.telefono,
            city: user.ciudad,
            address: user.direccion,
            points: user.puntos,
            level: user.nivel || 1,
            emailVerified: user.email_verificado,
            createdAt: user.created_at
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error obtener usuario:", error);
        return null;
    }
}
async function addPointsToUser(userId, points, reason) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?", [
            points,
            userId
        ]);
        // Recalcular nivel
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT puntos FROM usuarios WHERE id = ?", [
            userId
        ]);
        if (result.rows.length > 0) {
            const totalPoints = result.rows[0].puntos;
            let newLevel = 1;
            if (totalPoints >= 1000) newLevel = 5;
            else if (totalPoints >= 500) newLevel = 4;
            else if (totalPoints >= 200) newLevel = 3;
            else if (totalPoints >= 50) newLevel = 2;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET nivel = ? WHERE id = ?", [
                newLevel,
                userId
            ]);
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error agregar puntos:", error);
        return {
            success: false
        };
    }
}
}),
"[project]/Downloads/PRUEBAIA/app/api/support/tickets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$email$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/email.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
// Función para generar código aleatorio (Ej: ZRK-A1B2)
function generarCodigoTicket() {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ZRK-${random}`;
}
async function GET(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("auth-token")?.value;
        let userId = null;
        if (token) {
            const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
            if (payload) userId = payload.userId;
        }
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        let sql = "SELECT * FROM tickets_soporte WHERE 1=1";
        const params = [];
        if (userId) {
            sql += " AND usuario_id = ?";
            params.push(userId);
        }
        if (status) {
            sql += " AND estado = ?";
            params.push(status);
        }
        sql += " ORDER BY created_at DESC";
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(sql, params);
        const rows = result.rows || result;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: Array.isArray(rows) ? rows : []
        });
    } catch (error) {
        console.error("[API SUPPORT] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error al obtener tickets"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("auth-token")?.value;
        let userId = null;
        if (token) {
            const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
            if (payload) userId = payload.userId;
        }
        const body = await request.json();
        const { nombre, email, asunto, mensaje, categoria, prioridad = "media" } = body;
        if (!nombre || !email || !asunto || !mensaje) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Faltan datos"
            }, {
                status: 400
            });
        }
        // 1. GENERAR EL CÓDIGO AQUÍ (Antes de guardar)
        const codigoTicket = generarCodigoTicket();
        // 2. GUARDARLO EN LA BD (Incluyendo el campo codigo_ticket)
        // Asegúrate de haber ejecutado el ALTER TABLE antes de usar esto
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO tickets_soporte (usuario_id, codigo_ticket, nombre, email, asunto, mensaje, categoria, prioridad)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            userId,
            codigoTicket,
            nombre,
            email,
            asunto,
            mensaje,
            categoria || null,
            prioridad
        ]);
        console.log(`[API SUPPORT] Ticket creado: ${codigoTicket}`);
        // 3. ENVIAR CORREO USANDO EL CÓDIGO GENERADO
        // Ya no dependemos del ID de la base de datos, usamos nuestra variable
        try {
            // Nota: sendSupportTicketEmail espera un número como primer argumento.
            // Puedes pasarle el codigoTicket si cambias el tipo en lib/email.tsx a string,
            // o pasarle un 0 y agregar el código como otro argumento.
            // 
            // Opción recomendada: Modificar lib/email.tsx para que acepte string en el primer parámetro.
            // Por ahora, lo pasamos "haciendo trampa" casteandolo a any o number si solo acepta numeros,
            // pero lo ideal es ir a lib/email.tsx y cambiar `ticketId: number` por `ticketId: string`.
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$email$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendSupportTicketEmail"])(codigoTicket, email, nombre, asunto, mensaje);
        } catch (emailError) {
            console.error("[API SUPPORT] Error email:", emailError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Ticket creado",
            data: {
                id: codigoTicket // Devolvemos el código al frontend
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[API SUPPORT] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error al crear ticket"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__048729c2._.js.map