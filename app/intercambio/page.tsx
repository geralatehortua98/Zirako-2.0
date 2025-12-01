"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Package, Loader2, RefreshCw, Search, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ExchangeProposal {
  id: number
  titulo_ofrecido: string
  titulo_solicitado: string
  imagenes_ofrecido: string[]
  imagenes_solicitado: string[]
  nombre_propone: string
  nombre_recibe: string
  estado: string
  created_at: string
  usuario_propone_id: number
  usuario_recibe_id: number
}

export default function IntercambioPage() {
  const router = useRouter()
  const [proposals, setProposals] = useState<ExchangeProposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  useEffect(() => {
    // Obtener ID del usuario actual para saber si recibí o envié la propuesta
    const storedId = localStorage.getItem("zirako_user_id")
    if (storedId) setCurrentUserId(Number(storedId))
    
    fetchExchanges()
  }, [])

  const fetchExchanges = async () => {
    try {
      const response = await fetch("/api/exchanges")
      const data = await response.json()

      if (data.success) {
        setProposals(data.data || [])
      } else {
        setError(data.error || "Error al cargar intercambios")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, nuevoEstado: "aceptado" | "rechazado") => {
    setActionLoading(id)
    try {
      const response = await fetch("/api/exchanges", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setProposals((prev) => 
            prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        )
      } else {
          console.error("Error backend:", data.error)
      }
    } catch (err) {
      console.error("Error al actualizar:", err)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Regresar
            </Button>
          </Link>
        </div>

        {/* ENCABEZADO PRINCIPAL */}
        <Card className="bg-secondary border-secondary p-8 mb-8 text-center">
          <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
             <RefreshCw className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Zona de Intercambios</h1>
          <p className="text-primary-foreground/70 mb-6">Gestiona tus trueques y encuentra nuevas oportunidades</p>
          
          {/* type=intercambio' */}
          <Link href="/buscar?type=intercambio">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 text-lg shadow-lg transition-transform hover:scale-105">
                <Search className="mr-2 h-5 w-5"/> Ver Productos para Intercambiar
            </Button>
          </Link>
        </Card>

        {/* LISTA DE PROPUESTAS */}
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Mis Propuestas</h2>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white">{proposals.length} total</span>
        </div>

        {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>
        ) : proposals.length === 0 ? (
            <div className="text-center py-12 bg-secondary/20 rounded-xl border border-white/10">
                <Package className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Aún no tienes intercambios activos</p>
                <p className="text-sm text-white/40 mt-2">¡Explora productos y haz tu primera propuesta!</p>
            </div>
        ) : (
            <div className="space-y-4">
              {proposals.map((proposal) => {
                const soyElQueRecibe = currentUserId === proposal.usuario_recibe_id
                
                return (
                <Card key={proposal.id} className={`bg-secondary border-secondary p-0 overflow-hidden ${proposal.estado !== 'pendiente' ? 'opacity-80' : ''}`}>
                  {/* Estado Header */}
                  <div className={`px-4 py-2 text-xs font-bold text-center uppercase tracking-widest ${
                      proposal.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-500' :
                      proposal.estado === 'aceptado' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                      {proposal.estado}
                  </div>

                  <div className="p-5">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      
                      {/* LADO IZQUIERDO (Lo que ofrecen) */}
                      <div className="flex-1 w-full bg-primary/30 p-3 rounded-xl border border-white/5">
                         <p className="text-xs text-orange-400 mb-2 font-bold flex items-center gap-1">
                            {soyElQueRecibe ? "TE OFRECEN:" : "TÚ OFRECES:"}
                         </p>
                         <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                                <Image src={proposal.imagenes_ofrecido[0] || "/placeholder.svg"} alt="img" fill className="object-cover"/>
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-white truncate">{proposal.titulo_ofrecido}</p>
                                <p className="text-xs text-white/50">Usuario: {proposal.nombre_propone}</p>
                            </div>
                         </div>
                      </div>

                      {/* ICONO CENTRAL */}
                      <div className="flex-shrink-0 bg-orange-500/20 p-3 rounded-full">
                         <RefreshCw className="h-6 w-6 text-orange-500" />
                      </div>

                      {/* LADO DERECHO (Lo que piden) */}
                      <div className="flex-1 w-full bg-primary/30 p-3 rounded-xl border border-white/5">
                         <p className="text-xs text-green-400 mb-2 font-bold flex items-center gap-1">
                            {soyElQueRecibe ? "POR TU ARTÍCULO:" : "A CAMBIO DE:"}
                         </p>
                         <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                                <Image src={proposal.imagenes_solicitado[0] || "/placeholder.svg"} alt="img" fill className="object-cover"/>
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-white truncate">{proposal.titulo_solicitado}</p>
                                {soyElQueRecibe ? (
                                    <p className="text-xs text-white/50">Es tuyo</p>
                                ) : (
                                    <p className="text-xs text-white/50">De: {proposal.nombre_recibe}</p>
                                )}
                            </div>
                         </div>
                      </div>
                    </div>
                    
                    {/* ACCIONES (Solo si soy el que recibe y está pendiente) */}
                    {proposal.estado === 'pendiente' && soyElQueRecibe && (
                        <div className="mt-6 flex gap-3 justify-end pt-4 border-t border-white/10">
                            <Button 
                                onClick={() => handleUpdateStatus(proposal.id, 'rechazado')}
                                disabled={actionLoading === proposal.id}
                                variant="outline" 
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                                <XCircle className="mr-2 h-4 w-4"/> Rechazar
                            </Button>
                            <Button 
                                onClick={() => handleUpdateStatus(proposal.id, 'aceptado')}
                                disabled={actionLoading === proposal.id}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                {actionLoading === proposal.id ? <Loader2 className="animate-spin h-4 w-4"/> : <><CheckCircle className="mr-2 h-4 w-4"/> Aceptar Intercambio</>}
                            </Button>
                        </div>
                    )}

                    {/* MENSAJE DE ESTADO*/}
                    {proposal.estado === 'aceptado' && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                            <p className="text-green-400 text-sm font-medium">¡Intercambio Aceptado! Revisa tu correo para contactar a la otra parte.</p>
                        </div>
                    )}
                    {proposal.estado === 'rechazado' && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                            <p className="text-red-400 text-sm font-medium">Has rechazado esta propuesta.</p>
                        </div>
                    )}
                  </div>
                </Card>
              )})}
            </div>
        )}
      </div>
    </div>
  )
}