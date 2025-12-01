"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Truck, Calendar, MapPin, Clock, Package, User, Building2 } from "lucide-react"
import Link from "next/link"

// Actualizamos la interfaz para incluir los datos que faltaban
interface Recoleccion {
  id: number
  direccion: string
  ciudad: string
  fecha_programada: string
  horario_preferido: string
  descripcion: string
  estado: string
  created_at: string
  codigo_recoleccion?: string  // Agregado
  tipo_material?: string       // Agregado
  recolector_nombre?: string   // Agregado
}

export default function MisRecoleccionesPage() {
  const [recolecciones, setRecolecciones] = useState<Recoleccion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarRecolecciones()
  }, [])

  const cargarRecolecciones = async () => {
    try {
      // Esta API ya devuelve todos los datos necesarios
      const res = await fetch("/api/collections?mis_recolecciones=true", {
        credentials: "include",
      })
      const data = await res.json()

      if (data.success) {
        setRecolecciones(data.data || [])
      }
    } catch (error) {
      console.error("Error cargando recolecciones:", error)
    } finally {
      setLoading(false)
    }
  }

  // Colores consistentes con la vista principal
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "pendiente": return "bg-yellow-500/20 text-yellow-400"
      case "confirmada": return "bg-blue-500/20 text-blue-400"
      case "en_camino": return "bg-purple-500/20 text-purple-400"
      case "completada": return "bg-green-500/20 text-green-400"
      case "cancelada": return "bg-red-500/20 text-red-400"
      default: return "bg-gray-500/20 text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/perfil">
              <Button
                variant="outline"
                className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Regresar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Mis Recolecciones</h1>
          </div>
          
          <Link href="/recoleccion?new=true">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6">
              <Truck className="h-4 w-4 mr-2" />
              Nueva Recolección
            </Button>
          </Link>
        </div>

        {/* Lista de recolecciones */}
        {recolecciones.length === 0 ? (
          <Card className="bg-secondary border-secondary p-8 text-center">
            <Truck className="h-12 w-12 text-accent/50 mx-auto mb-4" />
            <p className="text-primary-foreground/70">No tienes recolecciones programadas</p>
            <Link href="/recoleccion?new=true">
              <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                Programar Nueva Recolección
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {recolecciones.map((rec) => (
              <Card key={rec.id} className="bg-secondary border-secondary p-5 hover:bg-secondary/90 transition-colors">
                
                {/* ENCABEZADO DE LA TARJETA (Igual a la vista principal) */}
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 border-b border-white/10 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary p-2 rounded-lg mt-1">
                        <Truck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      {/* CÓDIGO DE ORDEN Y MATERIAL */}
                      <p className="font-bold text-white text-lg flex items-center gap-2">
                          Orden #{rec.codigo_recoleccion || rec.id}
                          {rec.tipo_material && (
                              <span className="text-xs font-normal bg-white/10 px-2 py-0.5 rounded text-white/80">
                                  {rec.tipo_material}
                              </span>
                          )}
                      </p>
                      {/* EMPRESA ENCARGADA */}
                      <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
                          Empresa encargada: 
                          <span className="text-white/80 font-medium">
                              {rec.recolector_nombre || 'Asignando...'}
                          </span>
                      </p>
                    </div>
                  </div>

                  {/* ESTADO (Badge a la derecha) */}
                  <div className="flex items-center gap-2 self-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getEstadoColor(rec.estado)}`}>
                      {rec.estado}
                    </span>
                  </div>
                </div>

                {/* DETALLES (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent shrink-0" /> 
                      {new Date(rec.fecha_programada).toLocaleDateString("es-CO")}
                  </div>
                  <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent shrink-0" /> 
                      {rec.horario_preferido}
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4 text-accent shrink-0" /> 
                      {rec.direccion}, {rec.ciudad}
                  </div>
                  {rec.descripcion && (
                    <div className="flex items-start gap-2 md:col-span-2 mt-2 bg-black/20 p-2 rounded">
                      <Package className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="italic">{rec.descripcion}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}