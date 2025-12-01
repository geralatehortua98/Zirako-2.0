import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { query } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "zirako-secret-key-2024-change-in-production"
const JWT_EXPIRES_IN = "7d"

// Interfaz para el payload del JWT
export interface JWTPayload {
  userId: number
  email: string
  name: string
}

// Interfaz para los datos de registro
interface RegisterProps {
  email: string
  password: string
  name: string
  rol_id: number // Ahora es el ID de la tabla roles
  tipo_documento: string
  numero_documento: string
  phone?: string
  ciudad?: string
  direccion?: string
}

// Hash de contraseña
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

// Verificar contraseña
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Generar token JWT
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verificar token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error al verificar token:", error)
    return null
  }
}

// Generar token de verificación de email
export function generateVerificationToken(): string {
  return jwt.sign({ purpose: "email-verification" }, JWT_SECRET, { expiresIn: "24h" })
}

// Generar token de recuperación de contraseña
export function generatePasswordResetToken(): string {
  return jwt.sign({ purpose: "password-reset" }, JWT_SECRET, { expiresIn: "1h" })
}

// Registrar nuevo usuario
export async function registerUser({
  email,
  password,
  name,
  rol_id,
  tipo_documento,
  numero_documento,
  phone,
  ciudad,
  direccion
}: RegisterProps) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await query<any>("SELECT id FROM usuarios WHERE email = ?", [email])
    if (existingUser.rows.length > 0) {
      return { success: false, error: "El correo electrónico ya está registrado" }
    }

    // Verificar si el documento ya existe
    const existingDoc = await query<any>("SELECT id FROM usuarios WHERE numero_documento = ?", [numero_documento])
    if (existingDoc.rows.length > 0) {
      return { success: false, error: "El número de documento ya está registrado" }
    }

    // Hash de la contraseña
    const passwordHash = await hashPassword(password)
    const verificationToken = generateVerificationToken()

    // Insertar usuario (usando rol_id)
    await query<any>(
      `INSERT INTO usuarios (
          email, password_hash, nombre, rol_id, tipo_documento, numero_documento, 
          telefono, ciudad, direccion, token_verificacion, puntos, nivel
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1)`,
      [
        email, 
        passwordHash, 
        name, 
        rol_id || 1, // Por defecto rol 1 (Persona) si no viene
        tipo_documento || 'CC', 
        numero_documento, 
        phone || null, 
        ciudad || "Cali", 
        direccion || null, 
        verificationToken
      ],
    )

    // Obtener el usuario insertado con el nombre de su rol
    const newUser = await query<any>(
      `SELECT u.id, u.email, u.nombre, r.nombre as rol, u.created_at 
       FROM usuarios u 
       JOIN roles r ON u.rol_id = r.id 
       WHERE u.email = ?`,
      [email],
    )

    const user = newUser.rows[0]

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.nombre,
        rol: user.rol, // Devolvemos el nombre del rol (ej: 'empresa')
        createdAt: user.created_at,
      },
      verificationToken,
    }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error registro:", error)
    return { success: false, error: "Error interno al registrar" }
  }
}

// Iniciar sesión
export async function loginUser(email: string, password: string) {
  try {
    // Buscar usuario por email y obtener el nombre de su rol
    const result = await query<any>(
      `SELECT u.id, u.email, u.password_hash, u.nombre, r.nombre as rol, 
              u.telefono, u.ciudad, u.puntos, u.nivel, u.email_verificado 
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.email = ?`,
      [email],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Credenciales inválidas" }
    }

    const user = result.rows[0]

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return { success: false, error: "Credenciales inválidas" }
    }

    await query("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?", [user.id])

    // Generar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.nombre,
    })

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
        emailVerified: user.email_verificado,
      },
    }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error al iniciar sesión:", error)
    return { success: false, error: "Error al iniciar sesión" }
  }
}

// Verificar email
export async function verifyEmail(token: string) {
  try {
    const result = await query<any>("SELECT id, email, nombre FROM usuarios WHERE token_verificacion = ?", [token])

    if (result.rows.length === 0) {
      return { success: false, error: "Token de verificación inválido" }
    }

    const user = result.rows[0]

    await query("UPDATE usuarios SET email_verificado = TRUE, token_verificacion = NULL WHERE id = ?", [user.id])

    return { success: true, message: "Email verificado exitosamente", user }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error al verificar email:", error)
    return { success: false, error: "Error al verificar email" }
  }
}

// Solicitar recuperación de contraseña
export async function requestPasswordReset(email: string) {
  try {
    const result = await query<any>("SELECT id, nombre FROM usuarios WHERE email = ?", [email])

    if (result.rows.length === 0) {
      return { success: true, message: "Si el correo existe, recibirás un enlace de recuperación" }
    }

    const user = result.rows[0]
    const resetToken = generatePasswordResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    await query("UPDATE usuarios SET token_reset_password = ?, reset_password_expira = ? WHERE id = ?", [
      resetToken,
      expiresAt,
      user.id,
    ])

    return { success: true, resetToken, user }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error recuperación contraseña:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

// Restablecer contraseña
export async function resetPassword(token: string, newPassword: string) {
  try {
    const result = await query<any>(
      "SELECT id FROM usuarios WHERE token_reset_password = ? AND reset_password_expira > NOW()",
      [token],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Token inválido o expirado" }
    }

    const user = result.rows[0]
    const passwordHash = await hashPassword(newPassword)

    await query(
      "UPDATE usuarios SET password_hash = ?, token_reset_password = NULL, reset_password_expira = NULL WHERE id = ?",
      [passwordHash, user.id],
    )

    return { success: true, message: "Contraseña actualizada exitosamente" }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error restablecer contraseña:", error)
    return { success: false, error: "Error al restablecer contraseña" }
  }
}

// Obtener usuario por ID (con rol desde la tabla roles)
export async function getUserById(id: number) {
  try {
    const result = await query<any>(
      `SELECT u.id, u.email, u.nombre, r.nombre as rol, u.telefono, u.ciudad, u.direccion, 
              u.puntos, u.nivel, u.email_verificado, u.created_at 
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ?`,
      [id],
    )

    if (result.rows.length === 0) return null

    const user = result.rows[0]
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
      createdAt: user.created_at,
    }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error obtener usuario:", error)
    return null
  }
}

export async function addPointsToUser(userId: number, points: number, reason: string) {
  try {
    await query("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?", [points, userId])

    // Recalcular nivel
    const result = await query<any>("SELECT puntos FROM usuarios WHERE id = ?", [userId])
    if (result.rows.length > 0) {
      const totalPoints = result.rows[0].puntos
      let newLevel = 1
      if (totalPoints >= 1000) newLevel = 5 
      else if (totalPoints >= 500) newLevel = 4 
      else if (totalPoints >= 200) newLevel = 3 
      else if (totalPoints >= 50) newLevel = 2 

      await query("UPDATE usuarios SET nivel = ? WHERE id = ?", [newLevel, userId])
    }
    return { success: true }
  } catch (error) {
    console.error("[ZIRAKO AUTH] Error agregar puntos:", error)
    return { success: false }
  }
}