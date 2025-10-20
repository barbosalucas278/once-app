"use client"

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { CalendarView } from "@/components/calendar-view"
import { InfoCard } from "@/components/info-card"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { useEffect, useState } from 'react';

function FechasPage() {
  const [calendarData, setCalendarData] = useState({ events: {}, info: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await fetch('/api/calendar');
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6 space-y-8">
          {loading ? (
            <p>Cargando calendario...</p>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Calendar Section - Takes 2 columns on desktop */}
                <section className="space-y-4 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Calendario</h2>
                    <Button variant="outline" size="sm">
                      Ver todo
                    </Button>
                  </div>
                  <CalendarView events={calendarData.events} />
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
                    {calendarData.info.map((info: any, index: number) => (
                      <InfoCard key={index} {...info} />
                    ))}
                  </div>
                </section>
              </div>

              {/* Additional Info Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Sobre la fecha</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-balance">
                    Accede a toda la información relevante del club, incluyendo el calendario de eventos, partidos,
                    entrenamientos y actividades especiales. Mantente actualizado con los horarios y ubicaciones de todos
                    los eventos importantes.
                  </p>
                </div>
              </section>
            </>
          )}
        </main>

        <BottomNav />
      </div>
    </>
  )
}

export default withPageAuthRequired(FechasPage);
