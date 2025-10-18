import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { NewsCard } from "@/components/news-card"
import { DesktopSidebar } from "@/components/desktop-sidebar"

const newsData = [
  {
    id: 1,
    title: "Victoria contundente en el clásico",
    subtitle: "El equipo logró una victoria histórica ante su rival de toda la vida con un marcador de 3-0",
    image: "/soccer-match-celebration.png",
    category: "Fútbol",
    date: "Hace 2 horas",
  },
  {
    id: 2,
    title: "Nuevo refuerzo confirmado",
    subtitle: "La dirigencia anunció la incorporación de un mediocampista de renombre internacional",
    image: "/soccer-player-signing-contract.jpg",
    category: "Transferencias",
    date: "Hace 5 horas",
  },
  {
    id: 3,
    title: "Entrenamiento abierto este fin de semana",
    subtitle: "Los socios podrán asistir a la práctica del sábado en el estadio principal",
    image: "/soccer-training.png",
    category: "Institucional",
    date: "Hace 1 día",
  },
  {
    id: 4,
    title: "Resultados de las inferiores",
    subtitle: "Excelente desempeño de las divisiones juveniles en el torneo regional",
    image: "/youth-soccer-team.jpg",
    category: "Inferiores",
    date: "Hace 2 días",
  },
]

export default function NoticiasPage() {
  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {newsData.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  )
}
