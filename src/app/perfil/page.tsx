"use client"

import type React from "react"

import { useState } from "react"
import { FiEdit2, FiMapPin, FiMail, FiPhone, FiCalendar, FiSave, FiX, FiCamera } from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { reportesMock } from "@/data/reportes-mock"
import Link from "next/link"

// Datos de ejemplo del usuario
const userData = {
  nombre: "Carlos Méndez",
  email: "carlos.mendez@ejemplo.com",
  telefono: "+502 5555-1234",
  ubicacion: "Ciudad de Guatemala",
  fechaRegistro: "15/01/2024",
  bio: "Ambientalista comprometido con la protección de los recursos hídricos de Guatemala. Participante activo en iniciativas de limpieza y conservación del Río Motagua.",
  rol: "Usuario",
  avatar: "/placeholder.svg",
}

// Filtrar solo los reportes del usuario actual (simulado)
const misReportes = reportesMock.filter((reporte) => reporte.usuario.id === "user123")

// Actividades recientes simuladas
const actividadesRecientes = [
  {
    id: "act-001",
    tipo: "reporte_creado",
    fecha: "20/04/2024",
    descripcion: "Creaste un nuevo reporte: Acumulación de plásticos en la ribera",
    enlace: "/reportes/rep-001",
  },
  {
    id: "act-002",
    tipo: "comentario",
    fecha: "18/04/2024",
    descripcion: "Comentaste en un reporte: Deforestación en la ribera del río",
    enlace: "/reportes/rep-003",
  },
  {
    id: "act-003",
    tipo: "reporte_actualizado",
    fecha: "15/04/2024",
    descripcion: "Actualizaste tu reporte con nuevas fotos",
    enlace: "/reportes/rep-001",
  },
  {
    id: "act-004",
    tipo: "reporte_resuelto",
    fecha: "10/04/2024",
    descripcion: "Tu reporte fue marcado como resuelto por los moderadores",
    enlace: "/reportes/rep-003",
  },
]

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userForm, setUserForm] = useState({ ...userData })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // En un caso real, aquí enviaríamos los datos al servidor
    toast.success("Perfil actualizado correctamente")
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setUserForm({ ...userData })
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#282f33] mb-2">Mi Perfil</h1>
        <p className="text-[#434546] mb-8">Gestiona tu información personal y revisa tu actividad</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.nombre} />
                      <AvatarFallback className="text-xl bg-[#2ba4e0]">
                        {userData.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#2ba4e0] hover:bg-[#418fb6]"
                      >
                        <FiCamera className="h-4 w-4 text-white" />
                      </Button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#282f33]">{userData.nombre}</h2>
                  <Badge className="mt-1 bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20">{userData.rol}</Badge>
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center text-sm">
                      <FiMail className="mr-2 h-4 w-4 text-[#418fb6]" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiPhone className="mr-2 h-4 w-4 text-[#418fb6]" />
                      <span>{userData.telefono}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiMapPin className="mr-2 h-4 w-4 text-[#418fb6]" />
                      <span>{userData.ubicacion}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiCalendar className="mr-2 h-4 w-4 text-[#418fb6]" />
                      <span>Miembro desde {userData.fechaRegistro}</span>
                    </div>
                  </div>
                  <div className="w-full mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-[#434546]">{userData.bio}</p>
                  </div>
                  {!isEditing ? (
                    <Button
                      className="mt-6 w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      <FiEdit2 className="mr-2 h-4 w-4" /> Editar perfil
                    </Button>
                  ) : (
                    <div className="flex gap-2 mt-6 w-full">
                      <Button className="flex-1 bg-[#2ba4e0] hover:bg-[#418fb6] text-white" onClick={handleSaveProfile}>
                        <FiSave className="mr-2 h-4 w-4" /> Guardar
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleCancelEdit}>
                        <FiX className="mr-2 h-4 w-4" /> Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#434546]">Reportes creados</span>
                    <span className="font-medium">{misReportes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#434546]">Reportes resueltos</span>
                    <span className="font-medium">{misReportes.filter((r) => r.resuelto).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#434546]">Comentarios</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#434546]">Días activo</span>
                    <span className="font-medium">45</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Editar información personal</CardTitle>
                  <CardDescription>Actualiza tus datos de contacto y perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input id="nombre" name="nombre" value={userForm.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" name="email" type="email" value={userForm.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" name="telefono" value={userForm.telefono} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input id="ubicacion" name="ubicacion" value={userForm.ubicacion} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea id="bio" name="bio" rows={4} value={userForm.bio} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="reportes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="reportes">Mis reportes</TabsTrigger>
                  <TabsTrigger value="actividad">Actividad reciente</TabsTrigger>
                  <TabsTrigger value="guardados">Guardados</TabsTrigger>
                </TabsList>
                <TabsContent value="reportes" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis reportes</CardTitle>
                      <CardDescription>Reportes que has creado en la plataforma</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {misReportes.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-[#434546] mb-4">No has creado ningún reporte aún.</p>
                          <Link href="/reportes/crear">
                            <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                              Crear mi primer reporte
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {misReportes.map((reporte) => (
                            <Link href={`/reportes/${reporte.id}`} key={reporte.id}>
                              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                                <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                  {reporte.imagenes && reporte.imagenes.length > 0 ? (
                                    <img
                                      src={reporte.imagenes[0] || "/placeholder.svg"}
                                      alt={reporte.titulo}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                                      <FiMapPin className="h-6 w-6 text-[#418fb6]" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-[#282f33]">{reporte.titulo}</h3>
                                    <Badge
                                      variant={reporte.resuelto ? "outline" : "secondary"}
                                      className={reporte.resuelto ? "bg-green-50 text-green-700" : ""}
                                    >
                                      {reporte.resuelto ? "Resuelto" : "Pendiente"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-[#434546] line-clamp-1 mt-1">{reporte.descripcion}</p>
                                  <div className="flex items-center mt-2 text-xs text-[#434546]">
                                    <FiMapPin className="h-3 w-3 mr-1" />
                                    <span>{reporte.ubicacion}</span>
                                    <span className="mx-2">•</span>
                                    <FiCalendar className="h-3 w-3 mr-1" />
                                    <span>{reporte.fecha}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="actividad" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Actividad reciente</CardTitle>
                      <CardDescription>Tu actividad en la plataforma</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {actividadesRecientes.map((actividad) => (
                          <Link href={actividad.enlace} key={actividad.id}>
                            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                              <div className="w-10 h-10 rounded-full bg-[#418fb6]/10 flex items-center justify-center flex-shrink-0">
                                {actividad.tipo === "reporte_creado" && <FiMapPin className="h-5 w-5 text-[#418fb6]" />}
                                {actividad.tipo === "comentario" && <FiEdit2 className="h-5 w-5 text-[#418fb6]" />}
                                {actividad.tipo === "reporte_actualizado" && (
                                  <FiCamera className="h-5 w-5 text-[#418fb6]" />
                                )}
                                {actividad.tipo === "reporte_resuelto" && <FiSave className="h-5 w-5 text-[#418fb6]" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#434546]">{actividad.descripcion}</p>
                                <div className="flex items-center mt-2 text-xs text-[#434546]">
                                  <FiCalendar className="h-3 w-3 mr-1" />
                                  <span>{actividad.fecha}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="guardados" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Elementos guardados</CardTitle>
                      <CardDescription>Reportes y recursos que has guardado para ver más tarde</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-[#434546]">No tienes elementos guardados.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
