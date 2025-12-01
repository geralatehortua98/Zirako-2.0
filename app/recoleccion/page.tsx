"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Truck, Leaf, ChevronLeft, CalendarIcon, CheckCircle, Loader2, AlertCircle, Clock, Plus, MapPin, Package, Building2, Phone, User, Play, CheckCheck } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

const horariosDisponibles = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"]
const materiales = [
    {id: 'mezclado', nombre: 'Mezclado (Varios)'},
    {id: 'plastico', nombre: 'Plástico'},
    {id: 'vidrio', nombre: 'Vidrio'},
    {id: 'carton', nombre: 'Papel y Cartón'},
    {id: 'metal', nombre: 'Chatarra y Metal'},
    {id: 'electronicos', nombre: 'Electrónicos (RAEE)'}
]

type ViewState = "list" | "form"

interface Recoleccion {
  id: number
  direccion: string
  ciudad: string
  fecha_programada: string
  horario_preferido: string
  descripcion: string
  estado: string
  created_at: string
  codigo_recoleccion?: string
  tipo_material?: string
  recolector_nombre?: string 
  solicitante_nombre?: string 
  solicitante_telefono?: string 
}

interface Recolector {
    id: number
    nombre: string
    nombre_empresa?: string
}

function RecoleccionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Vista por defecto: LISTA
  const [view, setView] = useState<ViewState>("list")
  
  const [recolecciones, setRecolecciones] = useState<Recoleccion[]>([])
  const [recolectores, setRecolectores] = useState<Recolector[]>([])
  const [loadingList, setLoadingList] = useState(false)
  const [userRoleId, setUserRoleId] = useState<number>(1)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  // Form states
  const [direccion, setDireccion] = useState("")
  const [ciudad, setCiudad] = useState("Cali")
  const [fecha, setFecha] = useState<Date>()
  const [horario, setHorario] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipoMaterial, setTipoMaterial] = useState("mezclado")
  const [recolectorId, setRecolectorId] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [recoleccionId, setRecoleccionId] = useState<string>("")

  // --- Si la URL dice ?new=true, abrimos el formulario ---
  useEffect(() => {
      const isNew = searchParams.get('new')
      if (isNew === 'true') {
          setView('form')
      }
  }, [searchParams])
  // ---------------------------------------------------------------------

  const resetForm = () => {
    setDireccion(""); setCiudad("Cali"); setFecha(undefined); setHorario(""); setDescripcion(""); setTipoMaterial("mezclado"); setRecolectorId(""); setError("")
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("zirako_user")
    if (storedUser) {
        const parsed = JSON.parse(storedUser)
        if (parsed.rol === 'recolector' || parsed.rol === 'empresa_recolectora' || Number(parsed.rol_id) === 3) {
            setUserRoleId(3)
        }
    }
    
    fetch('/api/users?rol=empresa_recolectora')
        .then(res => res.json())
        .then(data => {
            if(data.success && Array.isArray(data.data)) {
                setRecolectores(data.data)
            }
        })
        .catch(err => console.error("Error cargando empresas:", err))
  }, [])

  useEffect(() => {
    if (view === "list") fetchRecolecciones()
  }, [view])

  const fetchRecolecciones = async () => {
    setLoadingList(true)
    try {
      const res = await fetch("/api/collections?mis_recolecciones=true", { credentials: "include" })
      const data = await res.json()
      if (data.success) setRecolecciones(data.data || [])
    } catch (error) { console.error(error) } 
    finally { setLoadingList(false) }
  }

  const handleStatusUpdate = async (id: number, nuevoEstado: string) => {
      setUpdatingId(id)
      try {
          const res = await fetch("/api/collections", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id, estado: nuevoEstado })
          })
          if(res.ok) {
              setRecolecciones(prev => prev.map(r => r.id === id ? {...r, estado: nuevoEstado} : r))
          }
      } catch (e) {
          console.error(e)
      } finally {
          setUpdatingId(null)
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!direccion.trim() || !fecha || !horario || !descripcion.trim() || !recolectorId) {
      setError("Por favor completa todos los campos obligatorios."); return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          direccion: direccion.trim(), ciudad, fecha: fecha.toISOString(), horario, descripcion: descripcion.trim(), recolector_id: Number(recolectorId), tipo_material: tipoMaterial
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setRecoleccionId(data.data.id) 
      setShowSuccess(true)
    } catch (err: any) { setError(err.message) } 
    finally { setIsLoading(false) }
  }

  const renderForm = () => (
    <Card className="bg-secondary border-secondary p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-accent rounded-full p-6 mb-4 relative shadow-lg"><Truck className="h-12 w-12 text-primary" /><Leaf className="h-6 w-6 text-primary absolute -top-1 -right-1 bg-white rounded-full p-1" /></div>
        <h1 className="text-2xl font-bold text-primary-foreground text-center">Agendar Recolección</h1>
      </div>
      {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-2">
            <Label className="text-white flex items-center gap-2 font-bold"><Building2 className="h-4 w-4"/> Empresa Recolectora *</Label>
            <Select value={recolectorId} onValueChange={setRecolectorId}>
              <SelectTrigger className="bg-white text-gray-900 border-none h-12"><SelectValue placeholder="Selecciona quién recogerá" /></SelectTrigger>
              <SelectContent className="bg-white">
                {recolectores.length > 0 ? (
                    recolectores.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                            {r.nombre_empresa ? r.nombre_empresa : r.nombre}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-2 text-sm text-gray-500 text-center">Cargando empresas...</div>
                )}
              </SelectContent>
            </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-white">Tipo de Material</Label>
            <Select value={tipoMaterial} onValueChange={setTipoMaterial}>
              <SelectTrigger className="bg-white text-gray-900 border-none h-12"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white">{materiales.map((m) => <SelectItem key={m.id} value={m.id}>{m.nombre}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-12 bg-white text-gray-900 border-none", !fecha && "text-gray-500")}><CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />{fecha ? format(fecha, "PPP", { locale: es }) : "Seleccionar"}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start"><Calendar mode="single" selected={fecha} onSelect={setFecha} disabled={{ before: new Date() }} locale={es} initialFocus /></PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Dirección de recogida</Label>
          <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ej: Calle 5 #10-20" className="bg-white text-gray-900 border-none h-12" />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Horario preferido</Label>
          <Select value={horario} onValueChange={setHorario}>
            <SelectTrigger className="bg-white text-gray-900 border-none h-12"><SelectValue placeholder="Selecciona horario" /></SelectTrigger>
            <SelectContent className="bg-white">{horariosDisponibles.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Descripción / Cantidad aprox</Label>
          <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Ej: 3 bolsas..." className="bg-white text-gray-900 border-none min-h-32 resize-none" />
        </div>
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => setView("list")} className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 h-14">Cancelar</Button>
          <Button type="submit" disabled={isLoading} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-bold">{isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirmar Agendamiento"}</Button>
        </div>
      </form>
    </Card>
  )

  const renderList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg border border-white/5">
        <h2 className="text-xl font-bold text-white">{userRoleId === 3 ? 'Órdenes Asignadas' : 'Historial de Solicitudes'}</h2>
        
        {userRoleId !== 3 && (
            <Button 
                onClick={() => { resetForm(); setView("form"); }} 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
                <Plus className="h-5 w-5 mr-2" /> Nueva Recolección
            </Button>
        )}
      </div>

      {loadingList ? <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-white" /></div> : 
       recolecciones.length === 0 ? (
            <Card className="bg-secondary border-secondary p-12 text-center text-white/70">
                <Truck className="h-16 w-16 mx-auto mb-4 opacity-50"/>
                <p className="text-lg mb-2">No hay recolecciones activas</p>
                {userRoleId !== 3 && <p className="text-sm opacity-70">¡Programa tu primera recolección arriba!</p>}
            </Card>
       ) : (
        <div className="grid gap-4">
          {recolecciones.map((rec) => (
            <Card key={rec.id} className="bg-secondary border-secondary p-5 hover:bg-secondary/90 transition-colors">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 border-b border-white/10 pb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary p-2 rounded-lg mt-1"><Truck className="h-6 w-6 text-accent" /></div>
                  <div>
                    <p className="font-bold text-white text-lg flex items-center gap-2">
                        Orden #{rec.codigo_recoleccion || rec.id}
                        {rec.tipo_material && <span className="text-xs font-normal bg-white/10 px-2 py-0.5 rounded text-white/80">{rec.tipo_material}</span>}
                    </p>
                    {userRoleId === 3 ? (
                        <div className="mt-1 space-y-1">
                            <p className="text-sm text-green-300 font-medium flex items-center gap-1"><User className="h-3 w-3"/> Solicitante: {rec.solicitante_nombre || 'Usuario'}</p>
                            {rec.solicitante_telefono && <p className="text-xs text-white/60 flex items-center gap-1 ml-4"><Phone className="h-3 w-3"/> {rec.solicitante_telefono}</p>}
                        </div>
                    ) : <p className="text-xs text-white/50 mt-1">Empresa encargada: <span className="text-white/80 font-medium">{rec.recolector_nombre || 'Asignando...'}</span></p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${rec.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' : 
                      rec.estado === 'completada' ? 'bg-green-500/20 text-green-400' : 
                      'bg-blue-500/20 text-blue-400'}`}>{rec.estado}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-white/80">
                <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-accent shrink-0" /> {new Date(rec.fecha_programada).toLocaleDateString()}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent shrink-0" /> {rec.horario_preferido}</div>
                <div className="flex items-center gap-2 md:col-span-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> {rec.direccion}, {rec.ciudad}</div>
                {rec.descripcion && <div className="flex items-start gap-2 md:col-span-2 mt-2 bg-black/20 p-2 rounded"><Package className="h-4 w-4 text-accent shrink-0 mt-0.5" /><span className="italic">{rec.descripcion}</span></div>}
              </div>

              {userRoleId === 3 && rec.estado !== 'completada' && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-end gap-3">
                      {rec.estado === 'pendiente' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusUpdate(rec.id, 'en_camino')}
                            disabled={updatingId === rec.id}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                              {updatingId === rec.id ? <Loader2 className="animate-spin h-4 w-4"/> : <><Play className="h-4 w-4 mr-1"/> En Camino</>}
                          </Button>
                      )}
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusUpdate(rec.id, 'completada')}
                        disabled={updatingId === rec.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                          {updatingId === rec.id ? <Loader2 className="animate-spin h-4 w-4"/> : <><CheckCheck className="h-4 w-4 mr-1"/> Completar Orden</>}
                      </Button>
                  </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const handleBack = () => {
      if (view === 'form') {
          setView('list')
      } else {
          router.push('/dashboard')
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" /> Regresar
          </Button>
          
          <h1 className="text-3xl font-bold text-white flex items-center gap-2"><Truck className="h-8 w-8 text-accent" /> Recolección</h1>
        </div>

        {view === "list" && renderList()}
        {view === "form" && renderForm()}
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-secondary text-primary-foreground sm:max-w-md">
          <DialogHeader><div className="flex justify-center mb-4"><div className="bg-green-500/20 rounded-full p-4"><CheckCircle className="h-16 w-16 text-green-500" /></div></div><DialogTitle className="text-center text-2xl">¡Solicitud Exitosa!</DialogTitle><DialogDescription className="text-center text-primary-foreground/70">Tu recolección ha sido asignada.</DialogDescription></DialogHeader>
          <div className="bg-primary rounded-lg p-4 my-2 text-center"><p className="text-primary-foreground/70 text-sm uppercase tracking-wider mb-1">Código de Orden</p><p className="text-3xl font-black text-accent tracking-wide">{recoleccionId}</p></div>
          <div className="flex flex-col gap-3 mt-2">
            <Button onClick={() => { setShowSuccess(false); resetForm(); setView("form"); }} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-12 text-base"><Plus className="mr-2 h-5 w-5" /> Crear nueva solicitud</Button>
            <Button variant="outline" onClick={() => { setShowSuccess(false); resetForm(); setView("list"); }} className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 h-10">Ver mis órdenes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function RecoleccionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary flex items-center justify-center"><Loader2 className="animate-spin text-accent h-8 w-8"/></div>}>
      <RecoleccionContent />
    </Suspense>
  )
}