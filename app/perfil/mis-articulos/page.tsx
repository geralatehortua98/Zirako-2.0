"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Package, Trash2, Eye, Loader2, Plus, MapPin, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner" // Asumiendo que usas sonner o el toast que tengas

interface Item {
  id: number
  titulo: string
  descripcion: string
  tipo: "venta" | "donacion" | "intercambio"
  condicion: string
  precio: number
  ciudad: string
  imagenes: string[]
  estado: string
  vistas: number
  created_at: string
  nombre_categoria: string
}

export default function MisArticulosPage() {
  const router = useRouter()
  const [articulos, setArticulos] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Estados para modales
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [completeId, setCompleteId] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("zirako_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/auth/login")
      return
    }
    fetchArticulos()
  }, [router])

  const fetchArticulos = async () => {
    try {
      const userId = localStorage.getItem("zirako_user_id")
      const url = userId ? `/api/items/mis-articulos?userId=${userId}` : '/api/items/mis-articulos'
      
      const response = await fetch(url, { credentials: "include" })
      const data = await response.json()

      if (response.status === 401) {
        localStorage.removeItem("zirako_logged_in")
        router.push("/auth/login")
        return
      }

      if (data.success) {
        setArticulos(data.data)
      } else {
        setError(data.error || "Error al cargar artículos")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/items/${deleteId}`, { method: "DELETE", credentials: "include" })
      const data = await response.json()
      if (data.success) {
        setArticulos((prev) => prev.filter((a) => a.id !== deleteId))
      }
    } catch (err) { setError("Error al eliminar") } 
    finally { setIsProcessing(false); setDeleteId(null) }
  }

  const handleComplete = async () => {
      if (!completeId) return
      setIsProcessing(true)
      try {
          // Llamada a la NUEVA API
          const response = await fetch(`/api/items/${completeId}/complete`, { 
              method: "POST", 
              credentials: "include" 
          })
          const data = await response.json()
          
          if (data.success) {
              // Actualizar estado localmente para reflejar cambio inmediato
              setArticulos(prev => prev.map(a => a.id === completeId ? {...a, estado: 'completado'} : a))
              // Opcional: Mostrar mensaje de éxito o recargar dashboard
          } else {
              alert(data.error) // Fallback simple
          }
      } catch (err) {
          console.error(err)
      } finally {
          setIsProcessing(false); setCompleteId(null)
      }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "venta": return <Badge className="bg-emerald-600 text-white">Venta</Badge>
      case "donacion": return <Badge className="bg-purple-600 text-white">Donación</Badge>
      case "intercambio": return <Badge className="bg-orange-500 text-white">Intercambio</Badge>
      default: return null
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "disponible": return <Badge variant="outline" className="border-green-500 text-green-500 bg-green-500/10">Disponible</Badge>
      case "reservado": return <Badge variant="outline" className="border-yellow-500 text-yellow-500 bg-yellow-500/10">Reservado</Badge>
      case "completado": return <Badge variant="outline" className="border-gray-500 text-gray-500 bg-gray-500/10">Completado</Badge>
      default: return null
    }
  }

  const formatPrecio = (precio: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(precio)
  const formatFecha = (fecha: string) => new Date(fecha).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" })

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/perfil"><Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"><ChevronLeft className="h-5 w-5" /> Regresar</Button></Link>
            <h1 className="text-2xl font-bold text-primary-foreground">Mis Artículos</h1>
          </div>
          <Link href="/publicar"><Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"><Plus className="h-5 w-5 mr-2" /> Publicar</Button></Link>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">{error}</div>}

        {isLoading ? <div className="flex justify-center items-center py-20"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div> : 
         articulos.length === 0 ? (
          <Card className="bg-secondary border-secondary p-12 text-center">
            <Package className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary-foreground mb-2">No tienes artículos publicados</h2>
            <p className="text-primary-foreground/70 mb-6">Comienza a vender, donar o intercambiar</p>
            <Link href="/publicar"><Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8"><Plus className="h-5 w-5 mr-2" /> Publicar mi primer artículo</Button></Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {articulos.map((item) => (
              <Card key={item.id} className={`bg-secondary border-secondary p-4 transition-colors ${item.estado === 'completado' ? 'opacity-70' : 'hover:bg-secondary/90'}`}>
                <div className="flex gap-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                    {item.imagenes && item.imagenes.length > 0 ? (
                      <Image src={item.imagenes[0] || "/placeholder.svg"} alt={item.titulo} fill className="object-cover" />
                    ) : <div className="flex items-center justify-center h-full"><Package className="h-8 w-8 text-gray-400" /></div>}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-lg text-primary-foreground truncate">{item.titulo}</h3>
                        <div className="flex gap-1 flex-shrink-0">
                          {getTipoBadge(item.tipo)}
                          {getEstadoBadge(item.estado)}
                        </div>
                      </div>
                      <p className="text-sm text-primary-foreground/70 mb-1 capitalize">{item.nombre_categoria || 'Sin categoría'} • {item.condicion}</p>
                      <div className="flex items-center gap-1 text-sm text-primary-foreground/60"><MapPin className="h-3 w-3" />{item.ciudad}</div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between mt-2 gap-2">
                      <div>
                        {item.tipo === "venta" && item.precio > 0 ? <p className="text-accent font-bold text-lg">{formatPrecio(item.precio)}</p> : <p className="text-accent/80 font-semibold text-sm">{item.tipo === "donacion" ? "Donación Gratuita" : "Para Intercambio"}</p>}
                        <div className="flex items-center gap-2 text-xs text-primary-foreground/50 mt-1"><Eye className="h-3 w-3" />{item.vistas} vistas • {formatFecha(item.created_at)}</div>
                      </div>

                      <div className="flex gap-2">
                        {/* Botón Detalles */}
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-medium" onClick={() => router.push(`/item/${item.id}`)}>
                          <Eye className="h-4 w-4 mr-2" /> Ver
                        </Button>
                        
                        {/* Botón Completar (Solo si está disponible) */}
                        {item.estado === 'disponible' && (
                            <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white font-medium border-none"
                                onClick={() => setCompleteId(item.id)}
                            >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {item.tipo === 'venta' ? 'Vendí esto' : item.tipo === 'donacion' ? 'Doné esto' : 'Completar'}
                            </Button>
                        )}

                        {/* Botón Eliminar */}
                        <Button size="sm" variant="outline" onClick={() => setDeleteId(item.id)} className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Alerta Eliminar */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-secondary border-secondary text-primary-foreground">
          <AlertDialogHeader><AlertDialogTitle>¿Eliminar este artículo?</AlertDialogTitle><AlertDialogDescription className="text-primary-foreground/70">Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-accent text-accent hover:bg-accent/10 bg-transparent">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isProcessing} className="bg-red-600 text-white hover:bg-red-700 border-none">{isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Eliminar"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta Completar */}
      <AlertDialog open={completeId !== null} onOpenChange={() => setCompleteId(null)}>
        <AlertDialogContent className="bg-secondary border-secondary text-primary-foreground">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4"><CheckCircle className="h-12 w-12 text-green-500" /></div>
            <AlertDialogTitle className="text-center">¿Confirmar Acción?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-primary-foreground/70">
              Al marcar como completado:
              <ul className="list-disc list-inside mt-2 text-left bg-black/20 p-3 rounded-lg text-sm space-y-1">
                <li>El artículo dejará de ser visible para otros.</li>
                <li>Recibirás tus puntos inmediatamente.</li>
                <li>Se registrará tu ahorro de CO₂.</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-accent text-accent hover:bg-accent/10 bg-transparent">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleComplete} disabled={isProcessing} className="bg-green-600 text-white hover:bg-green-700 border-none w-full sm:w-auto">
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "¡Sí, lo logré!"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}