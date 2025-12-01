"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, CheckCircle, XCircle, Loader2, DollarSign, Gift, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface Solicitud {
  id: number
  tipo: 'venta' | 'donacion'
  valor: number
  mensaje: string
  item_titulo: string
  item_imagenes: string[]
  solicitante_nombre: string
  created_at: string
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  const fetchSolicitudes = async () => {
    try {
      const res = await fetch("/api/solicitudes")
      const data = await res.json()
      if (data.success) setSolicitudes(data.data)
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  const handleAction = async (id: number, tipo: string, accion: 'aceptar' | 'rechazar') => {
      setProcessingId(id)
      try {
          const res = await fetch("/api/solicitudes", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id, tipo, accion })
          })
          const data = await res.json()
          
          if (data.success) {
              setSolicitudes(prev => prev.filter(s => s.id !== id))
              if(accion === 'aceptar') {
                  toast.success("¡Transacción completada! Puntos sumados.")
              } else {
                  toast.info("Solicitud rechazada.")
              }
          }
      } catch (error) { console.error(error) } 
      finally { setProcessingId(null) }
  }

  const formatPrice = (p: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  if (loading) return <div className="min-h-screen bg-primary flex justify-center items-center"><Loader2 className="animate-spin text-white h-8 w-8"/></div>

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/perfil"><Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"><ChevronLeft className="h-5 w-5" /> Regresar</Button></Link>
          <h1 className="text-2xl font-bold text-white">Solicitudes Recibidas</h1>
        </div>

        {solicitudes.length === 0 ? (
            <Card className="bg-secondary border-secondary p-12 text-center">
                <p className="text-primary-foreground/60">No tienes solicitudes pendientes.</p>
            </Card>
        ) : (
            <div className="space-y-4">
                {solicitudes.map((sol) => (
                    <Card key={`${sol.tipo}-${sol.id}`} className="bg-secondary border-secondary p-5">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div className="relative w-20 h-20 bg-black/20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={sol.item_imagenes[0] || '/placeholder.svg'} alt="item" fill className="object-cover"/>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-lg text-white">{sol.item_titulo}</h3>
                                    {sol.tipo === 'venta' ? (
                                        <span className="text-green-400 font-bold flex items-center gap-1"><DollarSign className="h-4 w-4"/> Oferta: {formatPrice(sol.valor)}</span>
                                    ) : (
                                        <span className="text-purple-400 font-bold flex items-center gap-1"><Gift className="h-4 w-4"/> Piden Donación</span>
                                    )}
                                </div>
                                <p className="text-sm text-white/70 flex items-center gap-2 mb-2">
                                    <User className="h-4 w-4"/> De: <span className="font-semibold text-white">{sol.solicitante_nombre}</span>
                                </p>
                                <div className="bg-primary/20 p-3 rounded-lg text-sm text-white/80 italic border border-white/5">
                                    &quot;{sol.mensaje}&quot;
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Button 
                                onClick={() => handleAction(sol.id, sol.tipo, 'rechazar')}
                                disabled={processingId === sol.id}
                                variant="outline" 
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                            >
                                Rechazar
                            </Button>
                            <Button 
                                onClick={() => handleAction(sol.id, sol.tipo, 'aceptar')}
                                disabled={processingId === sol.id}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                {processingId === sol.id ? <Loader2 className="animate-spin h-4 w-4"/> : <><CheckCircle className="mr-2 h-4 w-4"/> Aceptar y Finalizar</>}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}