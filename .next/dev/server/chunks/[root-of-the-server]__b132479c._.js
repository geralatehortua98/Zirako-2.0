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
"[project]/Downloads/PRUEBAIA/app/api/impacto/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/PRUEBAIA/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
;
async function GET(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "No autorizado"
            }, {
                status: 401
            });
        }
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!payload) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Sesión expirada"
            }, {
                status: 401
            });
        }
        // 1. Total de CO2 ahorrado
        const totalResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT 
        COALESCE(SUM(co2_ahorrado), 0) AS total_co2,
        COUNT(*) AS total_acciones
       FROM impacto_ambiental WHERE usuario_id = ?`, [
            payload.userId
        ]);
        // 2. Desglose por tipo de acción
        const desgloseResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT 
        tipo_accion,
        COUNT(*) AS cantidad,
        SUM(co2_ahorrado) AS co2_total
       FROM impacto_ambiental 
       WHERE usuario_id = ?
       GROUP BY tipo_accion`, [
            payload.userId
        ]);
        // 3. Impacto por mes (últimos 6 meses)
        const mensualResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS mes,
        SUM(co2_ahorrado) AS co2_mes,
        COUNT(*) AS acciones_mes
       FROM impacto_ambiental 
       WHERE usuario_id = ? 
         AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY mes DESC`, [
            payload.userId
        ]);
        // 4. Últimas acciones
        const ultimasResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT ia.*, i.titulo AS nombre_item
       FROM impacto_ambiental ia
       LEFT JOIN items i ON ia.item_id = i.id
       WHERE ia.usuario_id = ?
       ORDER BY ia.created_at DESC
       LIMIT 10`, [
            payload.userId
        ]);
        const total = totalResult.rows[0] || {
            total_co2: 0,
            total_acciones: 0
        };
        // --- TRANSFORMACIÓN DE DATOS (ESTA ES LA CLAVE) ---
        // Convertimos la lista de la BD en un objeto fácil de leer
        const por_tipo = {
            donacion: 0,
            intercambio: 0,
            venta: 0,
            recoleccion: 0
        };
        // Llenamos el objeto con los datos reales
        desgloseResult.rows.forEach((row)=>{
            const tipo = row.tipo_accion;
            if (tipo && por_tipo.hasOwnProperty(tipo)) {
                por_tipo[tipo] = Number(row.cantidad);
            }
        });
        // Calcular equivalencias ambientales
        const co2Total = Number(total.total_co2) || 0;
        const equivalencias = {
            arboles_equivalentes: Math.round(co2Total / 21),
            km_auto_evitados: Math.round(co2Total / 0.12),
            litros_agua_ahorrados: Math.round(co2Total * 100),
            bolsas_plastico_evitadas: Math.round(co2Total * 10)
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                total_co2_ahorrado: co2Total,
                total_acciones: Number(total.total_acciones) || 0,
                por_tipo: por_tipo,
                desglose: desgloseResult.rows,
                mensual: mensualResult.rows,
                ultimas_acciones: ultimasResult.rows,
                equivalencias
            }
        });
    } catch (error) {
        console.error("[API IMPACTO] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error al obtener impacto"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "No autorizado"
            }, {
                status: 401
            });
        }
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!payload) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Sesión expirada"
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { tipo_accion, item_id, descripcion } = body;
        if (!tipo_accion || ![
            "donacion",
            "venta",
            "intercambio",
            "recoleccion"
        ].includes(tipo_accion)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Tipo de acción inválido"
            }, {
                status: 400
            });
        }
        const co2_ahorrado = CO2_POR_ACCION[tipo_accion];
        const puntos = PUNTOS_POR_ACCION[tipo_accion];
        // Registrar impacto ambiental
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO impacto_ambiental (usuario_id, item_id, tipo_accion, co2_ahorrado, descripcion)
       VALUES (?, ?, ?, ?, ?)`, [
            payload.userId,
            item_id || null,
            tipo_accion,
            co2_ahorrado,
            descripcion || `Acción de ${tipo_accion}`
        ]);
        // Actualizar puntos del usuario
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE usuarios SET puntos = puntos + ? WHERE id = ?`, [
            puntos,
            payload.userId
        ]);
        // Actualizar nivel si corresponde
        const userResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT puntos FROM usuarios WHERE id = ?`, [
            payload.userId
        ]);
        const nuevosPuntos = userResult.rows[0]?.puntos || 0;
        const nuevoNivel = calcularNivel(nuevosPuntos);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE usuarios SET nivel = ? WHERE id = ?`, [
            nuevoNivel,
            payload.userId
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Impacto registrado",
            data: {
                co2_ahorrado,
                puntos_ganados: puntos,
                puntos_totales: nuevosPuntos,
                nivel: nuevoNivel
            }
        });
    } catch (error) {
        console.error("[API IMPACTO] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$PRUEBAIA$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Error al registrar impacto"
        }, {
            status: 500
        });
    }
}
function calcularNivel(puntos) {
    if (puntos >= 5000) return 5;
    if (puntos >= 2000) return 4;
    if (puntos >= 1000) return 3;
    if (puntos >= 500) return 2;
    return 1;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b132479c._.js.map