// src/app/(with-sidebar)/moderacion/reportes/components/ModeracionStats.tsx
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ReportesStats } from "@/components/reportes/types"

export default function ModeracionStats({ stats }: { stats: ReportesStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card className="bg-[#418fb6]/10">
        <CardContent className="p-4 flex items-center">
          <div className="bg-[#418fb6] rounded-full p-3 mr-4">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#434546]">Pendientes</p>
            <p className="text-2xl font-bold text-[#282f33]">{stats.pendientes}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#2ba4e0]/10">
        <CardContent className="p-4 flex items-center">
          <div className="bg-[#2ba4e0] rounded-full p-3 mr-4">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#434546]">En revisión</p>
            <p className="text-2xl font-bold text-[#282f33]">{stats.revision}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-green-100">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-600 rounded-full p-3 mr-4">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-800">Aprobados</p>
            <p className="text-2xl font-bold text-green-900">{stats.aprobados}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-red-100">
        <CardContent className="p-4 flex items-center">
          <div className="bg-red-600 rounded-full p-3 mr-4">
            <X className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-red-800">Rechazados</p>
            <p className="text-2xl font-bold text-red-900">{stats.rechazados}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}