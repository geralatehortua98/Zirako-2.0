import mysql from "mysql2/promise"

// 1. Declarar variable global para evitar múltiples conexiones en modo desarrollo
declare global {
  var mysqlPool: mysql.Pool | undefined
}

let pool: mysql.Pool

// 2. Configuración de la conexión
// Usamos las variables de entorno que configuramos en .env.local
const dbConfig = {
  uri: process.env.DATABASE_URL, // Prioridad a la URL completa
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true, // Vital para Railway
  keepAliveInitialDelay: 0,
}

// 3. Lógica Singleton: Si ya existe un pool, úsalo. Si no, créalo.
if (!global.mysqlPool) {
  // Si hay una URL completa (DATABASE_URL), úsala
  if (process.env.DATABASE_URL) {
      global.mysqlPool = mysql.createPool({
          uri: process.env.DATABASE_URL,
          waitForConnections: true,
          connectionLimit: 10,
          enableKeepAlive: true
      })
  } else {
      // Si no, usa los parámetros individuales
      global.mysqlPool = mysql.createPool(dbConfig)
  }
}

pool = global.mysqlPool

// 4. Función helper para ejecutar queries
export async function query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; fields?: any }> {
  try {
    const [rows, fields] = await pool.execute(sql, params || [])
    return { rows: rows as T[], fields }
  } catch (error) {
    console.error("[ZIRAKO DB] Error ejecutando query:", error)
    throw error
  }
}

// 5. Verificar conexión (Opcional, para debugging)
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    console.log("[ZIRAKO DB] Conexión a MySQL Railway exitosa")
    return true
  } catch (error) {
    console.error("[ZIRAKO DB] Error conectando a MySQL Railway:", error)
    return false
  }
}

export default pool