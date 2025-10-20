"use client"

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { TopHeader } from "@/components/top-header"
import { BottomNav } from "@/components/bottom-nav"
import { NewsCard } from "@/components/news-card"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { useEffect, useState } from 'react';

function NoticiasPage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <DesktopSidebar />

      <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
        <TopHeader title="Ferro Web" />

        <main className="container max-w-6xl mx-auto px-4 py-6">
          {loading ? (
            <p>Cargando noticias...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {newsData.map((news: any) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </>
  )
}

export default withPageAuthRequired(NoticiasPage);
