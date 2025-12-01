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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

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
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/Downloads/zirako2.0/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "query",
    ()=>query,
    "testConnection",
    ()=>testConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/node_modules/.pnpm/mysql2@3.15.3/node_modules/mysql2/promise.js [app-route] (ecmascript)");
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
        global.mysqlPool = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
            uri: process.env.DATABASE_URL,
            waitForConnections: true,
            connectionLimit: 10,
            enableKeepAlive: true
        });
    } else {
        // Si no, usa los parámetros individuales
        global.mysqlPool = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$mysql2$40$3$2e$15$2e$3$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool(dbConfig);
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
"[project]/Downloads/zirako2.0/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/lib/db.ts [app-route] (ecmascript)");
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || "zirako-secret-key-2024-change-in-production";
const JWT_EXPIRES_IN = "7d";
async function hashPassword(password) {
    const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(12);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, salt);
}
async function verifyPassword(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
}
function generateToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        console.error("[ZIRAKO AUTH] Error al verificar token:", error);
        return null;
    }
}
function generateVerificationToken() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        purpose: "email-verification"
    }, JWT_SECRET, {
        expiresIn: "24h"
    });
}
function generatePasswordResetToken() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$2$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        purpose: "password-reset"
    }, JWT_SECRET, {
        expiresIn: "1h"
    });
}
async function registerUser({ email, password, name, rol_id, tipo_documento, numero_documento, phone, ciudad, direccion }) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE email = ?", [
            email
        ]);
        if (existingUser.rows.length > 0) {
            return {
                success: false,
                error: "El correo electrónico ya está registrado"
            };
        }
        // Verificar si el documento ya existe
        const existingDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE numero_documento = ?", [
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO usuarios (
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
        const newUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.nombre, r.nombre as rol, u.created_at 
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.password_hash, u.nombre, r.nombre as rol, 
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?", [
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id, email, nombre FROM usuarios WHERE token_verificacion = ?", [
            token
        ]);
        if (result.rows.length === 0) {
            return {
                success: false,
                error: "Token de verificación inválido"
            };
        }
        const user = result.rows[0];
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET email_verificado = TRUE, token_verificacion = NULL WHERE id = ?", [
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id, nombre FROM usuarios WHERE email = ?", [
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET token_reset_password = ?, reset_password_expira = ? WHERE id = ?", [
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT id FROM usuarios WHERE token_reset_password = ? AND reset_password_expira > NOW()", [
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET password_hash = ?, token_reset_password = NULL, reset_password_expira = NULL WHERE id = ?", [
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
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT u.id, u.email, u.nombre, r.nombre as rol, u.telefono, u.ciudad, u.direccion, 
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?", [
            points,
            userId
        ]);
        // Recalcular nivel
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("SELECT puntos FROM usuarios WHERE id = ?", [
            userId
        ]);
        if (result.rows.length > 0) {
            const totalPoints = result.rows[0].puntos;
            let newLevel = 1;
            if (totalPoints >= 1000) newLevel = 5;
            else if (totalPoints >= 500) newLevel = 4;
            else if (totalPoints >= 200) newLevel = 3;
            else if (totalPoints >= 50) newLevel = 2;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])("UPDATE usuarios SET nivel = ? WHERE id = ?", [
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
"[project]/Downloads/zirako2.0/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/zirako2.0/lib/auth.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        // Validar campos requeridos
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Email y contraseña son requeridos"
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loginUser"])(email, password);
        if (!result.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: result.error
            }, {
                status: 401
            });
        }
        // Crear respuesta con cookie de sesión
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Inicio de sesión exitoso",
            user: result.user
        });
        response.cookies.set("auth-token", result.token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        response.cookies.set("user-data", JSON.stringify(result.user), {
            httpOnly: false,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return response;
    } catch (error) {
        console.error("[API] Error en inicio de sesión:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$zirako2$2e$0$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error interno del servidor"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8248000c._.js.map