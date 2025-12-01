import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { CategoryIcon } from "@/components/category-icon"

const publicationCategories = [
  { id: "electronica", title: "Electrónica", icon: "1", desc: "Celulares, PC, TV" },
  { id: "muebles", title: "Muebles", icon: "2", desc: "Sillas, Mesas, Sofás" },
  { id: "ropa", title: "Ropa", icon: "3", desc: "Moda y Accesorios" },
  { id: "hogar", title: "Hogar", icon: "4", desc: "Cocina y Decoración" },
  { id: "libros", title: "Libros", icon: "6", desc: "Educación y Ocio" },
  { id: "herramientas", title: "Herramientas", icon: "8", desc: "Equipo técnico" },
]

export default function PublicarPage() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center justify-start mb-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 h-10 px-4 flex items-center gap-2 font-medium backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
              Regresar
            </Button>
          </Link>
        </div>

        {/* Título Centrado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">¿Qué deseas publicar?</h1>
          <p className="text-white/60">Selecciona la categoría correcta</p>
        </div>

        {/* GRID ESTILO "GLASS" (Armónico) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {publicationCategories.map((category) => (
              <Link key={category.id} href={`/publicar/${category.id}`} className="block h-full">
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center rounded-3xl shadow-lg backdrop-blur-sm group">
                  
                  {/* Icono */}
                  <div className="bg-white/10 p-4 rounded-full mb-3 group-hover:bg-white/20 transition-colors shadow-inner">
                    <CategoryIcon category={category.icon} className="h-9 w-9 text-white/90" />
                  </div>
                  
                  {/* Textos */}
                  <div>
                      <h3 className="text-lg font-bold text-white block mb-1">{category.title}</h3>
                      <p className="text-xs text-white/60 font-medium">{category.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>

      </div>
    </div>
  )
}