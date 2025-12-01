"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { ShoppingCart, Repeat, Gift, Edit, Loader2, CheckCircle, AlertCircle, DollarSign, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductSelector } from "@/components/product-selector" 

interface ItemActionsProps {
  item: any
  isOwner: boolean
  currentUserId: number | null
}

export default function ItemActionsButtons({ item, isOwner, currentUserId }: ItemActionsProps) {
  const router = useRouter()
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [proposalType, setProposalType] = useState<"compra" | "intercambio" | "donacion">("compra")
  
  const [mensaje, setMensaje] = useState("")
  const [ofertaPrecio, setOfertaPrecio] = useState("") 
  const [selectedExchangeId, setSelectedExchangeId] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  // CASO 1: Artículo ya no disponible
  if (item.estado === 'completado' || item.estado === 'eliminado') {
      return (
        <div className="mt-6 p-6 bg-gray-500/20 rounded-xl text-center border border-white/10">
            <div className="flex justify-center mb-2"><Lock className="h-8 w-8 text-gray-400"/></div>
            <p className="text-lg font-bold text-gray-300">Artículo No Disponible</p>
            <p className="text-sm text-gray-400 mt-1">Este artículo ya no se encuentra activo.</p>
        </div>
      )
  }

  // CASO 2: Eres el dueño
  if (isOwner) {
    return (
      <div className="flex flex-col gap-3 mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
        <p className="text-center text-primary-foreground/80 text-sm font-medium mb-2">
          Eres el propietario de esta publicación
        </p>
        <Button
          onClick={() => router.push(`/editar-item/${item.id}`)} 
          className="w-full h-12 text-lg bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
        >
          <Edit className="h-5 w-5 mr-2" />
          Editar Artículo
        </Button>
      </div>
    )
  }

  // CASO 3: Usuario normal (Botones únicos por tipo)
  const openModal = (type: "compra" | "intercambio" | "donacion") => {
    if (!currentUserId) {
      router.push("/auth/login")
      return
    }
    setProposalType(type)
    setMensaje("")
    setOfertaPrecio("")
    setSelectedExchangeId(null)
    setError("")
    setShowProposalModal(true)
  }

  const formatCurrency = (val: string) => val.replace(/\D/g, "")

  const handleSendProposal = async () => {
      setError("")
      setIsLoading(true);

      try {
        let endpoint = "/api/contactar" 
        let body: any = {}

        if (proposalType === "intercambio") {
            if (!selectedExchangeId) throw new Error("Debes seleccionar un artículo para intercambiar")
            endpoint = "/api/exchanges"
            body = {
                item_ofrecido_id: selectedExchangeId,
                item_solicitado_id: item.id,
                mensaje: "Propuesta de intercambio enviada."
            }
        } else {
            if (proposalType === "compra" && !ofertaPrecio) throw new Error("Por favor ingresa el valor de tu oferta")
            if (!mensaje.trim()) throw new Error("Por favor escribe un mensaje")
            
            body = {
                itemId: item.id, 
                itemName: item.titulo, 
                sellerEmail: item.email_vendedor, 
                sellerName: item.nombre_vendedor,
                mensaje: mensaje, 
                tipo: proposalType,
                ofertaPrecio: proposalType === 'compra' ? ofertaPrecio : 0
            }
        }

        const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "Error al procesar la solicitud")

        setShowProposalModal(false)
        setShowSuccess(true)

      } catch (err: any) { setError(err.message) } 
      finally { setIsLoading(false) }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* BOTONES SEGÚN EL TIPO */}
      {item.tipo === "venta" && (
        <Button onClick={() => openModal("compra")} className="w-full h-14 text-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-lg">
          <ShoppingCart className="h-6 w-6 mr-2" /> Hacer Oferta
        </Button>
      )}

      {item.tipo === "intercambio" && (
        <Button onClick={() => openModal("intercambio")} className="w-full h-14 text-xl bg-orange-500 text-white hover:bg-orange-600 font-bold shadow-lg">
          <Repeat className="h-6 w-6 mr-2" /> Proponer Intercambio
        </Button>
      )}

      {item.tipo === "donacion" && (
        <Button onClick={() => openModal("donacion")} className="w-full h-14 text-xl bg-purple-600 text-white hover:bg-purple-700 font-bold shadow-lg">
          <Gift className="h-6 w-6 mr-2" /> Solicitar Donación
        </Button>
      )}

      {/* MODAL PROPUESTA */}
      <Dialog open={showProposalModal} onOpenChange={setShowProposalModal}>
        <DialogContent className="bg-secondary border-secondary text-primary-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {proposalType === "compra" && "Tu Oferta de Compra"}
              {proposalType === "intercambio" && "Elige qué ofrecer"}
              {proposalType === "donacion" && "Solicitud de Donación"}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
                Esta solicitud quedará registrada y el dueño recibirá una notificación.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-md flex items-center gap-2 text-sm border border-red-500/50"><AlertCircle className="h-4 w-4" /> {error}</div>}

            {proposalType === "intercambio" && <ProductSelector userId={currentUserId} selectedId={selectedExchangeId} onSelect={setSelectedExchangeId} />}

            {proposalType === "compra" && (
                <div className="space-y-2">
                    <Label className="text-primary-foreground">Tu Oferta ($ COP)</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
                        <Input type="number" value={ofertaPrecio} onChange={(e) => setOfertaPrecio(formatCurrency(e.target.value))} placeholder="Ej: 150000" className="pl-9 bg-white text-gray-900 border-none h-12 text-lg font-semibold"/>
                    </div>
                    <p className="text-xs text-primary-foreground/60 text-right">Precio publicado: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(item.precio)}</p>
                </div>
            )}

            {proposalType !== 'intercambio' && (
                <div className="space-y-2">
                    <Label className="text-primary-foreground">Mensaje para el vendedor</Label>
                    <Textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder={proposalType === "compra" ? "Ej: Puedo recogerlo mañana..." : "Hola, me gustaría recibir esta donación..."} className="bg-primary/50 border-white/10 min-h-[100px] text-white placeholder:text-white/40"/>
                </div>
            )}
          </div>

          <Button onClick={handleSendProposal} disabled={isLoading} className={`w-full h-12 text-lg font-bold ${proposalType === "compra" ? "bg-emerald-600 hover:bg-emerald-700" : proposalType === "intercambio" ? "bg-orange-500 hover:bg-orange-600" : "bg-purple-600 hover:bg-purple-700"}`}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2"/> : "Enviar Solicitud"}
          </Button>
        </DialogContent>
      </Dialog>

       {/* MODAL ÉXITO CORREGIDO */}
       <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-secondary text-primary-foreground sm:max-w-md text-center">
           {/* Aquí agregamos DialogHeader y DialogTitle para accesibilidad */}
           <DialogHeader>
               <div className="flex justify-center mb-4">
                   <div className="bg-green-500/20 rounded-full p-4">
                       <CheckCircle className="h-12 w-12 text-green-500" />
                   </div>
               </div>
               <DialogTitle className="text-xl font-bold mb-2 text-center text-primary-foreground">
                   ¡Solicitud Enviada!
               </DialogTitle>
               <DialogDescription className="text-primary-foreground/70 mb-4 text-center">
                   El dueño ha sido notificado y la solicitud quedó registrada en tu historial.
               </DialogDescription>
           </DialogHeader>
           
           <Button onClick={() => setShowSuccess(false)} className="w-full bg-accent text-accent-foreground mt-2">
               Entendido
           </Button>
        </DialogContent>
       </Dialog>
    </div>
  )
}