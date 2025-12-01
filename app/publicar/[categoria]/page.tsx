"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, Upload, X, CheckCircle, Loader2, DollarSign, Gift, RefreshCw, MapPin, Tag, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { useState, useRef, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// --- CONFIGURACIÓN DE CLOUDINARY ---
const CLOUD_NAME = "dloy2lqrg" 
const UPLOAD_PRESET = "zirako_uploads" 

const categorias = [
  { id: "1", slug: "electronica", nombre: "Electrónica" },
  { id: "2", slug: "muebles", nombre: "Muebles" },
  { id: "3", slug: "ropa", nombre: "Ropa" },
  { id: "4", slug: "hogar", nombre: "Hogar" },
  { id: "6", slug: "libros", nombre: "Libros" },
  { id: "8", slug: "herramientas", nombre: "Herramientas" },
]

const ciudadesValle = ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí", "Yumbo"]

export default function PublicarCategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Estados
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const catInicial = categorias.find(c => c.slug === resolvedParams.categoria)?.id || "1"
  const [categoriaId, setCategoriaId] = useState(catInicial)
  const [condicion, setCondicion] = useState("Usado")
  const [tipo, setTipo] = useState<"venta" | "donacion" | "intercambio">("venta")
  const [precio, setPrecio] = useState("")
  const [ciudad, setCiudad] = useState("Cali")
  const [imagenes, setImagenes] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem("zirako_user_id")
    if (storedUserId) setUserId(Number.parseInt(storedUserId))
  }, [])

  const limpiarFormulario = () => {
      setTitulo("")
      setDescripcion("")
      setPrecio("")
      setImagenes([])
      setCondicion("Usado")
      setShowSuccess(false)
  }

  // --- FUNCIÓN PARA SUBIR A CLOUDINARY ---
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Error subiendo imagen")
      
      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error("Error Cloudinary:", error)
      return null
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (imagenes.length + files.length > 5) {
        setError("Máximo 5 imágenes permitidas")
        return
    }

    setIsUploading(true)
    setError("")

    const newUrls: string[] = []
    
    for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const url = await uploadToCloudinary(file)
        if (url) newUrls.push(url)
    }

    setImagenes((prev) => [...prev, ...newUrls])
    setIsUploading(false)
    e.target.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!titulo.trim()) throw new Error("El título es requerido")
      if (!descripcion.trim()) throw new Error("La descripción es requerida")
      if (tipo === "venta" && !precio) throw new Error("El precio es requerido")
      if (imagenes.length === 0) throw new Error("Debes agregar al menos una imagen")

      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          categoria_id: Number(categoriaId),
          tipo,
          condicion,
          precio: tipo === "venta" ? Number.parseFloat(precio.replace(/[^0-9]/g, "")) : 0,
          ciudad,
          imagenes,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Error al publicar")
      setShowSuccess(true)
    } catch (err: any) { setError(err.message) } 
    finally { setIsLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/publicar">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 h-10 px-4 flex items-center gap-2 backdrop-blur-sm">
                <ChevronLeft className="h-5 w-5" /> Regresar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Crear Publicación</h1>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl mb-6 backdrop-blur-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECCIÓN 1: ¿QUÉ ES? - ESTILO VERDE ORIGINAL */}
            <Card className="bg-secondary/95 border-none p-6 shadow-xl rounded-2xl">
                <h2 className="text-xl font-bold text-primary-foreground mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5 text-accent"/> Información Básica
                </h2>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-primary-foreground/80">Título del Artículo *</Label>
                        <Input 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                            placeholder="Ej: Bicicleta de montaña rin 29"
                            className="bg-white text-gray-900 border-gray-200 h-12 text-lg focus-visible:ring-accent" 
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-primary-foreground/80">Categoría</Label>
                            <Select value={categoriaId} onValueChange={setCategoriaId}>
                                <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-11"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                {categorias.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-primary-foreground/80">Condición</Label>
                            <Select value={condicion} onValueChange={setCondicion}>
                                <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-11"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Nuevo">Nuevo</SelectItem>
                                    <SelectItem value="Como nuevo">Como nuevo</SelectItem>
                                    <SelectItem value="Usado">Usado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* SECCIÓN 2: TIPO DE PUBLICACIÓN - ESTILO VERDE ORIGINAL */}
            <Card className="bg-secondary/95 border-none p-6 shadow-xl rounded-2xl">
                <h2 className="text-xl font-bold text-primary-foreground mb-4 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-accent"/> Tipo de Publicación
                </h2>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div 
                        onClick={() => setTipo("venta")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] ${tipo === "venta" ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 bg-white/5 opacity-60 hover:opacity-100"}`}
                    >
                        <div className={`p-2 rounded-full ${tipo === "venta" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <DollarSign className="h-6 w-6"/>
                        </div>
                        <span className={`font-bold ${tipo === "venta" ? "text-emerald-500" : "text-primary-foreground/60"}`}>Venta</span>
                    </div>

                    <div 
                        onClick={() => setTipo("donacion")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] ${tipo === "donacion" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5 opacity-60 hover:opacity-100"}`}
                    >
                        <div className={`p-2 rounded-full ${tipo === "donacion" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <Gift className="h-6 w-6"/>
                        </div>
                        <span className={`font-bold ${tipo === "donacion" ? "text-purple-500" : "text-primary-foreground/60"}`}>Donación</span>
                    </div>

                    <div 
                        onClick={() => setTipo("intercambio")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] ${tipo === "intercambio" ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5 opacity-60 hover:opacity-100"}`}
                    >
                        <div className={`p-2 rounded-full ${tipo === "intercambio" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <RefreshCw className="h-6 w-6"/>
                        </div>
                        <span className={`font-bold ${tipo === "intercambio" ? "text-orange-500" : "text-primary-foreground/60"}`}>Cambio</span>
                    </div>
                </div>

                {/* PRECIO CONDICIONAL */}
                {tipo === "venta" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-primary-foreground/80">Precio (COP) *</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>
                            <Input 
                                type="number" 
                                value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} 
                                className="pl-10 bg-white text-gray-900 h-12 text-lg font-bold border-emerald-500/50 focus-visible:ring-emerald-500" 
                                placeholder="0"
                            />
                        </div>
                    </div>
                )}
            </Card>

            {/* SECCIÓN 3: DETALLES Y FOTOS - ESTILO VERDE ORIGINAL */}
            <Card className="bg-secondary/95 border-none p-6 shadow-xl rounded-2xl">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-primary-foreground/80 flex items-center gap-2"><MapPin className="h-4 w-4"/> Ubicación</Label>
                        <Select value={ciudad} onValueChange={setCiudad}>
                            <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-11"><SelectValue /></SelectTrigger>
                            <SelectContent>
                            {ciudadesValle.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-primary-foreground/80">Descripción Detallada *</Label>
                        <Textarea 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            className="bg-white border-gray-200 text-gray-900 min-h-[120px] resize-none" 
                            placeholder="Describe tu artículo, detalles importantes, tiempo de uso, etc."
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-primary-foreground/80 flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Fotos ({imagenes.length}/5)</Label>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {imagenes.map((img, i) => (
                                <div key={i} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-white/20 shadow-sm group">
                                    <Image src={img} alt="preview" fill className="object-cover transition-transform group-hover:scale-110"/>
                                    <button type="button" onClick={() => setImagenes(p => p.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 transition-colors"><X className="h-3 w-3"/></button>
                                </div>
                            ))}
                            {imagenes.length < 5 && (
                                <div 
                                    onClick={() => !isUploading && fileInputRef.current?.click()} 
                                    className={`aspect-square border-2 border-dashed border-accent/50 hover:border-accent hover:bg-accent/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-8 w-8 text-accent animate-spin"/>
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-accent/50 group-hover:text-accent mb-1"/>
                                            <span className="text-xs text-accent/70 font-medium">Subir</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} disabled={isUploading} />
                    </div>
                </div>
            </Card>

            {/* BOTÓN FINAL */}
            <Button type="submit" disabled={isLoading || isUploading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-bold shadow-lg rounded-xl transition-all hover:scale-[1.01] active:scale-95">
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Publicar Ahora"}
            </Button>

        </form>
      </div>

      {/* DIÁLOGO DE ÉXITO */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-white/10 text-primary-foreground rounded-2xl">
            <div className="flex justify-center mb-4"><div className="bg-green-500/20 p-4 rounded-full"><CheckCircle className="h-12 w-12 text-green-500" /></div></div>
            <DialogTitle className="text-center text-2xl font-bold">¡Publicado con Éxito!</DialogTitle>
            <DialogDescription className="text-center text-primary-foreground/70 text-base">
                Tu artículo ya está visible en el mercado para toda la comunidad.
            </DialogDescription>
            <div className="flex flex-col gap-3 mt-6">
                <Button onClick={() => router.push("/perfil/mis-articulos")} className="bg-accent text-accent-foreground h-12 font-bold rounded-xl">Ir a Mis Artículos</Button>
                <Button onClick={limpiarFormulario} variant="ghost" className="text-white hover:bg-white/10">Publicar otro artículo</Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}