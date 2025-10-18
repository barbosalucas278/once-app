import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface NewsCardProps {
  title: string
  subtitle: string
  image: string
  category: string
  date: string
}

export function NewsCard({ title, subtitle, image, category, date }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        <h2 className="text-xl font-bold leading-tight text-balance">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-balance leading-relaxed">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
