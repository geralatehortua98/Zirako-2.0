import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategoryIcon } from "@/components/category-icon"
import { ChevronLeft, MapPin, PackageOpen } from "lucide-react"
import Link from "next/link"
import { query } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

// 1. MAPEO CRÍTICO: Convierte el slug de la URL (texto) al ID de la BD (número)
const CATEGORY_MAP: Record<string, number> = {
  "electronica": 1,
  "muebles": 2,
  "ropa": 3,
  "hogar": 4,
  "deportes": 5,
  "libros": 6,
  "juguetes": 7,
  "herramientas": 8,
  "vehiculos": 9,
  "electrodomesticos": 10,
  "otros": 11
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

async function getCategoryItems(categorySlug: string, currentUserId: number | null) {
  try {
    let sql = `
      SELECT id, titulo, descripcion, condicion, ciudad, precio, tipo, imagenes, created_at 
      FROM items 
      WHERE estado = 'disponible'
    `
    const params: any[] = []

    // 2. Usamos el mapa para obtener el ID correcto
    const categoryId = CATEGORY_MAP[categorySlug] || null

    if (categorySlug !== 'todas') {
        if (categoryId) {
            sql += " AND categoria_id = ?"
            params.push(categoryId)
        } else {
             // Si el slug no está en el mapa (ej. 'todas' o error), no filtramos por ID o devolvemos vacio
        }
    }

    // 3. Excluimos los artículos del propio usuario (para que vea lo de OTROS)
    if (currentUserId) {
        sql += " AND usuario_id != ?"
        params.push(currentUserId)
    }
    
    sql += " ORDER BY created_at DESC LIMIT 50"
    const result = await query<any>(sql, params)
    
    return result.rows.map((item: any) => ({
      ...item,
      imagenes: typeof item.imagenes === 'string' ? JSON.parse(item.imagenes) : item.imagenes
    }))
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(price)
}

function getTypeLabel(type: string) {
  switch (type) {
    case "venta": return { label: "Venta", color: "bg-emerald-600 text-white" }
    case "donacion": return { label: "Donación", color: "bg-purple-600 text-white" }
    case "intercambio": return { label: "Intercambio", color: "bg-orange-500 text-white" }
    default: return { label: "Disponible", color: "bg-gray-500 text-white" }
  }
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params // 'id' aquí es el slug (ej: 'electronica')
  const currentUserId = await getCurrentUserId()
  
  // Pasamos el slug a la función, ella se encarga de convertirlo a ID
  const items = await getCategoryItems(id, currentUserId)
  
  const categoryName = id.charAt(0).toUpperCase() + id.slice(1)
  const categoryIdNum = CATEGORY_MAP[id] || "1" // Para el icono

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/categorias">
            <Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" /> Regresar
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-lg p-2">
              <CategoryIcon category={categoryIdNum} className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground capitalize">
              {id === 'todas' ? 'Todos los Artículos' : categoryName}
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
           <div className="text-center py-20 bg-secondary/20 rounded-xl border border-white/10">
              <PackageOpen className="h-20 w-20 text-white/20 mx-auto mb-4"/>
              <h3 className="text-xl font-bold text-white">No hay artículos disponibles</h3>
              <p className="text-white/60 mb-6">
                {currentUserId 
                    ? "No hay artículos de otros usuarios en esta categoría." 
                    : "Inicia sesión para ver artículos."}
              </p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item: any) => {
              const typeInfo = getTypeLabel(item.tipo)
              const imagen = item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : "/placeholder.svg"

              return (
                <Link key={item.id} href={`/item/${item.id}`}>
                  <Card className="bg-secondary border-secondary hover:bg-secondary/90 transition-all hover:-translate-y-1 overflow-hidden h-full flex flex-col cursor-pointer">
                    <div className="aspect-square relative bg-white/5 overflow-hidden">
                      <img src={imagen} alt={item.titulo} className="w-full h-full object-cover" />
                      <Badge className={`absolute top-2 left-2 text-xs ${typeInfo.color}`}>{typeInfo.label}</Badge>
                    </div>
                    <div className="p-3 space-y-2 flex-1 flex flex-col">
                      <h3 className="font-semibold text-sm text-primary-foreground line-clamp-2">{item.titulo}</h3>
                      <div className="flex items-center gap-1 text-xs text-primary-foreground/60">
                        <MapPin className="h-3 w-3" /> <span className="truncate">{item.ciudad}</span>
                      </div>
                      <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/10">
                        <span className="text-xs text-primary-foreground/60">{item.condicion}</span>
                        <span className="font-bold text-accent text-sm">
                          {item.precio > 0 ? formatPrice(item.precio) : item.tipo === "donacion" ? "Gratis" : "Cambio"}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}