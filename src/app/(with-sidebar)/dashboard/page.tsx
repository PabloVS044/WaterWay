"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapPin, FileText, AlertTriangle, CheckCircle2, Users, ArrowRight } from "lucide-react"
import RiverQualityChart from "@/components/river-quality-chart"
import MapPreview from "@/components/map-preview"
import Link from "next/link"
import { useConfig } from "@/contexts/config-context"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("calidad-agua")
  const { config } = useConfig()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#282f33] mb-2">Dashboard</h1>
          <p className="text-[#434546]">Bienvenido al panel de control de WaterWay+</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#2ba4e0]/10 to-[#418fb6]/10">
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-[#2ba4e0] p-3 mr-4">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#434546]">Reportes activos</p>
                <p className="text-2xl font-bold text-[#282f33]">24</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#418fb6]/10 to-[#49758b]/10">
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-[#418fb6] p-3 mr-4">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#434546]">Mis reportes</p>
                <p className="text-2xl font-bold text-[#282f33]">6</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#49758b]/10 to-[#435761]/10">
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-[#49758b] p-3 mr-4">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#434546]">Alertas</p>
                <p className="text-2xl font-bold text-[#282f33]">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#435761]/10 to-[#282f33]/10">
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-[#435761] p-3 mr-4">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#434546]">Resueltos</p>
                <p className="text-2xl font-bold text-[#282f33]">18</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {config.interface.mostrarEstadisticas && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monitoreo del Río Motagua</CardTitle>
                <CardDescription>Datos de calidad del agua y contaminación</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="calidad-agua" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="calidad-agua" className="text-sm">
                      Calidad del agua
                    </TabsTrigger>
                    <TabsTrigger value="contaminacion" className="text-sm">
                      Contaminación
                    </TabsTrigger>
                    <TabsTrigger value="biodiversidad" className="text-sm">
                      Biodiversidad
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="calidad-agua" className="h-[350px]">
                    <RiverQualityChart dataType="contaminacion" />
                  </TabsContent>
                  <TabsContent value="contaminacion" className="h-[350px]">
                    <RiverQualityChart dataType="contaminacion" />
                  </TabsContent>
                  <TabsContent value="biodiversidad" className="h-[350px]">
                    <RiverQualityChart dataType="biodiversidad" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {config.interface.mostrarMapa && (
            <Card className={config.interface.mostrarEstadisticas ? "" : "lg:col-span-3"}>
              <CardHeader>
                <CardTitle>Mapa de reportes</CardTitle>
                <CardDescription>Vista general de reportes activos</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-square">
                  <MapPreview />
                </div>
                <div className="p-4">
                  <Link href="/src/app/(with-sidebar)/reportes/mapa">
                    <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                      Ver mapa completo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Últimas acciones en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#2ba4e0]/10 p-2">
                    <FileText className="h-4 w-4 text-[#2ba4e0]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nuevo reporte creado</p>
                    <p className="text-xs text-[#434546]">Contaminación por plásticos en El Progreso</p>
                    <p className="text-xs text-[#434546] mt-1">Hace 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#418fb6]/10 p-2">
                    <CheckCircle2 className="h-4 w-4 text-[#418fb6]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reporte resuelto</p>
                    <p className="text-xs text-[#434546]">Deforestación en la ribera del río</p>
                    <p className="text-xs text-[#434546] mt-1">Hace 1 día</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#49758b]/10 p-2">
                    <Users className="h-4 w-4 text-[#49758b]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nuevo usuario registrado</p>
                    <p className="text-xs text-[#434546]">Roberto Juárez se ha unido a la plataforma</p>
                    <p className="text-xs text-[#434546] mt-1">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {config.interface.mostrarReportes && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Reportes pendientes</CardTitle>
                <CardDescription>Reportes que requieren atención</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                        <MapPin className="h-6 w-6 text-[#418fb6]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#282f33]">Contaminación química en el agua</p>
                      <p className="text-sm text-[#434546] line-clamp-2">
                        El agua del río tiene un color azulado inusual y hay un fuerte olor químico.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-[#434546]">Zona industrial, Zacapa</p>
                        <p className="text-xs text-[#434546]">08/04/2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                        <MapPin className="h-6 w-6 text-[#418fb6]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#282f33]">Erosión severa en la orilla</p>
                      <p className="text-sm text-[#434546] line-clamp-2">
                        La última temporada de lluvias ha causado una erosión severa en esta sección del río.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-[#434546]">Comunidad Las Flores, Izabal</p>
                        <p className="text-xs text-[#434546]">05/04/2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link href="/src/app/(with-sidebar)/reportes/mis-reportes">
                    <Button variant="outline" className="text-[#2ba4e0] border-[#2ba4e0] hover:bg-[#2ba4e0]/10">
                      Ver todos los reportes <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
