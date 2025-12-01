import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { query } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategoryIcon } from "@/components/category-icon"
import {
  ChevronLeft,
  MapPin,
  Clock,
  User,
  Heart,
  Share2,
  Package,
  Tag,
  ShoppingCart,
  Repeat,
  Gift,
  AlertTriangle,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import ItemActionsButtons from "@/components/item-action-buttons" 

// Función para obtener los detalles reales del artículo y VENDEDOR desde la BD
async function getItemDetails(id: string) {
  try {
    const sql = `
      SELECT 
        i.*,
        u.nombre AS nombre_vendedor,
        u.email AS email_vendedor,
        u.foto_perfil AS foto_vendedor,
        u.nivel AS nivel_vendedor,
        c.nombre AS nombre_categoria,
        c.id AS categoria_id
      FROM items i
      JOIN usuarios u ON i.usuario_id = u.id
      LEFT JOIN categorias c ON i.categoria_id = c.id
      WHERE i.id = ?
    `
    const result = await query<any>(sql, [id])
    
    if (result.rows.length === 0) return null

    const item = result.rows[0]
    
    // Aumentar contador de visitas
    await query("UPDATE items SET vistas = vistas + 1 WHERE id = ?", [id])

    return {
      ...item,
      imagenes: typeof item.imagenes === "string" ? JSON.parse(item.imagenes) : item.imagenes || [],
      precio: Number(item.precio) || 0,
      vistas: (item.vistas || 0) + 1
    }
  } catch (error) {
    console.error("Error fetching item details:", error)
    return null
  }
}

async function getCurrentUserId() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  if (token) {
    const payload = verifyToken(token)
    if (payload) return payload.userId
  }
  return null
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function getTypeLabel(type: string): { label: string; color: string; icon: React.ReactNode } {
  switch (type) {
    case "venta":
      return { label: "Venta", color: "bg-emerald-600 text-white", icon: <ShoppingCart className="h-4 w-4"/> }
    case "donacion":
      return { label: "Donación", color: "bg-purple-600 text-white", icon: <Gift className="h-4 w-4"/> }
    case "intercambio":
      return { label: "Intercambio", color: "bg-orange-500 text-white", icon: <Repeat className="h-4 w-4"/> }
    default:
      return { label: "Disponible", color: "bg-gray-500 text-white", icon: <Tag className="h-4 w-4"/> }
  }
}

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  const itemData = await getItemDetails(id)
  const currentUserId = await getCurrentUserId()

  if (!itemData) {
    notFound()
  }

  const isOwner = currentUserId === itemData.usuario_id
  const typeInfo = getTypeLabel(itemData.tipo)
  const mainImage = itemData.imagenes.length > 0 ? itemData.imagenes[0] : "/placeholder.svg"

  const diasPublicado = Math.floor((new Date().getTime() - new Date(itemData.created_at).getTime()) / (1000 * 60 * 60 * 24))
  const tiempoTexto = diasPublicado === 0 ? "Hoy" : `Hace ${diasPublicado} días`

  return (
    <div className="min-h-screen bg-primary pb-20">
      {/* Header Nav */}
      <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                Volver
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda: Imágenes */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-secondary border-secondary aspect-square relative">
              <Image
                src={mainImage}
                alt={itemData.titulo}
                fill
                className="object-cover"
                priority
              />
              <Badge className={`absolute top-4 left-4 flex items-center gap-1 ${typeInfo.color}`}>
                {typeInfo.icon} {typeInfo.label}
              </Badge>
               {itemData.estado !== 'disponible' && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4"/> {itemData.estado.toUpperCase()}
                  </Badge>
               )}
            </Card>
            {/* Galería */}
            {itemData.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {itemData.imagenes.map((img: string, index: number) => (
                  <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-accent">
                    <Image src={img} alt={`Vista ${index}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna Derecha: Detalles */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-2xl lg:text-4xl font-bold text-primary-foreground">{itemData.titulo}</h1>
                <Badge variant="outline" className="text-accent border-accent">{itemData.condicion}</Badge>
              </div>

              {itemData.tipo === "venta" && itemData.precio > 0 ? (
                <p className="text-4xl font-bold text-accent">{formatPrice(itemData.precio)}</p>
              ) : itemData.tipo === "donacion" ? (
                <p className="text-3xl font-bold text-purple-400 flex items-center gap-2"><Gift/> Gratis (Donación)</p>
              ) : (
                <p className="text-3xl font-bold text-orange-400 flex items-center gap-2"><Repeat/> Para Intercambio</p>
              )}
            </div>

            {/* Metadatos */}
            <div className="flex flex-wrap gap-4 text-primary-foreground/70 text-sm border-y border-white/10 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{itemData.ciudad}, Valle del Cauca</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>Publicado: {tiempoTexto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-accent" />
                <span>{itemData.vistas} visitas</span>
              </div>
            </div>

            <Card className="bg-secondary border-secondary p-5">
              <h2 className="text-lg font-semibold mb-3 text-primary-foreground">Descripción</h2>
              <p className="text-primary-foreground/80 leading-relaxed whitespace-pre-line">{itemData.descripcion}</p>
            </Card>

            {/* Categoría*/}
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className="bg-accent rounded-lg p-2">
                <CategoryIcon category={itemData.categoria_id} className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-primary-foreground/60">Categoría</span>
                <span className="text-primary-foreground font-semibold capitalize">{itemData.nombre_categoria || 'General'}</span>
              </div>
            </div>

            {/* Información del Vendedor */}
            <Card className="bg-secondary border-secondary p-5">
              <h2 className="text-lg font-semibold mb-4 text-primary-foreground">Publicado por</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                    {itemData.foto_vendedor ? (
                        <Image src={itemData.foto_vendedor} alt={itemData.nombre_vendedor} width={64} height={64} className="rounded-full object-cover" />
                    ) : (
                        <div className="bg-primary rounded-full p-4"><User className="h-8 w-8 text-accent" /></div>
                    )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-primary-foreground">{itemData.nombre_vendedor}</p>
                  <p className="text-sm text-primary-foreground/60">Miembro de la comunidad ZIRAKO</p>
                </div>
              </div>
            </Card>

            {/* BOTONES DE ACCIÓN */}
            <ItemActionsButtons 
                item={itemData} 
                isOwner={isOwner} 
                currentUserId={currentUserId}
            />

          </div>
        </div>
      </div>
    </div>
  )
}