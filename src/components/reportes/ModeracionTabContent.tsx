import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getReportesPorEstado } from "@/actions/reportes"
import ModeracionReporteCard from "./ModeracionReporteCard"
import { Reporte, ReporteFilters } from "@/components/reportes/types"

export default async function ModeracionTabContent({ filters }: { filters: ReporteFilters }) {
  const reportes = {
    pending: {
      title: "pendientes",
      data: await getReportesPorEstado("pending", filters)
    },
    revision: {
      title: "revision",
      data: await getReportesPorEstado("revision", filters)
    },
    approved: {
      title: "aprobados",
      data: await getReportesPorEstado("approved", filters)
    },
    rejected: {
      title: "rechazados",
      data: await getReportesPorEstado("rejected", filters)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Cola de moderación</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="pendientes" className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pendientes">
                Pendientes ({reportes.pending.data.length})
              </TabsTrigger>
              <TabsTrigger value="revision">
                En revisión ({reportes.revision.data.length})
              </TabsTrigger>
              <TabsTrigger value="aprobados">
                Aprobados ({reportes.approved.data.length})
              </TabsTrigger>
              <TabsTrigger value="rechazados">
                Rechazados ({reportes.rejected.data.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(reportes).map(([tab, value]) => {
            return (
              <TabsContent key={value.title} value={value.title} className="p-0 mt-0">
                <ReportesTabContent
                  reportes={value.data}
                  soloVer={tab === "approved" || tab === "rejected"}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ReportesTabContent({ reportes, soloVer }: { reportes: Reporte[], soloVer: boolean }) {
  return (
    <ScrollArea className="h-[calc(100vh-24rem)]">
      <div className="p-6 space-y-4">
        {reportes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#434546]">No hay reportes en esta categoría.</p>
          </div>
        ) : (
          reportes.map((reporte) => (
            <ModeracionReporteCard
              key={reporte.id}
              reporte={reporte}
              soloVer={soloVer}
            />
          ))
        )}
      </div>
    </ScrollArea>
  )
}