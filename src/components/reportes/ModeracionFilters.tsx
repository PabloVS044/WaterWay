"use client"

import { useRouter, usePathname } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReporteFilters, tiposReporte } from "@/components/reportes/types"
import { useCallback } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export default function ModeracionFilters({ filters }: { filters: ReporteFilters }) {
  const router = useRouter()
  const pathname = usePathname()

  const updateSearchParams = useCallback((params: Partial<ReporteFilters>) => {
    const searchParams = new URLSearchParams()

    const newFilters = { ...filters, ...params }

    if (newFilters.searchTerm) searchParams.set("search", newFilters.searchTerm)
    if (newFilters.tipo && newFilters.tipo !== "todos") searchParams.set("tipo", newFilters.tipo)
    if (newFilters.mostrarResueltos) searchParams.set("mostrarResueltos", "true")

    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, [router, pathname, filters])

  const debouncedSearch = useDebounce((value: string) => {
    updateSearchParams({ searchTerm: value })
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const handleTipoChange = (value: string) => {
    updateSearchParams({ type: value })
  }

  const handleMostrarResueltosChange = (checked: boolean) => {
    updateSearchParams({ mostrarResueltos: checked })
  }

  return (
    <div className="w-full md:w-72 flex flex-col gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar reportes..."
              className="pl-8"
              defaultValue={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="font-medium text-[#282f33] flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo-filtro">Tipo de problema</Label>
            <Select defaultValue={filters.type} onValueChange={handleTipoChange}>
              <SelectTrigger id="tipo-filtro">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                {tiposReporte.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="mostrar-resueltos"
              checked={filters.mostrarResueltos}
              onCheckedChange={handleMostrarResueltosChange}
            />
            <Label htmlFor="mostrar-resueltos">Mostrar resueltos</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}