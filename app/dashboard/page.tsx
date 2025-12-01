"use client"

import type React from "react"
import { ZirakoLogo } from "@/components/zirako-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Store,
  Leaf,
  User,
  MapPin,
  TrendingUp,
  Recycle,
  TreeDeciduous,
  Package,
  ChevronRight,
  Truck, 
  Loader2,
  RefreshCw,
  PlusCircle,
  Bell
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface UserData {
  id: number
  nombre: string
  email: string
  puntos: number
  nivel: number
}

interface ImpactoData {
  total_co2: number
  total_acciones: number
  donaciones: number
  intercambios: number
  ventas: number
  recolecciones: number
}

interface Item {
  id: number
  titulo: string
  precio: number
  ciudad: string
  tipo: string
  condicion: string
  imagenes: string[]
  categoria_id: number
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function getTypeLabel(type: string): { label: string; color: string } {
  switch (type) {
    case "venta": return { label: "Venta", color: "bg-emerald-600 text-white" }
    case "donacion": return { label: "Donación", color: "bg-purple-600 text-white" }
    case "intercambio": return { label: "Intercambio", color: "bg-orange-500 text-white" }
    default: return { label: "Disponible", color: "bg-gray-500 text-white" }
  }
}

function getNivelInfo(nivel: number): { nombre: string; color: string } {
  switch (nivel) {
    case 1: return { nombre: "Bronce", color: "text-amber-700" }
    case 2: return { nombre: "Plata", color: "text-gray-400" }
    case 3: return { nombre: "Oro", color: "text-yellow-500" }
    case 4: return { nombre: "Platino", color: "text-cyan-400" }
    case 5: return { nombre: "Diamante", color: "text-purple-400" }
    default: return { nombre: "Bronce", color: "text-amber-700" }
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [impacto, setImpacto] = useState<ImpactoData>({
    total_co2: 0, total_acciones: 0, donaciones: 0, intercambios: 0, ventas: 0, recolecciones: 0,
  })
  const [misArticulos, setMisArticulos] = useState<Item[]>([])
  
  const [destacados, setDestacados] = useState<Item[]>([])
  const [loadingDestacados, setLoadingDestacados] = useState(true)
  
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("zirako_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/auth/login")
      return
    }

    const nombre = localStorage.getItem("zirako_user_name") || "Usuario"
    const email = localStorage.getItem("zirako_user_email") || ""
    const id = Number.parseInt(localStorage.getItem("zirako_user_id") || "0")

    setUserData({ id, nombre, email, puntos: 0, nivel: 1 })

    fetchPerfil()
    fetchImpacto()
    fetchMisArticulos(id)
    fetchDestacados(id) 
  }, [router])

  const fetchImpacto = async () => {
    try {
      const response = await fetch("/api/impacto", { credentials: "include" })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setImpacto({
            total_co2: data.data.total_co2_ahorrado || 0,
            total_acciones: data.data.total_acciones || 0,
            donaciones: data.data.por_tipo?.donacion || 0,
            intercambios: data.data.por_tipo?.intercambio || 0,
            ventas: data.data.por_tipo?.venta || 0,
            recolecciones: data.data.por_tipo?.recoleccion || 0,
          })
        }
      }
    } catch (error) { console.error("Error cargando impacto:", error) }
  }

  const fetchPerfil = async () => {
    try {
      const response = await fetch("/api/usuarios/perfil", { credentials: "include" })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setUserData((prev) => prev ? { ...prev, nombre: data.data.nombre || prev.nombre, puntos: data.data.puntos || 0, nivel: data.data.nivel || 1 } : null)
          if (data.data.nombre) localStorage.setItem("zirako_user_name", data.data.nombre)
        }
      }
    } catch (error) { console.error("Error cargando perfil:", error) }
  }

  const fetchMisArticulos = async (userId: number) => {
    try {
      const response = await fetch(`/api/items/mis-articulos?userId=${userId}`, { credentials: "include" })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setMisArticulos(data.data.slice(0, 3))
        }
      }
    } catch (error) { console.error("Error cargando artículos:", error) }
  }

  
  const fetchDestacados = async (userId: number) => {
    try {
        setLoadingDestacados(true);
        const res = await fetch(`/api/items?limit=6&status=disponible&excludeUserId=${userId}`)
        const data = await res.json()
        
        if(data.success) {
            let items = data.data || [];
            if (items.length > 6) items = items.slice(0, 6);
            setDestacados(items)
        }
    } catch (error) { 
        console.error("Error cargando destacados", error) 
    } finally { 
        setLoadingDestacados(false) 
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const nivelInfo = getNivelInfo(userData?.nivel || 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-accent" />
            <span className="text-accent font-bold text-xl">ZIRAKO</span>
          </div>
          <Link href="/perfil">
            <Button variant="ghost" size="icon" className="text-accent hover:bg-white/20 border-2 border-accent/50">
              <User className="h-7 w-7" />
            </Button>
          </Link>
        </div>

        {/* 1. Impacto */}
        <Card className="bg-gradient-to-r from-emerald-800 to-green-700 border-none p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3"><TreeDeciduous className="h-10 w-10 text-white" /></div>
              <div>
                <p className="text-white/80 text-sm">Hola, {userData?.nombre}</p>
                <h2 className="text-white text-2xl font-bold">Tu Impacto Ambiental</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${nivelInfo.color} bg-white/20`}>Nivel {nivelInfo.nombre}</Badge>
                  <span className="text-white/80 text-sm">{userData?.puntos || 0} puntos</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Recycle className="h-5 w-5 text-green-300" />
                  <span className="text-3xl font-bold text-white">{impacto.total_co2.toFixed(1)}</span>
                </div>
                <p className="text-white/70 text-sm">kg CO₂ ahorrado</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <span className="text-3xl font-bold text-white">{impacto.total_acciones}</span>
                </div>
                <p className="text-white/70 text-sm">acciones eco</p>
              </div>

              <div className="hidden md:flex gap-4">
                <div className="text-center px-4 border-l border-white/20">
                  <span className="text-xl font-bold text-white">{impacto.donaciones}</span>
                  <p className="text-white/70 text-xs">Donaciones</p>
                </div>
                <div className="text-center px-4 border-l border-white/20">
                  <span className="text-xl font-bold text-white">{impacto.intercambios}</span>
                  <p className="text-white/70 text-xs">Intercambios</p>
                </div>
                <div className="text-center px-4 border-l border-white/20">
                  <span className="text-xl font-bold text-white">{impacto.ventas}</span>
                  <p className="text-white/70 text-xs">Ventas</p>
                </div>
                <div className="text-center px-4 border-l border-white/20">
                  <span className="text-xl font-bold text-white">{impacto.recolecciones}</span>
                  <p className="text-white/70 text-xs">Recolecciones</p>
                </div>
              </div>
            </div>

            <Link href="/perfil/impacto">
              <Button className="bg-white text-green-700 hover:bg-white/90 font-semibold">Ver Detalle</Button>
            </Link>
          </div>
        </Card>

        {/* 2. Mis Artículos */}
        <Card className="bg-secondary border-secondary p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="text-primary-foreground font-bold text-lg">Mis Artículos Publicados</h3>
            </div>
            <Link href="/perfil/mis-articulos">
              <Button variant="ghost" className="text-accent hover:bg-white/10 text-sm">Ver todos <ChevronRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>

          {misArticulos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {misArticulos.map((articulo) => {
                const typeInfo = getTypeLabel(articulo.tipo)
                return (
                  <Link key={articulo.id} href={`/item/${articulo.id}`}>
                    <div className="bg-primary/50 rounded-lg p-3 hover:bg-primary/70 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-primary-foreground text-sm truncate flex-1">{articulo.titulo}</h4>
                        <Badge className={`text-xs shrink-0 ${typeInfo.color}`}>{typeInfo.label}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-foreground/70">{articulo.ciudad}</span>
                        <span className="text-accent font-bold text-sm">{articulo.precio > 0 ? formatPrice(articulo.precio) : "Donación"}</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                          {articulo.estado || 'disponible'}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-4"><p className="text-primary-foreground/70 text-sm">No tienes artículos publicados.</p></div>
          )}
        </Card>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
          
          {/* COLUMNA IZQUIERDA (BUSCADOR Y NOVEDADES) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* 3. BARRA DE BÚSQUEDA */}
            <Card className="bg-primary border-secondary p-4 h-auto flex flex-col justify-center">
              <div className="flex justify-center mb-4"><ZirakoLogo className="w-auto h-8"/></div>
              
              <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="text" 
                    placeholder="Buscar productos de la comunidad..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="pl-12 pr-28 bg-accent text-gray-900 placeholder:text-gray-500 border-none h-10 text-sm rounded-full shadow-xl focus-visible:ring-0" 
                />
                <Button 
                    type="submit" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-primary text-white hover:bg-primary/90 rounded-full px-4 font-semibold text-xs"
                >
                    Buscar
                </Button>
              </form>
            </Card>

            {/* 5. NOVEDADES PARA TI */}
            <div className="flex flex-col flex-1">
                <h3 className="text-accent font-bold text-xl mb-4 flex items-center gap-2">
                   <TrendingUp className="h-5 w-5"/> Novedades para ti
                </h3>
                
                {loadingDestacados ? (
                    <div className="flex justify-center items-center h-full bg-secondary/30 rounded-lg py-12"><Loader2 className="animate-spin text-white h-8 w-8"/></div>
                ) : destacados.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-center p-8 bg-primary/20 rounded-lg border border-white/10">
                      <p className="text-white/50">No hay novedades recientes de otros usuarios.</p>
                    </div>
                ) : (
                    // GRID DE NOVEDADES
                    <div className="grid grid-cols-2 gap-4 h-full auto-rows-fr">
                        {destacados.map((item) => {
                            const typeInfo = getTypeLabel(item.tipo)
                            const img = item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : "/placeholder.svg"
                            
                            return (
                                <Link key={item.id} href={`/item/${item.id}`} className="h-full">
                                    <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-all hover:-translate-y-1 overflow-hidden h-full flex flex-col cursor-pointer group">
                                        
                                        {/* IMAGEN: aspect 4:3 estándar, object-contain para que se vea completo, fondo blanco limpio */}
                                        <div className="relative aspect-[4/3] bg-white w-full">
                                            <Image 
                                                src={img} 
                                                alt={item.titulo} 
                                                fill 
                                                className="object-contain p-2 group-hover:scale-105 transition-transform"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                            />
                                            <Badge className={`absolute top-2 right-2 ${typeInfo.color} text-[10px]`}>{typeInfo.label}</Badge>
                                        </div>
                                        
                                        {/* CONTENIDO */}
                                        <div className="p-3 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-semibold text-primary-foreground text-sm line-clamp-2 leading-tight mb-2">{item.titulo}</h4>
                                                <p className="text-xs text-white/50 flex items-center gap-1"><MapPin className="h-3 w-3"/> {item.ciudad}</p>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-white/10">
                                                <p className="font-bold text-accent text-sm">
                                                    {item.precio > 0 ? formatPrice(item.precio) : "Gratis"}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>

          </div>
          
          {/* 4. ACCIONES RÁPIDAS (COLUMNA DERECHA) */}
          <div className="flex flex-col gap-4 h-full lg:min-h-[500px]">
            
            {/* 1. SOLICITUDES (Destacado en Naranja) */}
            <Link href="/perfil/solicitudes" className="flex-1 group">
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-none hover:shadow-lg transition-all p-4 h-full flex flex-row items-center justify-start px-8 gap-6 cursor-pointer rounded-2xl">
                  <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-white text-xl">Solicitudes Recibidas</span>
              </Card>
            </Link>

            {/* 2. MERCADO */}
            <Link href="/categorias" className="flex-1 group">
              <Card className="bg-secondary border-secondary hover:bg-secondary/80 transition-all p-4 h-full flex flex-row items-center justify-start px-8 gap-6 cursor-pointer rounded-2xl">
                  <Store className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-primary-foreground text-xl">Mercado</span>
              </Card>
            </Link>

            {/* 3. RECOLECCIÓN */}
            <Link href="/recoleccion" className="flex-1 group">
              <Card className="bg-secondary border-secondary hover:bg-secondary/80 transition-all p-4 h-full flex flex-row items-center justify-start px-8 gap-6 cursor-pointer rounded-2xl">
                  <Truck className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-primary-foreground text-xl">Recolección</span>
              </Card>
            </Link>

            {/* 4. INTERCAMBIO */}
            <Link href="/intercambio" className="flex-1 group">
              <Card className="bg-secondary border-secondary hover:bg-secondary/80 transition-all p-4 h-full flex flex-row items-center justify-start px-8 gap-6 cursor-pointer rounded-2xl">
                  <RefreshCw className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-primary-foreground text-xl">Intercambio</span>
              </Card>
            </Link>

            {/* 5. PUBLICAR */}
            <Link href="/publicar" className="flex-1 group">
              <Card className="bg-secondary border-secondary hover:bg-secondary/80 transition-all p-4 h-full flex flex-row items-center justify-start px-8 gap-6 cursor-pointer rounded-2xl">
                  <PlusCircle className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-primary-foreground text-xl">Publicar</span>
              </Card>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}