"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MapIcon, ArrowLeft, Edit, Trash2, MessageSquare, Send, ThumbsUp, Share2, Flag } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ReporteDetallePageParams {
  id: string;
}

export default function ReporteDetallePage({ params }: { params: ReporteDetallePageParams }) {
  const { id } = params
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Datos de ejemplo para el reporte
  const reporte = {
    id,
    title: "Vertido de residuos industriales",
    location: "Río Motagua, Sector Norte",
    coordinates: "15.4712° N, 88.8236° W",
    date: "12 mayo, 2025",
    status: "Pendiente",
    severity: "Alta",
    type: "Residuos Industriales",
    description:
      "Se ha detectado un vertido continuo de residuos industriales que está afectando gravemente la calidad del agua y la fauna local. El vertido proviene de una fábrica ubicada aproximadamente a 500 metros de la ribera. Se observa una coloración oscura en el agua y un fuerte olor químico. Varios peces muertos han aparecido en la zona en los últimos días.",
    author: "Juan Pérez",
    authorRole: "Usuario",
    createdAt: "12 mayo, 2025, 10:23 AM",
    updatedAt: "12 mayo, 2025, 10:23 AM",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    comments: [
      {
        id: 1,
        author: "María González",
        authorRole: "Moderador",
        content:
          "He verificado la información y efectivamente hay un vertido industrial. Estamos contactando con las autoridades ambientales para que tomen medidas.",
        date: "12 mayo, 2025, 14:45 PM",
        likes: 3,
      },
      {
        id: 2,
        author: "Carlos Rodríguez",
        authorRole: "Investigador",
        content:
          "Según nuestros datos de Copernicus, esta zona ya presentaba anomalías en los niveles de contaminantes desde hace una semana. Gracias por el reporte detallado.",
        date: "12 mayo, 2025, 16:30 PM",
        likes: 5,
      },
    ],
    timeline: [
      {
        id: 1,
        action: "Reporte creado",
        date: "12 mayo, 2025, 10:23 AM",
        user: "Juan Pérez",
      },
      {
        id: 2,
        action: "Reporte verificado por moderador",
        date: "12 mayo, 2025, 14:45 PM",
        user: "María González",
      },
      {
        id: 3,
        action: "Enviado a autoridades ambientales",
        date: "12 mayo, 2025, 17:00 PM",
        user: "Sistema",
      },
    ],
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-orange-100 text-orange-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "en revisión":
        return "bg-blue-100 text-blue-800"
      case "verificado":
        return "bg-purple-100 text-purple-800"
      case "resuelto":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/dashboard/reportes" className="flex items-center text-[#2ba4e0] hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Reportes
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#282f33]">{reporte.title}</h1>
              <Badge className={getSeverityColor(reporte.severity)}>{reporte.severity}</Badge>
              <Badge className={getStatusColor(reporte.status)}>{reporte.status}</Badge>
            </div>
            <p className="text-sm text-[#434546] mt-1">
              Reporte #{reporte.id} • Creado por {reporte.author} • {reporte.date}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-[#2ba4e0] text-[#2ba4e0]">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Información principal */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Información del Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[#282f33] mb-2">Descripción</h3>
                  <p className="text-sm text-[#434546]">{reporte.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[#282f33] mb-2">Evidencia Fotográfica</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {reporte.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Evidencia ${index + 1}`}
                        className="rounded-md object-cover h-[150px] w-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#282f33] mb-2">Detalles</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-sm text-[#434546]/70 w-32">Tipo:</span>
                        <span className="text-sm text-[#434546]">{reporte.type}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-[#434546]/70 w-32">Ubicación:</span>
                        <span className="text-sm text-[#434546]">{reporte.location}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-[#434546]/70 w-32">Coordenadas:</span>
                        <span className="text-sm text-[#434546]">{reporte.coordinates}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-[#434546]/70 w-32">Fecha de reporte:</span>
                        <span className="text-sm text-[#434546]">{reporte.createdAt}</span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-[#434546]/70 w-32">Última actualización:</span>
                        <span className="text-sm text-[#434546]">{reporte.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#282f33] mb-2">Ubicación en el Mapa</h3>
                    <div className="aspect-square bg-[#434546] rounded-md flex items-center justify-center relative">
                      <MapIcon className="h-10 w-10 text-[#2ba4e0]/30" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comentarios */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Comentarios y Actualizaciones</CardTitle>
              <CardDescription>{reporte.comments.length} comentarios sobre este reporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Formulario de comentario */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback className="bg-[#418fb6] text-white">JP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Añade un comentario o actualización..."
                      className="min-h-[80px] border-[#435761]/30 focus:border-[#2ba4e0] focus:ring-[#2ba4e0]"
                    />
                    <div className="flex justify-end mt-2">
                      <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lista de comentarios */}
                <div className="space-y-4">
                  {reporte.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={comment.author} />
                        <AvatarFallback className="bg-[#418fb6] text-white">{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#282f33]">{comment.author}</span>
                          <Badge variant="outline" className="text-xs font-normal">
                            {comment.authorRole}
                          </Badge>
                          <span className="text-xs text-[#434546]/70">{comment.date}</span>
                        </div>
                        <p className="text-sm text-[#434546] mt-1">{comment.content}</p>
                        <div className="flex gap-4 mt-2">
                          <button className="text-xs text-[#434546]/70 flex items-center gap-1 hover:text-[#2ba4e0]">
                            <ThumbsUp className="h-3 w-3" />
                            {comment.likes}
                          </button>
                          <button className="text-xs text-[#434546]/70 flex items-center gap-1 hover:text-[#2ba4e0]">
                            <MessageSquare className="h-3 w-3" />
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Información del autor */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Autor del Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt={reporte.author} />
                  <AvatarFallback className="bg-[#418fb6] text-white">
                    {reporte.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium text-[#282f33]">{reporte.author}</h3>
                  <p className="text-xs text-[#434546]">{reporte.authorRole}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      14 reportes
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      8 resueltos
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Línea de tiempo */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Línea de Tiempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-4">
                {reporte.timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-[#2ba4e0]"></div>
                    {index < reporte.timeline.length - 1 && (
                      <div className="absolute -left-4.5 top-5 h-full w-0.5 bg-[#2ba4e0]/30"></div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-[#282f33]">{event.action}</h4>
                      <p className="text-xs text-[#434546]/70 mt-0.5">
                        {event.date} • {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir Reporte
                </Button>
                <Button variant="outline" className="w-full">
                  <Flag className="h-4 w-4 mr-2" />
                  Reportar Problema
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reportes Relacionados */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reportes Relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="#" className="block p-3 rounded-md hover:bg-[#f8f9fa] transition-colors">
                  <h4 className="text-sm font-medium text-[#282f33]">Contaminación industrial en Sector Norte</h4>
                  <p className="text-xs text-[#434546]/70 mt-1">10 mayo, 2025 • 2km de distancia</p>
                </Link>
                <Link href="#" className="block p-3 rounded-md hover:bg-[#f8f9fa] transition-colors">
                  <h4 className="text-sm font-medium text-[#282f33]">Mortandad de peces en Río Motagua</h4>
                  <p className="text-xs text-[#434546]/70 mt-1">8 mayo, 2025 • 1.5km de distancia</p>
                </Link>
                <Link href="#" className="block p-3 rounded-md hover:bg-[#f8f9fa] transition-colors">
                  <h4 className="text-sm font-medium text-[#282f33]">Cambio de coloración en el agua</h4>
                  <p className="text-xs text-[#434546]/70 mt-1">7 mayo, 2025 • 3km de distancia</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de Confirmación de Eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
