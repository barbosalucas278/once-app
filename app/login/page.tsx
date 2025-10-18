"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate Google login
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/noticias")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
            <Image src="/icon-512.jpg" alt="Logo Ferro Web" fill className="object-cover" priority />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-balance">Bienvenido a Ferro Web</h1>
            <p className="text-muted-foreground text-balance">Accede a noticias, programas en vivo y mucho más</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
          </Button>

          <p className="text-xs text-center text-muted-foreground text-balance">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>
      </div>
    </div>
  )
}
