import { 
  Smartphone, 
  Monitor, 
  Cable, 
  Armchair, 
  BookOpen, 
  Laptop, 
  Drill, 
  Briefcase, 
  Shirt, 
  Home, 
  Dumbbell, 
  Gamepad2, 
  Car, 
  Tv, 
  Package, 
  type LucideIcon 
} from "lucide-react"

// Diccionario que mapea IDs numéricos y Slugs a Iconos
const categoryIcons: Record<string, LucideIcon> = {
  // Mapeo por ID (Lo que llega de la BD)
  "1": Smartphone,       // Electrónica
  "2": Armchair,         // Muebles
  "3": Shirt,            // Ropa
  "4": Home,             // Hogar
  "5": Dumbbell,         // Deportes
  "6": BookOpen,         // Libros
  "7": Gamepad2,         // Juguetes
  "8": Drill,            // Herramientas
  "9": Car,              // Vehículos
  "10": Tv,              // Electrodomésticos
  "11": Package,         // Otros

  // Mapeo por Slug 
  electronica: Smartphone,
  muebles: Armchair,
  ropa: Shirt,
  hogar: Home,
  deportes: Dumbbell,
  libros: BookOpen,
  juguetes: Gamepad2,
  herramientas: Drill,
  vehiculos: Car,
  electrodomesticos: Tv,
  otros: Package,
  oficina: Briefcase,
  tecnologia: Laptop,
  computadores: Laptop,
  telefonos: Smartphone,
}

interface CategoryIconProps {
  category: string | number
  className?: string
}

export function CategoryIcon({ category, className = "" }: CategoryIconProps) {
  const key = String(category).toLowerCase()
  

  const Icon = categoryIcons[key] || Package 
  
  return <Icon className={className} />
}