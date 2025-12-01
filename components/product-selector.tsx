"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Package, CheckCircle2, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Item {
  id: number
  titulo: string
  imagenes: string[]
  estado: string
  tipo: string
}

interface ProductSelectorProps {
  userId: number | null
  selectedId: number | null
  onSelect: (id: number) => void
}

export function ProductSelector({ userId, selectedId, onSelect }: ProductSelectorProps) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchUserItems()
    }
  }, [userId])

  const fetchUserItems = async () => {
    try {
      // Usamos la API existente de mis-articulos
      const res = await fetch(`/api/items/mis-articulos?userId=${userId}`)
      const data = await res.json()
      if (data.success) {
        // Solo mostramos items disponibles para intercambiar
        const disponibles = data.data.filter((i: Item) => i.estado === 'disponible')
        setItems(disponibles)
      }
    } catch (error) {
      console.error("Error cargando items:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>
  }

  if (items.length === 0) {
    return (
      <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg bg-white/5">
        <Package className="h-12 w-12 text-white/30 mx-auto mb-3" />
        <p className="text-white/80 font-medium">No tienes artículos disponibles</p>
        <p className="text-white/50 text-sm mb-4">Publica algo para poder intercambiar.</p>
        <Link href="/publicar">
          <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
            <Plus className="h-4 w-4 mr-2" /> Publicar ahora
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-primary-foreground/70 mb-2">Selecciona qué artículo ofreces:</p>
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                relative flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                ${selectedId === item.id 
                  ? "border-orange-500 bg-orange-500/10" 
                  : "border-transparent bg-white/5 hover:bg-white/10 hover:border-white/20"}
              `}
            >
              {/* Imagen pequeña */}
              <div className="relative h-16 w-16 rounded-md overflow-hidden bg-black/20 flex-shrink-0">
                {item.imagenes?.[0] ? (
                  <Image src={item.imagenes[0]} alt={item.titulo} fill className="object-cover" />
                ) : (
                  <Package className="h-8 w-8 text-white/20 m-auto" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <p className={`font-semibold truncate ${selectedId === item.id ? "text-orange-400" : "text-white"}`}>
                  {item.titulo}
                </p>
                <Badge variant="outline" className="text-xs text-white/50 border-white/20 mt-1 capitalize">
                  {item.tipo}
                </Badge>
              </div>

              {/* Check de selección */}
              {selectedId === item.id && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2 className="h-6 w-6 text-orange-500 fill-orange-500/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}