"use client"

import {
  FiEye,
  FiBell,
  FiLock,
  FiGlobe,
  FiSave,
  FiMap,
  FiFileText,
  FiBarChart2,
  FiUsers,
  FiMoon,
  FiInfo,
} from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useConfig } from "@/contexts/config-context"
import { CustomSwitch } from "@/components/ui/custom-switch"

// Añadir un estado para mostrar cuando se han realizado cambios
import { useState, useEffect } from "react"

// Importar toast
import { toast } from "sonner"

// Importar el indicador
import { ConfigIndicator } from "@/components/config-indicator"

export default function ConfiguracionPage() {
  // Usar el contexto de configuración
  const { config, updateInterfaceConfig, updateNotificacionesConfig, updatePrivacidadConfig, saveAllConfig } =
    useConfig()

  // Dentro de la función ConfiguracionPage, añadir:
  const [hasChanges, setHasChanges] = useState(false)

  // Añadir un efecto para detectar cambios
  useEffect(() => {
    setHasChanges(true)
  }, [config])

  // Modificar la función de guardar para resetear el estado de cambios
  const handleSaveConfig = () => {
    saveAllConfig()
    setHasChanges(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#282f33] mb-2">Configuración</h1>
        <p className="text-[#434546] mb-8">Personaliza tu experiencia en WaterWay+</p>

        <Tabs defaultValue="interfaz">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interfaz" className="flex items-center gap-2">
              <FiEye className="h-4 w-4" /> Interfaz
            </TabsTrigger>
            <TabsTrigger value="notificaciones" className="flex items-center gap-2">
              <FiBell className="h-4 w-4" /> Notificaciones
            </TabsTrigger>
            <TabsTrigger value="privacidad" className="flex items-center gap-2">
              <FiLock className="h-4 w-4" /> Privacidad y Preferencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interfaz" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiEye className="h-5 w-5 text-[#418fb6]" /> Configuración de interfaz
                </CardTitle>
                <CardDescription>Personaliza qué elementos se muestran en tu interfaz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiMap className="h-5 w-5 text-[#418fb6]" />
                      <div>
                        <Label htmlFor="mostrar-mapa" className="text-base">
                          Mapa interactivo
                        </Label>
                        <p className="text-sm text-[#434546]">Mostrar el mapa de reportes en el dashboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.interface.mostrarMapa ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="mostrar-mapa"
                        checked={config.interface.mostrarMapa}
                        onCheckedChange={(checked) => {
                          updateInterfaceConfig("mostrarMapa", checked)
                          toast.info(checked ? "Mapa activado" : "Mapa desactivado", {
                            description: checked
                              ? "El mapa ahora se mostrará en el dashboard"
                              : "El mapa ya no se mostrará en el dashboard",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiFileText className="h-5 w-5 text-[#418fb6]" />
                      <div>
                        <Label htmlFor="mostrar-reportes" className="text-base">
                          Reportes recientes
                        </Label>
                        <p className="text-sm text-[#434546]">Mostrar los reportes recientes en el dashboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.interface.mostrarReportes ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="mostrar-reportes"
                        checked={config.interface.mostrarReportes}
                        onCheckedChange={(checked) => {
                          updateInterfaceConfig("mostrarReportes", checked)
                          toast.info(checked ? "Reportes activados" : "Reportes desactivados", {
                            description: checked
                              ? "Los reportes ahora se mostrarán en el dashboard"
                              : "Los reportes ya no se mostrarán en el dashboard",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiBarChart2 className="h-5 w-5 text-[#418fb6]" />
                      <div>
                        <Label htmlFor="mostrar-estadisticas" className="text-base">
                          Estadísticas y gráficos
                        </Label>
                        <p className="text-sm text-[#434546]">Mostrar estadísticas y gráficos de calidad del agua</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.interface.mostrarEstadisticas ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="mostrar-estadisticas"
                        checked={config.interface.mostrarEstadisticas}
                        onCheckedChange={(checked) => {
                          updateInterfaceConfig("mostrarEstadisticas", checked)
                          toast.info(checked ? "Estadísticas activadas" : "Estadísticas desactivadas", {
                            description: checked
                              ? "Las estadísticas ahora se mostrarán en el dashboard"
                              : "Las estadísticas ya no se mostrarán en el dashboard",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiUsers className="h-5 w-5 text-[#418fb6]" />
                      <div>
                        <Label htmlFor="mostrar-testimonios" className="text-base">
                          Testimonios
                        </Label>
                        <p className="text-sm text-[#434546]">Mostrar testimonios de otros usuarios</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.interface.mostrarTestimonios ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="mostrar-testimonios"
                        checked={config.interface.mostrarTestimonios}
                        onCheckedChange={(checked) => {
                          updateInterfaceConfig("mostrarTestimonios", checked)
                          toast.info(checked ? "Testimonios activados" : "Testimonios desactivados", {
                            description: checked
                              ? "Los testimonios ahora se mostrarán en el dashboard"
                              : "Los testimonios ya no se mostrarán en el dashboard",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiMoon className="h-5 w-5 text-[#418fb6]" />
                      <div>
                        <Label htmlFor="tema-oscuro" className="text-base">
                          Tema oscuro
                        </Label>
                        <p className="text-sm text-[#434546]">Activar el modo oscuro en la aplicación</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.interface.temaOscuro ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="tema-oscuro"
                        checked={config.interface.temaOscuro}
                        onCheckedChange={(checked) => {
                          updateInterfaceConfig("temaOscuro", checked)
                          toast.info(checked ? "Tema oscuro activado" : "Tema oscuro desactivado", {
                            description: checked
                              ? "El tema oscuro ahora está activado"
                              : "El tema oscuro ahora está desactivado",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full mt-6 ${
                    hasChanges ? "bg-[#2ba4e0] hover:bg-[#418fb6]" : "bg-[#2ba4e0] hover:bg-[#418fb6]"
                  } text-white`}
                  onClick={handleSaveConfig}
                  size="lg"
                >
                  <FiSave className="mr-2 h-5 w-5" />
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiBell className="h-5 w-5 text-[#418fb6]" /> Configuración de notificaciones
                </CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notificaciones-email" className="text-base">
                        Notificaciones por email
                      </Label>
                      <p className="text-sm text-[#434546]">Recibir notificaciones en tu correo electrónico</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.notificaciones.notificacionesEmail ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="notificaciones-email"
                        checked={config.notificaciones.notificacionesEmail}
                        onCheckedChange={(checked) => {
                          updateNotificacionesConfig("notificacionesEmail", checked)
                          toast.info(
                            checked ? "Notificaciones por email activadas" : "Notificaciones por email desactivadas",
                            {
                              description: checked
                                ? "Recibirás notificaciones en tu correo electrónico"
                                : "No recibirás notificaciones en tu correo electrónico",
                              duration: 2000,
                            },
                          )
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notificaciones-push" className="text-base">
                        Notificaciones push
                      </Label>
                      <p className="text-sm text-[#434546]">Recibir notificaciones push en tu navegador</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.notificaciones.notificacionesPush ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="notificaciones-push"
                        checked={config.notificaciones.notificacionesPush}
                        onCheckedChange={(checked) => {
                          updateNotificacionesConfig("notificacionesPush", checked)
                          toast.info(checked ? "Notificaciones push activadas" : "Notificaciones push desactivadas", {
                            description: checked
                              ? "Recibirás notificaciones push en tu navegador"
                              : "No recibirás notificaciones push en tu navegador",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4 pt-2">
                    <h3 className="font-medium text-[#282f33]">Tipos de alertas</h3>

                    <div className="flex items-center justify-between pl-4">
                      <Label htmlFor="alertas-nuevos-reportes" className="text-sm">
                        Nuevos reportes en tu área
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#434546]">
                          {config.notificaciones.alertasNuevosReportes ? "Activado" : "Desactivado"}
                        </span>
                        <CustomSwitch
                          id="alertas-nuevos-reportes"
                          checked={config.notificaciones.alertasNuevosReportes}
                          onCheckedChange={(checked) => {
                            updateNotificacionesConfig("alertasNuevosReportes", checked)
                            toast.info(
                              checked
                                ? "Alertas de nuevos reportes activadas"
                                : "Alertas de nuevos reportes desactivadas",
                              {
                                description: checked
                                  ? "Recibirás alertas de nuevos reportes en tu área"
                                  : "No recibirás alertas de nuevos reportes en tu área",
                                duration: 2000,
                              },
                            )
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pl-4">
                      <Label htmlFor="alertas-comentarios" className="text-sm">
                        Comentarios en tus reportes
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#434546]">
                          {config.notificaciones.alertasComentarios ? "Activado" : "Desactivado"}
                        </span>
                        <CustomSwitch
                          id="alertas-comentarios"
                          checked={config.notificaciones.alertasComentarios}
                          onCheckedChange={(checked) => {
                            updateNotificacionesConfig("alertasComentarios", checked)
                            toast.info(
                              checked ? "Alertas de comentarios activadas" : "Alertas de comentarios desactivadas",
                              {
                                description: checked
                                  ? "Recibirás alertas de comentarios en tus reportes"
                                  : "No recibirás alertas de comentarios en tus reportes",
                                duration: 2000,
                              },
                            )
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pl-4">
                      <Label htmlFor="alertas-actualizaciones" className="text-sm">
                        Actualizaciones de estado de tus reportes
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#434546]">
                          {config.notificaciones.alertasActualizaciones ? "Activado" : "Desactivado"}
                        </span>
                        <CustomSwitch
                          id="alertas-actualizaciones"
                          checked={config.notificaciones.alertasActualizaciones}
                          onCheckedChange={(checked) => {
                            updateNotificacionesConfig("alertasActualizaciones", checked)
                            toast.info(
                              checked
                                ? "Alertas de actualizaciones activadas"
                                : "Alertas de actualizaciones desactivadas",
                              {
                                description: checked
                                  ? "Recibirás alertas de actualizaciones de estado de tus reportes"
                                  : "No recibirás alertas de actualizaciones de estado de tus reportes",
                                duration: 2000,
                              },
                            )
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full mt-6 ${
                    hasChanges ? "bg-[#2ba4e0] hover:bg-[#418fb6]" : "bg-[#2ba4e0] hover:bg-[#418fb6]"
                  } text-white`}
                  onClick={handleSaveConfig}
                  size="lg"
                >
                  <FiSave className="mr-2 h-5 w-5" />
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacidad" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiLock className="h-5 w-5 text-[#418fb6]" /> Privacidad y preferencias
                </CardTitle>
                <CardDescription>Configura tus preferencias de privacidad y opciones regionales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="perfil-publico" className="text-base">
                        Perfil público
                      </Label>
                      <p className="text-sm text-[#434546]">Permitir que otros usuarios vean tu perfil</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.privacidad.perfilPublico ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="perfil-publico"
                        checked={config.privacidad.perfilPublico}
                        onCheckedChange={(checked) => {
                          updatePrivacidadConfig("perfilPublico", checked)
                          toast.info(checked ? "Perfil público activado" : "Perfil público desactivado", {
                            description: checked
                              ? "Otros usuarios podrán ver tu perfil"
                              : "Otros usuarios no podrán ver tu perfil",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mostrar-ubicacion" className="text-base">
                        Mostrar mi ubicación
                      </Label>
                      <p className="text-sm text-[#434546]">Mostrar tu ubicación aproximada en tus reportes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.privacidad.mostrarUbicacion ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="mostrar-ubicacion"
                        checked={config.privacidad.mostrarUbicacion}
                        onCheckedChange={(checked) => {
                          updatePrivacidadConfig("mostrarUbicacion", checked)
                          toast.info(checked ? "Ubicación activada" : "Ubicación desactivada", {
                            description: checked
                              ? "Tu ubicación se mostrará en tus reportes"
                              : "Tu ubicación no se mostrará en tus reportes",
                            duration: 2000,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compartir-estadisticas" className="text-base">
                        Compartir estadísticas
                      </Label>
                      <p className="text-sm text-[#434546]">
                        Compartir estadísticas anónimas de uso para mejorar la plataforma
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434546]">
                        {config.privacidad.compartirEstadisticas ? "Activado" : "Desactivado"}
                      </span>
                      <CustomSwitch
                        id="compartir-estadisticas"
                        checked={config.privacidad.compartirEstadisticas}
                        onCheckedChange={(checked) => {
                          updatePrivacidadConfig("compartirEstadisticas", checked)
                          toast.info(
                            checked ? "Compartir estadísticas activado" : "Compartir estadísticas desactivado",
                            {
                              description: checked
                                ? "Compartirás estadísticas anónimas de uso"
                                : "No compartirás estadísticas anónimas de uso",
                              duration: 2000,
                            },
                          )
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FiGlobe className="h-5 w-5 text-[#418fb6]" />
                      <Label htmlFor="idioma" className="text-base">
                        Idioma
                      </Label>
                    </div>
                    <Select
                      value={config.privacidad.idioma}
                      onValueChange={(value) => updatePrivacidadConfig("idioma", value)}
                    >
                      <SelectTrigger id="idioma">
                        <SelectValue placeholder="Selecciona un idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Formato de fecha</Label>
                    <RadioGroup
                      value={config.privacidad.formatoFecha}
                      onValueChange={(value) => updatePrivacidadConfig("formatoFecha", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dd/mm/yyyy" id="fecha-1" />
                        <Label htmlFor="fecha-1">DD/MM/YYYY (15/04/2024)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mm/dd/yyyy" id="fecha-2" />
                        <Label htmlFor="fecha-2">MM/DD/YYYY (04/15/2024)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yyyy-mm-dd" id="fecha-3" />
                        <Label htmlFor="fecha-3">YYYY-MM-DD (2024-04-15)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Button
                  className={`w-full mt-6 ${
                    hasChanges ? "bg-[#2ba4e0] hover:bg-[#418fb6]" : "bg-[#2ba4e0] hover:bg-[#418fb6]"
                  } text-white`}
                  onClick={handleSaveConfig}
                  size="lg"
                >
                  <FiSave className="mr-2 h-5 w-5" />
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <FiInfo className="h-5 w-5" /> Datos de la cuenta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Descargar mis datos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Eliminar mi cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ConfigIndicator />
    </div>
  )
}
