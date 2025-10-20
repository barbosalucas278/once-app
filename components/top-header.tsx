"use client"

import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"

interface TopHeaderProps {
  title?: string
}

export function TopHeader({ title = "Ferro Web" }: TopHeaderProps) {
  const { user } = useUser()

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
              <Link
                href="/noticias"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Noticias
              </Link>
              <Link
                href="/vivo"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Programas en Vivo
              </Link>
              <Link
                href="/fechas"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Fechas y Calendario
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-bold text-balance md:hidden">{title}</h1>
        <div className="hidden md:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {user?.picture ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image src={user.picture} alt="User avatar" fill />
                </div>
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="sr-only">Perfil de usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "Mi Cuenta"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
