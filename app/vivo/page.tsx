"use client"

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { LiveProgramCard } from "@/components/live-program-card"
import { ProgramListItem } from "@/components/program-list-item"
import { Badge } from "@/components/ui/badge"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { useEffect, useState } from 'react';

function VivoPage() {
  const [livePrograms, setLivePrograms] = useState([]);
  const [previousPrograms, setPreviousPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setLivePrograms(data.live);
        setPreviousPrograms(data.previous);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6 space-y-8">
          {loading ? (
            <p>Cargando videos...</p>
          ) : (
            <>
              {/* Latest Programs Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Últimos programas</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {livePrograms.map((program: any) => (
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
                    .filter((p: any) => p.isLive)
                    .map((program: any) => (
                      <LiveProgramCard key={program.id} {...program} />
                    ))}
                </div>
              </section>

              {/* Previous Programs Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Programas anteriores</h2>
                <div className="grid gap-2 md:grid-cols-2">
                  {previousPrograms.map((program: any) => (
                    <ProgramListItem key={program.id} {...program} />
                  ))}
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

export default withPageAuthRequired(VivoPage);
