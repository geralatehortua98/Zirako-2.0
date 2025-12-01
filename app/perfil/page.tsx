"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  Award,
  History,
  RefreshCw,
  HeadphonesIcon,
  LogOut,
  Package,
  Leaf,
  Settings,
  Truck,
  Bell
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Valores por defecto
const defaultStats = {
  total_articulos: 0,
  total_intercambios: 0,
  total_recolecciones: 0,
  total_favoritos: 0
}

const defaultImpacto = {
  total_co2_ahorrado: 0,
  acciones: { donaciones: 0, ventas: 0, intercambios: 0, recolecciones: 0 }
}

interface UserProfile {
  id: number
  nombre: string
  email: string
  telefono: string
  ciudad: string
  nombre_empresa: string
  foto_perfil: string
  puntos: number
  nivel: number
  nivel_nombre: string
  puntos_siguiente_nivel: number
  created_at: string
  estadisticas: typeof defaultStats
  impacto_ambiental: typeof defaultImpacto
}

export default function PerfilPage() {
  const router = useRouter()
  const [perfil, setPerfil] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Carga inmediata del nombre (Fallback)
    const localName = localStorage.getItem("zirako_user_name")
    const localEmail = localStorage.getItem("zirako_user_email")
    
    if (localName) {
      setPerfil(prev => ({
        ...prev,
        id: 0,
        nombre: localName,
        email: localEmail || "",
        telefono: "",
        ciudad: "",
        nombre_empresa: "",
        foto_perfil: "",
        puntos: 0,
        nivel: 1,
        nivel_nombre: "Bronce",
        puntos_siguiente_nivel: 500,
        created_at: "",
        estadisticas: defaultStats,
        impacto_ambiental: defaultImpacto
      } as UserProfile))
    }

    // 2. Carga real de datos desde la API
    cargarPerfil()
  }, [])

  const cargarPerfil = async () => {
    try {
      const res = await fetch("/api/usuarios/perfil", { credentials: "include" })
      const data = await res.json()
      if (data.success) {
        setPerfil(data.data)
      } else {
        console.error("Error API:", data.error)
      }
    } catch (error) { 
      console.error("Error red:", error) 
    } finally { 
      setLoading(false) 
    }
  }

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.clear()
    router.push("/auth/login")
  }

  const getNivelColor = (nivel: number) => {
    const colores: Record<number, string> = { 1: "text-amber-600", 2: "text-gray-400", 3: "text-yellow-500", 4: "text-cyan-400", 5: "text-purple-400" }
    return colores[nivel] || "text-amber-600"
  }

  if (loading && !perfil) return <div className="min-h-screen bg-primary flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard"><Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"><ChevronLeft className="h-5 w-5" /> Regresar</Button></Link>
          <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
          <Link href="/perfil/configuracion"><Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Settings className="h-5 w-5" /></Button></Link>
        </div>

        {/* INFO USUARIO */}
        <Card className="bg-secondary border-secondary p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-accent rounded-full p-4">
              {perfil?.foto_perfil ? (
                <img src={perfil.foto_perfil} alt={perfil.nombre} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  {perfil?.nombre ? perfil.nombre.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">{perfil?.nombre || "Usuario"}</h2>
              <p className="text-primary-foreground/70">{perfil?.email}</p>
              {perfil?.nombre_empresa && <p className="text-sm text-accent">{perfil.nombre_empresa}</p>}
            </div>
          </div>

          {/* TARJETA DE PUNTOS Y NIVEL */}
          <div className="bg-primary rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className={`h-8 w-8 ${getNivelColor(perfil?.nivel || 1)}`} />
                <div>
                  <p className="text-sm text-primary-foreground/70">Puntos ZIRAKO</p>
                  <p className="text-3xl font-bold text-accent">{perfil?.puntos?.toLocaleString() || 0}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-foreground/70">Nivel</p>
                <p className={`text-2xl font-bold ${getNivelColor(perfil?.nivel || 1)}`}>{perfil?.nivel_nombre || "Bronce"}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(100, ((perfil?.puntos || 0) / ((perfil?.puntos || 0) + (perfil?.puntos_siguiente_nivel || 500))) * 100)}%` }} />
            </div>
            <p className="text-xs text-right mt-1 text-primary-foreground/60">{perfil?.puntos_siguiente_nivel || 500} puntos para el siguiente nivel</p>
          </div>

          {/* TARJETA DE IMPACTO */}
          <Link href="/perfil/impacto">
            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50 hover:bg-green-900/40 transition-colors cursor-pointer group relative">
                <div className="absolute top-4 right-4 bg-white text-green-800 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalle</div>
              <div className="flex items-center gap-3 mb-3"><Leaf className="h-6 w-6 text-green-400" /><h3 className="font-semibold text-green-400">Tu Impacto Ambiental</h3></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-2xl font-bold text-white">{perfil?.impacto_ambiental?.total_co2_ahorrado?.toFixed(1) || 0} kg</p><p className="text-sm text-green-400/70">CO₂ evitado</p></div>
                <div><p className="text-2xl font-bold text-white">
                  {(perfil?.impacto_ambiental?.acciones?.donaciones || 0) + 
                   (perfil?.impacto_ambiental?.acciones?.intercambios || 0) + 
                   (perfil?.impacto_ambiental?.acciones?.ventas || 0) + 
                   (perfil?.impacto_ambiental?.acciones?.recolecciones || 0)}
                </p><p className="text-sm text-green-400/70">Acciones realizadas</p></div>
              </div>
            </div>
          </Link>
        </Card>

        {/* MENÚ DE OPCIONES - REORGANIZADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* 1. SOLICITUDES RECIBIDAS (PRIMERO) */}
          <Link href="/perfil/solicitudes">
            <Card className="bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-full -mr-10 -mt-10"></div>
                <div className="bg-orange-500 rounded-full p-3"><Bell className="h-8 w-8 text-white" /></div>
                <div>
                    <h3 className="font-bold text-lg text-white">Solicitudes Recibidas</h3>
                    <p className="text-sm text-white/70">Aceptar Ventas y Donaciones</p>
                </div>
            </Card>
          </Link>

          {/* 2. MIS ARTÍCULOS */}
          <Link href="/perfil/mis-articulos">
            <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-primary rounded-full p-3"><Package className="h-8 w-8 text-accent" /></div>
                <div>
                    <h3 className="font-bold text-lg text-primary-foreground">Mis Artículos</h3>
                    <p className="text-sm text-primary-foreground/70">{perfil?.estadisticas?.total_articulos || 0} publicados</p>
                </div>
            </Card>
          </Link>

          {/* 3. MIS INTERCAMBIOS */}
          <Link href="/perfil/intercambios">
            <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-primary rounded-full p-3"><RefreshCw className="h-8 w-8 text-accent" /></div>
                <div>
                    <h3 className="font-bold text-lg text-primary-foreground">Mis Intercambios</h3>
                    <p className="text-sm text-primary-foreground/70">{perfil?.estadisticas?.total_intercambios || 0} intercambios</p>
                </div>
            </Card>
          </Link>

          {/* 4. MIS RECOLECCIONES */}
          <Link href="/perfil/recolecciones">
            <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-primary rounded-full p-3"><Truck className="h-8 w-8 text-accent" /></div>
                <div>
                    <h3 className="font-bold text-lg text-primary-foreground">Mis Recolecciones</h3>
                    <p className="text-sm text-primary-foreground/70">{perfil?.estadisticas?.total_recolecciones || 0} programadas</p>
                </div>
            </Card>
          </Link>

          {/* 5. HISTORIAL */}
          <Link href="/perfil/historial">
            <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-primary rounded-full p-3"><History className="h-8 w-8 text-accent" /></div>
                <div>
                    <h3 className="font-bold text-lg text-primary-foreground">Historial</h3>
                    <p className="text-sm text-primary-foreground/70">Ver todas tus transacciones</p>
                </div>
            </Card>
          </Link>

          {/* 6. SOPORTE */}
          <Link href="/perfil/soporte">
            <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-colors p-6 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-primary rounded-full p-3"><HeadphonesIcon className="h-8 w-8 text-accent" /></div>
                <div>
                    <h3 className="font-bold text-lg text-primary-foreground">Soporte Técnico</h3>
                    <p className="text-sm text-primary-foreground/70">Ayuda y asistencia</p>
                </div>
            </Card>
          </Link>
        </div>

        {/* BOTÓN CERRAR SESIÓN (Rojo sólido elegante y texto blanco legible) */}
        <Button 
            onClick={handleLogout} 
            className="w-full bg-red-700 hover:bg-red-600 text-white h-12 text-base font-bold shadow-md rounded-xl transition-all border-none"
        >
          <LogOut className="h-5 w-5 mr-2" /> Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}