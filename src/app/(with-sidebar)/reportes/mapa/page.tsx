"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Filter, List, MapIcon, Plus, Calendar, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MapaReportes from "@/components/mapa-reportes"
import { reportesMock } from "@/data/reportes-mock"

const tiposReporte = [
  { id: "todos", nombre: "Todos los tipos" },
  { id: "basura", nombre: "Contaminación por basura" },
  { id: "plasticos", nombre: "Acumulación de plásticos" },
  { id: "quimicos", nombre: "Contaminación química" },
  { id: "algas", nombre: "Proliferación de algas" },
  { id: "peces", nombre: "Mortandad de peces" },
  { id: "deforestacion", nombre: "Deforestación en ribera" },
  { id: "erosion", nombre: "Erosión de orillas" },
  { id: "infraestructura", nombre: "Daños en infraestructura" },
  { id: "otro", nombre: "Otro problema" },
]

export default function MapaReportesPage() {
  const [activeTab, setActiveTab] = useState("mapa")
  const [reportes, setReportes] = useState(reportesMock)
  const [filteredReportes, setFilteredReportes] = useState(reportesMock)
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [rangoFecha, setRangoFecha] = useState([0, 100])
  const [mostrarResueltos, setMostrarResueltos] = useState(false)
  const [selectedReporte, setSelectedReporte] = useState<string | null>(null)

  useEffect(() => {
    let filtered = reportes

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (reporte) =>
          reporte.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (tipoFiltro !== "todos") {
      filtered = filtered.filter((reporte) => reporte.tipo === tipoFiltro)
    }

    // Filtrar por estado (resuelto/no resuelto)
    if (!mostrarResueltos) {
      filtered = filtered.filter((reporte) => !reporte.resuelto)
    }

    setFilteredReportes(filtered)
  }, [searchTerm, tipoFiltro, rangoFecha, mostrarResueltos, reportes])

  const handleReporteClick = (id: string) => {
    setSelectedReporte(id)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#282f33]">Mapa de reportes</h1>
            <p className="text-[#434546]">Explora los reportes de problemas ambientales en el Río Motagua</p>
          </div>
          <Link href="/src/app/(with-sidebar)/reportes/crear">
            <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
              <Plus className="mr-2 h-4 w-4" /> Crear reporte
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-72 flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar reportes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Antigüedad</Label>
                    <span className="text-xs text-[#434546]">
                      {rangoFecha[0] === 0 && rangoFecha[1] === 100
                        ? "Cualquier fecha"
                        : `${rangoFecha[0]} - ${rangoFecha[1]} días`}
                    </span>
                  </div>
                  <Slider defaultValue={[0, 100]} max={100} step={1} value={rangoFecha} onValueChange={setRangoFecha} />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="mostrar-resueltos" checked={mostrarResueltos} onCheckedChange={setMostrarResueltos} />
                  <Label htmlFor="mostrar-resueltos">Mostrar resueltos</Label>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-[#434546]">
                    Mostrando {filteredReportes.length} de {reportes.length} reportes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hidden lg:block">
              <CardContent className="p-4">
                <div className="font-medium text-[#282f33] mb-3">Reportes recientes</div>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {filteredReportes.slice(0, 5).map((reporte) => (
                      <Link href={`/src/app/(with-sidebar)/reportes/${reporte.id}`} key={reporte.id}>
                        <div
                          className={`p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer ${
                            selectedReporte === reporte.id ? "bg-gray-100" : ""
                          }`}
                          onClick={() => handleReporteClick(reporte.id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-[#282f33] line-clamp-1">{reporte.titulo}</h3>
                            {reporte.resuelto && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                Resuelto
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-[#434546] mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="line-clamp-1">{reporte.ubicacion}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20"
                            >
                              {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                            </Badge>
                            <div className="flex items-center text-xs text-[#434546]">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{reporte.fecha}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="h-[calc(100vh-12rem)]">
              <Tabs defaultValue="mapa" value={activeTab} onValueChange={setActiveTab} className="h-full">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <TabsList>
                    <TabsTrigger value="mapa" className="flex items-center">
                      <MapIcon className="mr-2 h-4 w-4" /> Mapa
                    </TabsTrigger>
                    <TabsTrigger value="lista" className="flex items-center">
                      <List className="mr-2 h-4 w-4" /> Lista
                    </TabsTrigger>
                  </TabsList>

                  <div className="text-sm text-[#434546]">{filteredReportes.length} reportes encontrados</div>
                </div>

                <TabsContent value="mapa" className="h-[calc(100%-53px)] m-0">
                  <MapaReportes reportes={filteredReportes} onReporteSelect={handleReporteClick} />
                </TabsContent>

                <TabsContent value="lista" className="h-[calc(100%-53px)] m-0 p-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {filteredReportes.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-[#434546]">No se encontraron reportes con los filtros seleccionados.</p>
                        </div>
                      ) : (
                        filteredReportes.map((reporte) => (
                          <Link href={`/src/app/(with-sidebar)/reportes/${reporte.id}`} key={reporte.id}>
                            <Card
                              className={`hover:shadow-md transition cursor-pointer ${
                                selectedReporte === reporte.id ? "border-[#2ba4e0]" : ""
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    {reporte.imagenes && reporte.imagenes.length > 0 ? (
                                      <img
                                        src={reporte.imagenes[0] || "/placeholder.svg"}
                                        alt={reporte.titulo}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                                        <MapPin className="h-8 w-8 text-[#418fb6]" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h3 className="font-medium text-[#282f33]">{reporte.titulo}</h3>
                                      {reporte.resuelto && (
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                          Resuelto
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-[#434546] line-clamp-2 mt-1">{reporte.descripcion}</p>
                                    <div className="flex items-center mt-2 text-xs text-[#434546]">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{reporte.ubicacion}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                      <Badge
                                        variant="secondary"
                                        className="text-xs bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20"
                                      >
                                        {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                                      </Badge>
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center text-xs text-[#434546]">
                                          <Calendar className="h-3 w-3 mr-1" />
                                          <span>{reporte.fecha}</span>
                                        </div>
                                        <Separator orientation="vertical" className="h-4" />
                                        <div className="flex items-center">
                                          <Avatar className="h-5 w-5">
                                            <AvatarImage
                                              src={reporte.usuario.avatar || "/placeholder.svg"}
                                              alt={reporte.usuario.nombre}
                                            />
                                            <AvatarFallback>{reporte.usuario.nombre.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="text-xs ml-1">{reporte.usuario.nombre}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
