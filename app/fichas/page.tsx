import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { CalendarView } from "@/components/calendar-view"
import { InfoCard } from "@/components/info-card"
import { MapPin, Phone, Mail, Globe, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DesktopSidebar } from "@/components/desktop-sidebar"

const clubInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Av. Avellaneda 1240, Buenos Aires",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+54 11 4567-8900",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@ferroweb.com.ar",
  },
  {
    icon: Globe,
    label: "Sitio Web",
    value: "www.ferroweb.com.ar",
  },
]

export default function FichasPage() {
  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6 space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Calendar Section - Takes 2 columns on desktop */}
            <section className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Calendario</h2>
                <Button variant="outline" size="sm">
                  Ver todo
                </Button>
              </div>
              <CalendarView />
            </section>

            {/* Club Information Section - Takes 1 column on desktop */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Información útil</h2>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar información</span>
                </Button>
              </div>
              <div className="space-y-4">
                {clubInfo.map((info, index) => (
                  <InfoCard key={index} {...info} />
                ))}
              </div>
            </section>
          </div>

          {/* Additional Info Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Sobre la ficha</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-balance">
                Accede a toda la información relevante del club, incluyendo el calendario de eventos, partidos,
                entrenamientos y actividades especiales. Mantente actualizado con los horarios y ubicaciones de todos
                los eventos importantes.
              </p>
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </>
  )
}
