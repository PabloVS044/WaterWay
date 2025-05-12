"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  Calendar,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  Filter,
  Eye,
  CheckCheck,
  Edit,
} from "lucide-react"
import { reportesMock } from "@/data/reportes-mock"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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

export default function ModeracionReportesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [mostrarResueltos, setMostrarResueltos] = useState(false)
  const [reportes, setReportes] = useState(reportesMock)
  const [filteredReportes, setFilteredReportes] = useState(reportesMock)
  const [selectedReporte, setSelectedReporte] = useState<string | null>(null)
  const [rechazoRazon, setRechazoRazon] = useState("")
  const [showRechazoDialog, setShowRechazoDialog] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    filterReportes(term, tipoFiltro, mostrarResueltos)
  }

  const filterReportes = (term: string, tipo: string, mostrarResueltos: boolean) => {
    let filtered = reportes

    // Filtrar por término de búsqueda
    if (term.trim() !== "") {
      filtered = filtered.filter(
        (reporte) =>
          reporte.titulo.toLowerCase().includes(term.toLowerCase()) ||
          reporte.descripcion.toLowerCase().includes(term.toLowerCase()) ||
          reporte.usuario.nombre.toLowerCase().includes(term.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (tipo !== "todos") {
      filtered = filtered.filter((reporte) => reporte.tipo === tipo)
    }

    // Filtrar por estado (resuelto/no resuelto)
    if (!mostrarResueltos) {
      filtered = filtered.filter((reporte) => !reporte.resuelto)
    }

    setFilteredReportes(filtered)
  }

  const handleTipoChange = (value: string) => {
    setTipoFiltro(value)
    filterReportes(searchTerm, value, mostrarResueltos)
  }

  const handleMostrarResueltosChange = (checked: boolean) => {
    setMostrarResueltos(checked)
    filterReportes(searchTerm, tipoFiltro, checked)
  }

  const getReportesPorEstado = (estado: "pendiente" | "revision" | "aprobado" | "rechazado" | "todos") => {
    if (estado === "todos") {
      return filteredReportes
    }
    return filteredReportes.filter((r) => r.estado === estado)
  }

  const handleAprobarReporte = (id: string) => {
    // En un caso real, esto sería una llamada a la API
    const updatedReportes = reportes.map((reporte) =>
      reporte.id === id ? { ...reporte, estado: "aprobado" } : reporte,
    )
    setReportes(updatedReportes)
    filterReportes(searchTerm, tipoFiltro, mostrarResueltos)

    toast.success("Reporte aprobado", {
      description: "El reporte ha sido aprobado y ahora es visible para todos los usuarios.",
    })
  }

  const handleRechazarReporte = (id: string) => {
    setSelectedReporte(id)
    setShowRechazoDialog(true)
  }

  const confirmarRechazo = () => {
    if (!selectedReporte) return

    // En un caso real, esto sería una llamada a la API
    const updatedReportes = reportes.map((reporte) =>
      reporte.id === selectedReporte ? { ...reporte, estado: "rechazado", razonRechazo: rechazoRazon } : reporte,
    )
    setReportes(updatedReportes)
    filterReportes(searchTerm, tipoFiltro, mostrarResueltos)
    setShowRechazoDialog(false)
    setRechazoRazon("")

    toast.error("Reporte rechazado", {
      description: "Se ha notificado al usuario sobre el rechazo de su reporte.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#282f33]">Moderación de reportes</h1>
            <p className="text-[#434546]">Revisa y gestiona los reportes enviados por los usuarios</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-[#418fb6]/10">
            <CardContent className="p-4 flex items-center">
              <div className="bg-[#418fb6] rounded-full p-3 mr-4">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#434546]">Pendientes</p>
                <p className="text-2xl font-bold text-[#282f33]">{getReportesPorEstado("pendiente").length}</p>
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
                <p className="text-2xl font-bold text-[#282f33]">{getReportesPorEstado("revision").length}</p>
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
                <p className="text-2xl font-bold text-green-900">{getReportesPorEstado("aprobado").length}</p>
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
                <p className="text-2xl font-bold text-red-900">{getReportesPorEstado("rechazado").length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-72 flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Buscar reportes..." className="pl-8" value={searchTerm} onChange={handleSearch} />
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
                  <Select value={tipoFiltro} onValueChange={handleTipoChange}>
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
                    checked={mostrarResueltos}
                    onCheckedChange={handleMostrarResueltosChange}
                  />
                  <Label htmlFor="mostrar-resueltos">Mostrar resueltos</Label>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-[#434546]">
                    Mostrando {filteredReportes.length} de {reportes.length} reportes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Cola de moderación</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="pendientes" className="w-full">
                  <div className="px-6 pt-2">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="pendientes">
                        Pendientes ({getReportesPorEstado("pendiente").length})
                      </TabsTrigger>
                      <TabsTrigger value="revision">
                        En revisión ({getReportesPorEstado("revision").length})
                      </TabsTrigger>
                      <TabsTrigger value="aprobados">Aprobados ({getReportesPorEstado("aprobado").length})</TabsTrigger>
                      <TabsTrigger value="rechazados">
                        Rechazados ({getReportesPorEstado("rechazado").length})
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="pendientes" className="p-0 mt-0">
                    <ScrollArea className="h-[calc(100vh-24rem)]">
                      <div className="p-6 space-y-4">
                        {getReportesPorEstado("pendiente").length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-[#434546]">No hay reportes pendientes de revisión.</p>
                          </div>
                        ) : (
                          getReportesPorEstado("pendiente").map((reporte) => (
                            <ModeracionReporteCard
                              key={reporte.id}
                              reporte={reporte}
                              onAprobar={handleAprobarReporte}
                              onRechazar={handleRechazarReporte}
                            />
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="revision" className="p-0 mt-0">
                    <ScrollArea className="h-[calc(100vh-24rem)]">
                      <div className="p-6 space-y-4">
                        {getReportesPorEstado("revision").length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-[#434546]">No hay reportes en revisión.</p>
                          </div>
                        ) : (
                          getReportesPorEstado("revision").map((reporte) => (
                            <ModeracionReporteCard
                              key={reporte.id}
                              reporte={reporte}
                              onAprobar={handleAprobarReporte}
                              onRechazar={handleRechazarReporte}
                            />
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="aprobados" className="p-0 mt-0">
                    <ScrollArea className="h-[calc(100vh-24rem)]">
                      <div className="p-6 space-y-4">
                        {getReportesPorEstado("aprobado").length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-[#434546]">No hay reportes aprobados.</p>
                          </div>
                        ) : (
                          getReportesPorEstado("aprobado").map((reporte) => (
                            <ModeracionReporteCard
                              key={reporte.id}
                              reporte={reporte}
                              onAprobar={handleAprobarReporte}
                              onRechazar={handleRechazarReporte}
                              soloVer
                            />
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="rechazados" className="p-0 mt-0">
                    <ScrollArea className="h-[calc(100vh-24rem)]">
                      <div className="p-6 space-y-4">
                        {getReportesPorEstado("rechazado").length === 0 ? (
                          <div className="text-center py-12">
                            <p className="text-[#434546]">No hay reportes rechazados.</p>
                          </div>
                        ) : (
                          getReportesPorEstado("rechazado").map((reporte) => (
                            <ModeracionReporteCard
                              key={reporte.id}
                              reporte={reporte}
                              onAprobar={handleAprobarReporte}
                              onRechazar={handleRechazarReporte}
                              soloVer
                            />
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
      </div>

      <Dialog open={showRechazoDialog} onOpenChange={setShowRechazoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar reporte</DialogTitle>
            <DialogDescription>
              Por favor, proporciona una razón para rechazar este reporte. Esta información será enviada al usuario.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Razón del rechazo..."
            value={rechazoRazon}
            onChange={(e) => setRechazoRazon(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRechazoDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white"
              onClick={confirmarRechazo}
              disabled={!rechazoRazon.trim()}
            >
              Confirmar rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ModeracionReporteCardProps {
  reporte: any
  onAprobar: (id: string) => void
  onRechazar: (id: string) => void
  soloVer?: boolean
}

function ModeracionReporteCard({ reporte, onAprobar, onRechazar, soloVer = false }: ModeracionReporteCardProps) {
  return (
    <Card className="hover:shadow-sm transition">
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
              <Badge
                variant={
                  reporte.estado === "aprobado"
                    ? "outline"
                    : reporte.estado === "rechazado"
                      ? "destructive"
                      : "secondary"
                }
              >
                {reporte.estado === "pendiente" && "Pendiente"}
                {reporte.estado === "revision" && "En revisión"}
                {reporte.estado === "aprobado" && "Aprobado"}
                {reporte.estado === "rechazado" && "Rechazado"}
              </Badge>
            </div>
            <p className="text-sm text-[#434546] line-clamp-2 mt-1">{reporte.descripcion}</p>
            <div className="flex items-center mt-2 text-xs text-[#434546]">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{reporte.ubicacion}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20">
                  {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                </Badge>
                <div className="flex items-center text-xs text-[#434546]">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{reporte.fecha}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={reporte.usuario.avatar || "/placeholder.svg"} alt={reporte.usuario.nombre} />
                  <AvatarFallback>{reporte.usuario.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{reporte.usuario.nombre}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <Link href={`/src/app/(with-sidebar)/reportes/${reporte.id}`}>
              <Button variant="outline" size="sm" className="text-[#434546]">
                <Eye className="mr-1 h-4 w-4" /> Ver detalles
              </Button>
            </Link>

            {!soloVer && (
              <>
                <Button variant="outline" size="sm" className="text-[#434546]">
                  <Edit className="mr-1 h-4 w-4" /> Editar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-[#434546]">
                      Acciones
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-green-600 cursor-pointer" onClick={() => onAprobar(reporte.id)}>
                      <CheckCheck className="mr-2 h-4 w-4" /> Aprobar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => onRechazar(reporte.id)}>
                      <X className="mr-2 h-4 w-4" /> Rechazar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
