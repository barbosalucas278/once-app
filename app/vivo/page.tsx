import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { LiveProgramCard } from "@/components/live-program-card"
import { ProgramListItem } from "@/components/program-list-item"
import { Badge } from "@/components/ui/badge"
import { DesktopSidebar } from "@/components/desktop-sidebar"

const livePrograms = [
  {
    id: 1,
    title: "Análisis Post Partido",
    host: "Juan Martínez",
    isLive: true,
    viewers: 1234,
    thumbnail: "/live-sports-analysis.jpg",
  },
  {
    id: 2,
    title: "Ferro en la Tarde",
    host: "María González",
    isLive: false,
    startTime: "18:00",
    thumbnail: "/radio-studio.png",
  },
]

const previousPrograms = [
  {
    id: 1,
    title: "Resumen Semanal - Episodio 45",
    date: "15 Oct 2025",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Entrevista con el DT",
    date: "14 Oct 2025",
    duration: "30 min",
  },
  {
    id: 3,
    title: "Historia del Club - Capítulo 12",
    date: "13 Oct 2025",
    duration: "25 min",
  },
  {
    id: 4,
    title: "Análisis Táctico: Último Partido",
    date: "12 Oct 2025",
    duration: "40 min",
  },
  {
    id: 5,
    title: "Ferro en la Mañana",
    date: "11 Oct 2025",
    duration: "60 min",
  },
]

export default function VivoPage() {
  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6 space-y-8">
          {/* Latest Programs Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Últimos programas</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {livePrograms.map((program) => (
                <LiveProgramCard key={program.id} {...program} />
              ))}
            </div>
          </section>

          {/* Live Programs Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Programas en vivo</h2>
              <Badge variant="destructive" className="animate-pulse">
                EN VIVO
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {livePrograms
                .filter((p) => p.isLive)
                .map((program) => (
                  <LiveProgramCard key={program.id} {...program} />
                ))}
            </div>
          </section>

          {/* Previous Programs Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Programas anteriores</h2>
            <div className="grid gap-2 md:grid-cols-2">
              {previousPrograms.map((program) => (
                <ProgramListItem key={program.id} {...program} />
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </>
  )
}
