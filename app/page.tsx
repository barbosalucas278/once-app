"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        router.push("/login")
      }, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
          <Image src="/icon-512.jpg" alt="Logo Ferro Web" fill className="object-cover" priority />
        </div>
        <h1 className="text-2xl font-bold text-balance">Ferro Web</h1>
      </div>
    </div>
  )
}
