"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronLeft, Upload, X, CheckCircle, Loader2, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, use } from "react"
import { useRouter } from "next/navigation"

const categorias = [
  { id: "1", nombre: "Electrónica" },
  { id: "2", nombre: "Muebles" },
  { id: "3", nombre: "Ropa y Accesorios" },
  { id: "4", nombre: "Hogar y Cocina" },
  { id: "5", nombre: "Deportes" },
  { id: "6", nombre: "Libros y Educación" },
  { id: "7", nombre: "Juguetes y Juegos" },
  { id: "8", nombre: "Herramientas" },
  { id: "9", nombre: "Vehículos" },
  { id: "10", nombre: "Electrodomésticos" },
  { id: "11", nombre: "Otros" },
]

const ciudadesValle = ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí", "Yumbo"]

export default function EditarItemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loadingData, setLoadingData] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria_id: "",
    condicion: "",
    tipo: "venta",
    precio: "",
    ciudad: "",
    estado: "disponible",
    imagenes: [] as string[]
  })

  useEffect(() => {
    // Cargar datos del artículo
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${resolvedParams.id}`)
        const data = await res.json()

        if (data.success) {
            const item = data.data
            setFormData({
                titulo: item.titulo,
                descripcion: item.descripcion,
                categoria_id: String(item.categoria_id),
                condicion: item.condicion,
                tipo: item.tipo,
                precio: String(item.precio),
                ciudad: item.ciudad,
                estado: item.estado,
                imagenes: item.imagenes || []
            })
        } else {
            setError("No se pudo cargar la información del artículo")
        }
      } catch (err) {
        setError("Error de conexión")
      } finally {
        setLoadingData(false)
      }
    }
    fetchItem()
  }, [resolvedParams.id])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
            setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, event.target!.result as string] }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      const res = await fetch(`/api/items/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            precio: formData.tipo === 'venta' ? Number(formData.precio) : 0,
            categoria_id: Number(formData.categoria_id)
        })
      })
      
      const data = await res.json()
      if (data.success) {
          setShowSuccess(true)
      } else {
          throw new Error(data.error)
      }
    } catch (err: any) {
      setError(err.message || "Error al guardar cambios")
    } finally {
      setIsSaving(false)
    }
  }

  if (loadingData) return <div className="flex justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-white"/></div>

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/item/${resolvedParams.id}`}>
            <Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90">
              <ChevronLeft className="h-5 w-5 mr-2" /> Cancelar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Editar Artículo</h1>
        </div>

        {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6 border border-red-500/50">{error}</div>}

        <Card className="bg-secondary border-secondary p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Estado del Artículo */}
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <Label className="text-primary-foreground mb-2 block">Estado de la publicación</Label>
                <Select 
                    value={formData.estado} 
                    onValueChange={(val) => setFormData({...formData, estado: val})}
                >
                    <SelectTrigger className="bg-white text-gray-900"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="disponible">🟢 Disponible (Visible)</SelectItem>
                        <SelectItem value="reservado">🟡 Reservado</SelectItem>
                        <SelectItem value="completado">🔴 Vendido / Finalizado (Oculto)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label className="text-primary-foreground">Título</Label>
                    <Input 
                        value={formData.titulo} 
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
                        className="bg-white text-gray-900" 
                    />
                </div>
                <div>
                    <Label className="text-primary-foreground">Precio</Label>
                    <Input 
                        type="number"
                        value={formData.precio} 
                        onChange={(e) => setFormData({...formData, precio: e.target.value})} 
                        className="bg-white text-gray-900" 
                        disabled={formData.tipo !== 'venta'}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label className="text-primary-foreground">Categoría</Label>
                    <Select value={formData.categoria_id} onValueChange={(val) => setFormData({...formData, categoria_id: val})}>
                        <SelectTrigger className="bg-white text-gray-900"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {categorias.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-primary-foreground">Condición</Label>
                    <Select value={formData.condicion} onValueChange={(val) => setFormData({...formData, condicion: val})}>
                        <SelectTrigger className="bg-white text-gray-900"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Nuevo">Nuevo</SelectItem>
                            <SelectItem value="Como nuevo">Como nuevo</SelectItem>
                            <SelectItem value="Usado">Usado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label className="text-primary-foreground">Descripción</Label>
                <Textarea 
                    value={formData.descripcion} 
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
                    className="bg-white text-gray-900 min-h-32" 
                />
            </div>

            <div>
                <Label className="text-primary-foreground mb-2 block">Imágenes</Label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                    {formData.imagenes.map((img, idx) => (
                        <div key={idx} className="relative aspect-square bg-gray-200 rounded overflow-hidden group">
                            <Image src={img} alt="preview" fill className="object-cover" />
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({...prev, imagenes: prev.imagenes.filter((_, i) => i !== idx)}))}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    {formData.imagenes.length < 5 && (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square border-2 border-dashed border-accent rounded flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                        >
                            <Upload className="h-6 w-6 text-accent" />
                        </div>
                    )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <Button type="submit" disabled={isSaving} className="w-full h-12 text-lg bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-2"/> Guardar Cambios</>}
            </Button>

          </form>
        </Card>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-secondary text-primary-foreground">
          <DialogHeader>
            <div className="flex justify-center mb-4"><CheckCircle className="h-12 w-12 text-green-500" /></div>
            <DialogTitle className="text-center">¡Actualizado!</DialogTitle>
            <DialogDescription className="text-center text-primary-foreground/70">
              Los cambios se han guardado correctamente.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => router.push(`/item/${resolvedParams.id}`)} className="w-full bg-accent text-accent-foreground">
            Volver al artículo
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}