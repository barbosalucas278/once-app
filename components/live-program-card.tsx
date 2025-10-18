import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LiveProgramCardProps {
  title: string
  host: string
  isLive: boolean
  viewers?: number
  startTime?: string
  thumbnail: string
}

export function LiveProgramCard({ title, host, isLive, viewers, startTime, thumbnail }: LiveProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative h-40 w-full">
        <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>
        {isLive && (
          <Badge variant="destructive" className="absolute top-2 right-2 animate-pulse">
            EN VIVO
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg leading-tight text-balance">{title}</h3>
        <p className="text-sm text-muted-foreground">{host}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {isLive && viewers && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{viewers.toLocaleString()} viendo</span>
            </div>
          )}
          {!isLive && startTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Comienza a las {startTime}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
