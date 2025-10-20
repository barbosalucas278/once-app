"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay, getDate, getMonth, getYear, isToday as isTodayFn, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface Event {
  time: string;
  title: string;
  location: string;
}

interface CalendarViewProps {
  events: Record<string, Event[]>;
}

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date("2025-10-18"));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date("2025-10-18"));

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const upcomingEvents = Object.entries(events)
    .flatMap(([date, eventList]) =>
      eventList.map(event => ({ ...event, date: parseISO(date) }))
    )
    .filter(event => event.date >= new Date("2025-10-18"))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg capitalize">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = events[dateKey] || [];
            const isCurrentMonth = getMonth(day) === getMonth(currentDate);
            const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative aspect-square p-1 text-sm rounded-md transition-colors
                  ${isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"}
                  ${isTodayFn(day) ? "bg-primary text-primary-foreground font-bold" : ""}
                  ${isSelected ? "bg-accent ring-2 ring-primary" : "hover:bg-accent"}
                `}
              >
                <span>{getDate(day)}</span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-destructive" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Próximos eventos
          </h3>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{format(event.date, "dd")}</div>
                    <div className="text-xs text-muted-foreground uppercase">{format(event.date, "MMM", { locale: es })}</div>
                  </div>
                  <div>
                    <p className="font-medium text-balance">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <Badge variant="secondary">{event.time}</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No hay próximos eventos.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
