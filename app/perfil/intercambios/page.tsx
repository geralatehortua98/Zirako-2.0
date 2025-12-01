"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, RefreshCw, Loader2, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Intercambio {
  id: number
  titulo_ofrecido: string
  titulo_solicitado: string
  nombre_propone: string
  nombre_recibe: string
  estado: string
  created_at: string
  imagenes_ofrecido: string[]
  imagenes_solicitado: string[]
  usuario_propone_id: number
  usuario_recibe_id: number
}

export default function MisIntercambiosPage() {
  const [intercambios, setIntercambios] = useState<Intercambio[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem("zirako_user_id")
    if (storedId) setUserId(Number(storedId))
    cargarIntercambios()
  }, [])

  const cargarIntercambios = async () => {
    try {
      const res = await fetch("/api/exchanges", { credentials: "include" })
      const data = await res.json()

      if (data.success) {
        setIntercambios(data.data || [])
      }
    } catch (error) {
      console.error("Error cargando intercambios:", error)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
        case 'pendiente': return 'bg-yellow-500/20 text-yellow-500';
        case 'aceptado': return 'bg-green-500/20 text-green-400';
        case 'rechazado': return 'bg-red-500/20 text-red-400';
        case 'completado': return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-gray-500/20 text-gray-400';
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/perfil">
            <Button
              variant="outline"
              className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Regresar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Mis Intercambios</h1>
        </div>

        {/* Lista de intercambios */}
        {intercambios.length === 0 ? (
            <Card className="bg-secondary border-secondary p-12 text-center text-white/70">
                <RefreshCw className="h-16 w-16 mx-auto mb-4 opacity-50"/>
                <p className="text-lg">No has realizado intercambios aún.</p>
                <Link href="/buscar?q=intercambio">
                    <Button className="mt-4 bg-accent text-accent-foreground">Buscar artículos</Button>
                </Link>
            </Card>
        ) : (
            <div className="space-y-4">
            {intercambios.map((intercambio) => {
                const soyPropone = userId === intercambio.usuario_propone_id
                const otroUsuario = soyPropone ? intercambio.nombre_recibe : intercambio.nombre_propone
                
                return (
                    <Card key={intercambio.id} className="bg-secondary border-secondary p-4 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        
                        {/* Estado */}
                        <div className="md:w-32 flex-shrink-0 text-center">
                            <span className={`text-xs px-3 py-1 rounded-full uppercase font-bold ${getEstadoColor(intercambio.estado)}`}>
                                {intercambio.estado}
                            </span>
                            <p className="text-xs text-white/40 mt-2">{new Date(intercambio.created_at).toLocaleDateString()}</p>
                        </div>

                        {/* Detalles del intercambio */}
                        <div className="flex-1 flex items-center justify-between w-full bg-primary/30 p-3 rounded-lg border border-white/5">
                            {/* Lo que di */}
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="relative w-12 h-12 rounded bg-black/20 flex-shrink-0 overflow-hidden">
                                    <Image src={intercambio.imagenes_ofrecido[0] || '/placeholder.svg'} alt="item" fill className="object-cover"/>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-white/50">Ofrecido</p>
                                    <p className="font-bold text-white text-sm truncate">{intercambio.titulo_ofrecido}</p>
                                </div>
                            </div>

                            <RefreshCw className="h-5 w-5 text-accent mx-2 flex-shrink-0" />

                            {/* Lo que recibí */}
                            <div className="flex items-center gap-3 flex-1 min-w-0 justify-end text-right">
                                <div className="min-w-0">
                                    <p className="text-xs text-white/50">Solicitado</p>
                                    <p className="font-bold text-white text-sm truncate">{intercambio.titulo_solicitado}</p>
                                </div>
                                <div className="relative w-12 h-12 rounded bg-black/20 flex-shrink-0 overflow-hidden">
                                    <Image src={intercambio.imagenes_solicitado[0] || '/placeholder.svg'} alt="item" fill className="object-cover"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-2 text-right">
                        <p className="text-xs text-white/40">Intercambio con: <span className="text-white/80">{otroUsuario}</span></p>
                    </div>
                    </Card>
                )
            })}
            </div>
        )}
      </div>
    </div>
  )
}