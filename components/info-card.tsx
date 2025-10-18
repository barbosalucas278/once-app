import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface InfoCardProps {
  icon: LucideIcon
  label: string
  value: string
}

export function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium mt-1 text-balance">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
