"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Calendar, Plus, Search, AlertTriangle, CheckCircle2, Clock, X } from "lucide-react"
import { reportesMock } from "@/data/reportes-mock"

const tiposReporte = [
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

// Filtrar solo los reportes del usuario actual (simulado)
const misReportes = reportesMock.filter((reporte) => reporte.usuario.id === "user123")

export default function MisReportesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredReportes, setFilteredReportes] = useState(misReportes)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredReportes(misReportes)
    } else {
      const filtered = misReportes.filter(
        (reporte) =>
          reporte.titulo.toLowerCase().includes(term.toLowerCase()) ||
          reporte.descripcion.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredReportes(filtered)
    }
  }

  const getReportesPorEstado = (estado: "pendiente" | "revision" | "aprobado" | "rechazado" | "resuelto") => {
    if (estado === "pendiente") {
      return filteredReportes.filter((r) => r.estado === "pendiente")
    } else if (estado === "revision") {
      return filteredReportes.filter((r) => r.estado === "revision")
    } else if (estado === "aprobado") {
      return filteredReportes.filter((r) => r.estado === "aprobado" && !r.resuelto)
    } else if (estado === "rechazado") {
      return filteredReportes.filter((r) => r.estado === "rechazado")
    } else {
      return filteredReportes.filter((r) => r.resuelto)
    }
  }

  const getEstadoBadge = (estado: string, resuelto: boolean) => {
    if (resuelto) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Resuelto
        </Badge>
      )
    }

    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="mr-1 h-3 w-3" /> Pendiente
          </Badge>
        )
      case "revision":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> En revisión
          </Badge>
        )
      case "aprobado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Aprobado
          </Badge>
        )
      case "rechazado":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" /> Rechazado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertTriangle className="mr-1 h-3 w-3" /> Desconocido
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#282f33]">Mis reportes</h1>
            <p className="text-[#434546]">Gestiona y haz seguimiento a los reportes que has enviado</p>
          </div>
          <Link href="/reportes/crear">
            <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
              <Plus className="mr-2 h-4 w-4" /> Crear reporte
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar en mis reportes..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Historial de reportes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="todos" className="w-full">
              <div className="px-6 pt-2">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="todos">Todos ({filteredReportes.length})</TabsTrigger>
                  <TabsTrigger value="pendiente">Pendientes ({getReportesPorEstado("pendiente").length})</TabsTrigger>
                  <TabsTrigger value="revision">En revisión ({getReportesPorEstado("revision").length})</TabsTrigger>
                  <TabsTrigger value="aprobado">Aprobados ({getReportesPorEstado("aprobado").length})</TabsTrigger>
                  <TabsTrigger value="rechazado">Rechazados ({getReportesPorEstado("rechazado").length})</TabsTrigger>
                  <TabsTrigger value="resuelto">Resueltos ({getReportesPorEstado("resuelto").length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="todos" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {filteredReportes.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No has creado ningún reporte aún.</p>
                        <Link href="/reportes/crear">
                          <Button className="mt-4 bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                            <Plus className="mr-2 h-4 w-4" /> Crear tu primer reporte
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      filteredReportes.map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="pendiente" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {getReportesPorEstado("pendiente").length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No tienes reportes pendientes.</p>
                      </div>
                    ) : (
                      getReportesPorEstado("pendiente").map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="revision" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {getReportesPorEstado("revision").length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No tienes reportes en revisión.</p>
                      </div>
                    ) : (
                      getReportesPorEstado("revision").map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="aprobado" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {getReportesPorEstado("aprobado").length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No tienes reportes aprobados.</p>
                      </div>
                    ) : (
                      getReportesPorEstado("aprobado").map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="rechazado" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {getReportesPorEstado("rechazado").length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No tienes reportes rechazados.</p>
                      </div>
                    ) : (
                      getReportesPorEstado("rechazado").map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="resuelto" className="p-0 mt-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="p-6 space-y-4">
                    {getReportesPorEstado("resuelto").length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-[#434546]">No tienes reportes resueltos.</p>
                      </div>
                    ) : (
                      getReportesPorEstado("resuelto").map((reporte) => (
                        <ReporteCard key={reporte.id} reporte={reporte} getEstadoBadge={getEstadoBadge} />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ReporteCardProps {
  reporte: any
  getEstadoBadge: (estado: string, resuelto: boolean) => React.ReactNode
}

function ReporteCard({ reporte, getEstadoBadge }: ReporteCardProps) {
  return (
    <Link href={`/reportes/${reporte.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer">
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
                {getEstadoBadge(reporte.estado, reporte.resuelto)}
              </div>
              <p className="text-sm text-[#434546] line-clamp-2 mt-1">{reporte.descripcion}</p>
              <div className="flex items-center mt-2 text-xs text-[#434546]">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{reporte.ubicacion}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className="text-xs bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20">
                  {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                </Badge>
                <div className="flex items-center text-xs text-[#434546]">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{reporte.fecha}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
