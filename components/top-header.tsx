"use client"

import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

interface TopHeaderProps {
  title?: string
}

export function TopHeader({ title = "Ferro Web" }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-between h-14 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/noticias" className="text-lg font-medium hover:text-primary transition-colors">
                Noticias
              </Link>
              <Link href="/vivo" className="text-lg font-medium hover:text-primary transition-colors">
                Programas en Vivo
              </Link>
              <Link href="/fichas" className="text-lg font-medium hover:text-primary transition-colors">
                Fichas y Calendario
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-bold text-balance md:hidden">{title}</h1>
        <div className="hidden md:block" />

        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Perfil de usuario</span>
        </Button>
      </div>
    </header>
  )
}
