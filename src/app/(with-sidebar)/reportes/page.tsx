import { Suspense } from "react"
import ModeracionHeader from "@/components/reportes/ModeracionHeaders"
import ModeracionStats from "@/components/reportes/ModeracionStats"
import ModeracionFilters from "@/components/reportes/ModeracionFilters"
import ModeracionTabContent from "@/components/reportes/ModeracionTabContent"
import { ReporteFilters } from "@/components/reportes/types"
import { getReportesStats } from "@/actions/reportes";

export default async function ModeracionReportesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { search, tipo, mostrarResueltos } = await searchParams;

  const filters: ReporteFilters = {
    searchTerm: search as string || "",
    type: tipo as string,
    mostrarResueltos: mostrarResueltos === "true"
  }

  const stats = await getReportesStats()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ModeracionHeader />

        <Suspense fallback={<div>Cargando estadísticas...</div>}>
          <ModeracionStats stats={stats} />
        </Suspense>

        <div className="flex flex-col md:flex-row gap-6">
          <ModeracionFilters filters={filters} />

          <div className="flex-1">
            <Suspense fallback={<div>Cargando reportes...</div>}>
              <ModeracionTabContent filters={filters} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}