"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Share2,
  Flag,
  AlertTriangle,
  CheckCircle2,
  ImageIcon,
} from "lucide-react"
import { reportesMock } from "@/data/reportes-mock"
import MapaReportes from "@/components/mapa-reportes"
import ComentariosReporte from "@/components/comentarios-reporte"

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

export default function DetalleReportePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("detalles")
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // En un caso real, obtendríamos el reporte de una API
  const reporte = reportesMock.find((r) => r.id === params.id) || reportesMock[0]

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    // En un caso real, implementaríamos la funcionalidad de compartir
    alert("Compartir reporte: " + reporte.titulo)
  }

  const handleReport = () => {
    // En un caso real, implementaríamos la funcionalidad de reportar
    alert("Reportar contenido inapropiado")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4 text-[#434546] hover:text-[#282f33] hover:bg-transparent p-0"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a reportes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-[#282f33]">{reporte.titulo}</h1>
                  {reporte.resuelto ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Resuelto
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      <AlertTriangle className="mr-1 h-3 w-3" /> Pendiente
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#434546]">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-[#418fb6]" />
                    {reporte.ubicacion}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-[#418fb6]" />
                    {reporte.fecha}
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={reporte.usuario.avatar || "/placeholder.svg"} alt={reporte.usuario.nombre} />
                    <AvatarFallback>{reporte.usuario.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#282f33]">{reporte.usuario.nombre}</p>
                    <p className="text-xs text-[#434546]">{reporte.usuario.rol}</p>
                  </div>
                </div>

                <p className="text-[#434546] whitespace-pre-line">{reporte.descripcion}</p>

                {reporte.imagenes && reporte.imagenes.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-[#282f33] mb-3">Evidencia fotográfica</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {reporte.imagenes.map((imagen, index) => (
                        <Dialog key={index}>
                          <DialogTrigger asChild>
                            <div
                              className="aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition"
                              onClick={() => setSelectedImage(imagen)}
                            >
                              <img
                                src={imagen || "/placeholder.svg"}
                                alt={`Imagen ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-0 overflow-hidden">
                            <div className="relative">
                              <img
                                src={selectedImage || imagen}
                                alt={`Imagen ${index + 1}`}
                                className="w-full max-h-[80vh] object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${isLiked ? "text-[#2ba4e0]" : "text-[#434546]"}`}
                      onClick={handleLike}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{likeCount}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-[#434546]"
                      onClick={() => setActiveTab("comentarios")}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{reporte.comentarios?.length || 0}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-[#434546]" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#434546]" onClick={handleReport}>
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="detalles" className="flex-1">
                    Detalles
                  </TabsTrigger>
                  <TabsTrigger value="comentarios" className="flex-1">
                    Comentarios ({reporte.comentarios?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="actualizaciones" className="flex-1">
                    Actualizaciones
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="detalles" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-[#282f33] mb-2">Información adicional</h3>
                      <div className="bg-gray-50 rounded-md p-4">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="sm:col-span-1">
                            <dt className="text-[#434546]">ID del reporte</dt>
                            <dd className="font-medium text-[#282f33] mt-1">{reporte.id}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-[#434546]">Estado</dt>
                            <dd className="font-medium text-[#282f33] mt-1">
                              {reporte.resuelto ? "Resuelto" : "Pendiente"}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-[#434546]">Fecha de creación</dt>
                            <dd className="font-medium text-[#282f33] mt-1">{reporte.fecha}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-[#434546]">Última actualización</dt>
                            <dd className="font-medium text-[#282f33] mt-1">
                              {reporte.ultimaActualizacion || "No disponible"}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-[#434546]">Coordenadas</dt>
                            <dd className="font-medium text-[#282f33] mt-1">
                              {reporte.coordenadas?.lat.toFixed(6)}, {reporte.coordenadas?.lng.toFixed(6)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {reporte.datosAdicionales && (
                      <div>
                        <h3 className="text-sm font-medium text-[#282f33] mb-2">Datos técnicos</h3>
                        <div className="bg-gray-50 rounded-md p-4">
                          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {Object.entries(reporte.datosAdicionales).map(([key, value]) => (
                              <div key={key} className="sm:col-span-1">
                                <dt className="text-[#434546]">{key}</dt>
                                <dd className="font-medium text-[#282f33] mt-1">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    )}

                    {reporte.resuelto && reporte.solucion && (
                      <div>
                        <h3 className="text-sm font-medium text-[#282f33] mb-2">Solución implementada</h3>
                        <div className="bg-green-50 rounded-md p-4 border border-green-100">
                          <p className="text-[#434546]">{reporte.solucion.descripcion}</p>
                          {reporte.solucion.fecha && (
                            <p className="text-xs text-[#434546] mt-2">Implementada el: {reporte.solucion.fecha}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="comentarios" className="p-0">
                  <ComentariosReporte reporteId={reporte.id} comentarios={reporte.comentarios || []} />
                </TabsContent>
                <TabsContent value="actualizaciones" className="p-4">
                  {reporte.actualizaciones && reporte.actualizaciones.length > 0 ? (
                    <div className="space-y-4">
                      {reporte.actualizaciones.map((actualizacion, index) => (
                        <div key={index} className="border-l-2 border-[#418fb6] pl-4 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={actualizacion.usuario.avatar || "/placeholder.svg"}
                                alt={actualizacion.usuario.nombre}
                              />
                              <AvatarFallback>{actualizacion.usuario.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{actualizacion.usuario.nombre}</span>
                            <span className="text-xs text-[#434546]">{actualizacion.fecha}</span>
                          </div>
                          <p className="text-[#434546]">{actualizacion.descripcion}</p>
                          {actualizacion.imagenes && actualizacion.imagenes.length > 0 && (
                            <div className="mt-2 flex gap-2">
                              {actualizacion.imagenes.map((imagen, imgIndex) => (
                                <div key={imgIndex} className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                  <img
                                    src={imagen || "/placeholder.svg"}
                                    alt={`Actualización ${index + 1} imagen ${imgIndex + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-[#434546]">No hay actualizaciones disponibles para este reporte.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-[#282f33] mb-3">Ubicación</h3>
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  <MapaReportes
                    reportes={[reporte]}
                    center={reporte.coordenadas}
                    zoom={14}
                    height="100%"
                    showControls={false}
                  />
                </div>
                <p className="text-xs text-[#434546] mt-2">{reporte.ubicacion}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-[#282f33] mb-3">Reportes cercanos</h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 pr-4">
                    {reportesMock
                      .filter((r) => r.id !== reporte.id)
                      .slice(0, 5)
                      .map((reporteCercano) => (
                        <Link href={`/reportes/${reporteCercano.id}`} key={reporteCercano.id}>
                          <div className="flex gap-3 p-2 hover:bg-gray-50 rounded-md transition cursor-pointer">
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              {reporteCercano.imagenes && reporteCercano.imagenes.length > 0 ? (
                                <img
                                  src={reporteCercano.imagenes[0] || "/placeholder.svg"}
                                  alt={reporteCercano.titulo}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                                  <MapPin className="h-5 w-5 text-[#418fb6]" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-[#282f33] line-clamp-1">
                                {reporteCercano.titulo}
                              </h4>
                              <p className="text-xs text-[#434546] line-clamp-1">{reporteCercano.ubicacion}</p>
                              <div className="flex items-center mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-[0.65rem] px-1 py-0 h-4 bg-[#418fb6]/5 text-[#418fb6]"
                                >
                                  {tiposReporte.find((t) => t.id === reporteCercano.tipo)?.nombre ||
                                    reporteCercano.tipo}
                                </Badge>
                                <span className="text-[0.65rem] text-[#434546] ml-2">{reporteCercano.fecha}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-[#282f33] mb-3">Acciones</h3>
                <div className="space-y-2">
                  <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                    <Share2 className="mr-2 h-4 w-4" /> Compartir reporte
                  </Button>
                  <Link href="/reportes/crear">
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" /> Crear reporte similar
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Flag className="mr-2 h-4 w-4" /> Reportar contenido inapropiado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
