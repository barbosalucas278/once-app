"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Newspaper, Radio, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function DesktopSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/noticias", label: "Noticias", icon: Newspaper },
    { href: "/vivo", label: "En Vivo", icon: Radio },
    { href: "/fichas", label: "Fichas", icon: Calendar },
  ]

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 border-r border-border bg-card">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo Section */}
        <div className="flex items-center gap-3 h-16 px-6 border-b border-border">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image src="/icon-192.jpg" alt="Ferro Web" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold">Ferro Web</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center text-balance">
            © 2025 Ferro Web. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </aside>
  )
}
