"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Loader2, CheckCircle, AlertCircle, Leaf, Building2, User, Truck, Eye, EyeOff } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const ciudadesValle = [
  "Cali", "Palmira", "Buenaventura", "Tuluá", "Buga", "Cartago", "Jamundí", "Yumbo",
  "Candelaria", "Florida", "Pradera", "Zarzal", "Sevilla", "Caicedonia", "Roldanillo"
]

export default function RegisterPage() {
  const router = useRouter()
  
  // IDs de roles basados en la BD (1: Persona, 2: Empresa, 3: Recolector)
  const [formData, setFormData] = useState({
    rol_id: 1, 
    name: "",
    email: "",
    tipo_documento: "CC",
    numero_documento: "",
    phone: "",
    ciudad: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Validaciones de contraseña
  const passValidations = {
      minLength: formData.password.length >= 6,
      hasUpper: /[A-Z]/.test(formData.password),
      hasLower: /[a-z]/.test(formData.password),
      hasNumber: /[0-9]/.test(formData.password)
  }
  const isPasswordValid = Object.values(passValidations).every(Boolean)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 1. Validar Contraseña Robusta
    if (!isPasswordValid) {
        setError("La contraseña no cumple con los requisitos de seguridad.")
        return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // 2. Validar Dirección Coherente (No puede ser un email)
    if (formData.direccion.includes("@") || formData.direccion.includes(".com")) {
        setError("Por favor ingresa una dirección física válida, no un correo electrónico.")
        return
    }
    if (formData.direccion.length < 5) {
        setError("La dirección es muy corta.")
        return
    }

    // 3. Otras validaciones
    if (!formData.acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }
    if (!formData.ciudad) {
      setError("Debes seleccionar tu ciudad")
      return
    }
    if (!formData.numero_documento) {
        setError("El número de documento/NIT es obligatorio")
        return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario")
      }

      setShowSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getRolName = () => {
      if(formData.rol_id === 1) return 'Persona'
      if(formData.rol_id === 2) return 'Empresa'
      return 'Recolector'
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="bg-primary rounded-lg p-8 border border-white/10 shadow-2xl">
          <Link href="/auth/login">
            <Button variant="outline" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90 h-10 px-4 flex items-center gap-2 mb-4">
              <ChevronLeft className="h-5 w-5" /> Regresar
            </Button>
          </Link>

          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 rounded-full p-4">
              <Leaf className="h-12 w-12 text-accent" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-accent mb-2 text-center">ZIRAKO</h1>
          <p className="text-accent text-sm mb-6 text-center">Únete a la economía circular</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" /> <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* SELECCIÓN DE ROL */}
            <div className="space-y-3">
                <Label className="text-accent text-sm">Tipo de Cuenta</Label>
                <div className="grid grid-cols-3 gap-2">
                    <div 
                        onClick={() => setFormData({...formData, rol_id: 1, tipo_documento: 'CC'})}
                        className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all flex flex-col items-center gap-2 ${formData.rol_id === 1 ? 'border-accent bg-accent/10' : 'border-white/20 bg-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <User className="h-6 w-6 text-white"/>
                        <span className="text-xs text-white font-bold">Persona</span>
                    </div>
                    <div 
                        onClick={() => setFormData({...formData, rol_id: 2, tipo_documento: 'NIT'})}
                        className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all flex flex-col items-center gap-2 ${formData.rol_id === 2 ? 'border-accent bg-accent/10' : 'border-white/20 bg-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <Building2 className="h-6 w-6 text-white"/>
                        <span className="text-xs text-white font-bold">Empresa</span>
                    </div>
                    <div 
                        onClick={() => setFormData({...formData, rol_id: 3, tipo_documento: 'NIT'})}
                        className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all flex flex-col items-center gap-2 ${formData.rol_id === 3 ? 'border-accent bg-accent/10' : 'border-white/20 bg-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <Truck className="h-6 w-6 text-white"/>
                        <span className="text-xs text-white font-bold">Recolector</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-accent text-sm">
                        {formData.rol_id === 1 ? 'Nombre Completo' : 'Razón Social'} *
                    </Label>
                    <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white text-gray-900 border-none h-10" required />
                </div>
                <div className="space-y-2">
                    <Label className="text-accent text-sm">
                        {formData.rol_id === 1 ? 'Cédula (CC)' : 'NIT'} *
                    </Label>
                    <Input type="text" value={formData.numero_documento} onChange={(e) => setFormData({ ...formData, numero_documento: e.target.value })} className="bg-white text-gray-900 border-none h-10" required />
                </div>
            </div>

            <div className="space-y-2">
              <Label className="text-accent text-sm">Correo electrónico *</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white text-gray-900 border-none h-10" required />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-accent text-sm">Teléfono</Label>
                    <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white text-gray-900 border-none h-10" />
                </div>
                <div className="space-y-2">
                    <Label className="text-accent text-sm">Ciudad *</Label>
                    <Select value={formData.ciudad} onValueChange={(value) => setFormData({ ...formData, ciudad: value })}>
                        <SelectTrigger className="bg-white text-gray-900 border-none h-10"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                        <SelectContent className="bg-white">{ciudadesValle.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-accent text-sm">Dirección Física</Label>
                <Input 
                    type="text" 
                    value={formData.direccion} 
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} 
                    className="bg-white text-gray-900 border-none h-10" 
                    placeholder="Calle, Carrera, Barrio..."
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-accent text-sm">Contraseña *</Label>
                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"}
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            className="bg-white text-gray-900 border-none h-10 pr-10" 
                            required 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
                            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                        </button>
                    </div>
                    {/* FEEDBACK DE CONTRASEÑA */}
                    <div className="text-[10px] space-y-1 mt-1 p-2 bg-black/20 rounded">
                        <p className={passValidations.minLength ? "text-green-400" : "text-gray-400"}>• Mínimo 6 caracteres</p>
                        <p className={passValidations.hasUpper ? "text-green-400" : "text-gray-400"}>• Al menos una mayúscula</p>
                        <p className={passValidations.hasLower ? "text-green-400" : "text-gray-400"}>• Al menos una minúscula</p>
                        <p className={passValidations.hasNumber ? "text-green-400" : "text-gray-400"}>• Al menos un número</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-accent text-sm">Confirmar *</Label>
                    <Input 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                        className="bg-white text-gray-900 border-none h-10" 
                        required 
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })} className="border-accent data-[state=checked]:bg-accent" />
              <Label htmlFor="terms" className="text-accent text-sm cursor-pointer">Acepto los términos y condiciones</Label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Crear Cuenta"}
            </Button>

            <div className="text-center">
              <span className="text-accent text-sm">¿Ya tienes cuenta? </span>
              <Link href="/auth/login" className="text-accent text-sm font-semibold hover:underline">Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-secondary text-primary-foreground">
          <DialogHeader>
            <div className="flex justify-center mb-4"><div className="bg-green-500/20 rounded-full p-4"><CheckCircle className="h-16 w-16 text-green-500" /></div></div>
            <DialogTitle className="text-center text-2xl">¡Cuenta Creada!</DialogTitle>
            <DialogDescription className="text-center text-primary-foreground/70">
              Bienvenido/a {formData.name}. Tu cuenta de tipo {getRolName()} ha sido creada.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => router.push("/auth/login")} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-4">Iniciar Sesión</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}