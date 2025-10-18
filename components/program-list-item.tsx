import { Card, CardContent } from "@/components/ui/card"
import { Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProgramListItemProps {
  title: string
  date: string
  duration: string
}

export function ProgramListItem({ title, date, duration }: ProgramListItemProps) {
  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline" className="shrink-0 bg-transparent">
            <Play className="h-4 w-4 fill-current" />
          </Button>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium leading-tight text-balance truncate">{title}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span>{date}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
