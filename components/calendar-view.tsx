"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const events = [
  { date: 20, title: "Partido vs. Rival", type: "match" },
  { date: 23, title: "Entrenamiento", type: "training" },
  { date: 27, title: "Asamblea", type: "meeting" },
]

export function CalendarView() {
  const [currentMonth] = useState("Octubre 2025")

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const startDay = 2 // Wednesday (0 = Sunday)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{currentMonth}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {daysInMonth.map((day) => {
            const event = events.find((e) => e.date === day)
            const isToday = day === 18

            return (
              <button
                key={day}
                className={`
                  relative aspect-square p-2 text-sm rounded-md transition-colors
                  ${isToday ? "bg-primary text-primary-foreground font-bold" : "hover:bg-accent"}
                  ${event ? "font-semibold" : ""}
                `}
              >
                <span>{day}</span>
                {event && (
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      event.type === "match"
                        ? "bg-destructive"
                        : event.type === "training"
                          ? "bg-chart-2"
                          : "bg-chart-4"
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Upcoming Events */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Próximos eventos
          </h3>
          {events.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-xs text-muted-foreground">Oct</div>
                </div>
                <div>
                  <p className="font-medium text-balance">{event.title}</p>
                </div>
              </div>
              <Badge
                variant={event.type === "match" ? "destructive" : event.type === "training" ? "secondary" : "outline"}
              >
                {event.type === "match" ? "Partido" : event.type === "training" ? "Entrenamiento" : "Reunión"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
