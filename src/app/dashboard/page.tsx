'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MapIcon,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Plus,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

// Definición de interfaces para props
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface ReporteItemProps {
  title: string;
  location: string;
  date: string;
  status: string;
  severity: string;
}

interface PublicacionItemProps {
  title: string;
  author: string;
  date: string;
  comments: number;
  likes: number;
}

interface EventoItemProps {
  title: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  status: string;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] relative">
  {/* Overlay para móvil */}
  <div
    className={`fixed inset-0 z-40 bg-black/80 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
    onClick={() => setSidebarOpen(false)}
  />

  {/* Sidebar */}
  <div className='sticky lg:static z-50'>
  <aside
    className={`fixed  top-0 left-0 z-50 h-screen w-64 bg-[#282f33] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    {/* Header de la Sidebar */}
    <div className="flex items-center justify-between h-16 px-4 border-b border-[#435761]">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-white">WaterWay+</span>
      </div>
      <button className="text-white lg:hidden" onClick={() => setSidebarOpen(false)}>
        <X className="h-5 w-5" />
      </button>
    </div>

    {/* Contenido de la Sidebar */}
    <div className="px-2 py-4 overflow-y-auto h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-1">
        <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Panel Principal" href="/dashboard" active />
        <SidebarItem icon={<MapIcon className="h-5 w-5" />} label="Mapas" href="/dashboard/mapas" />
        <SidebarItem icon={<AlertTriangle className="h-5 w-5" />} label="Reportes" href="/dashboard/reportes" badge="3" />
        <SidebarItem icon={<FileText className="h-5 w-5" />} label="Publicaciones" href="/dashboard/publicaciones" />
        <SidebarItem icon={<Calendar className="h-5 w-5" />} label="Eventos" href="/dashboard/eventos" badge="2" />
        <SidebarItem icon={<Users className="h-5 w-5" />} label="Comunidad" href="/dashboard/comunidad" />
        <SidebarItem icon={<Settings className="h-5 w-5" />} label="Configuración" href="/dashboard/configuracion" />
      </div>
    </div>

    {/* Footer de la Sidebar */}
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#435761]">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback className="bg-[#418fb6] text-white">JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">Juan Pérez</span>
          <span className="text-xs text-white/60">Usuario</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto text-white/60 hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </aside>
</div>


      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b bg-white flex items-center px-4">
          <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-[#434546]" />
          </button>

          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#434546]/60" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-md border border-[#435761]/20 bg-white px-9 py-2 text-sm outline-none focus:border-[#2ba4e0] focus:ring-1 focus:ring-[#2ba4e0]"
              />
              <Filter className="absolute right-2.5 top-2.5 h-4 w-4 text-[#434546]/60" />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-[#434546]" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <NotificationItem
                    title="Nuevo reporte de contaminación"
                    description="Se ha reportado una nueva fuente de contaminación cerca de tu área."
                    time="Hace 5 minutos"
                    unread
                  />
                  <NotificationItem
                    title="Evento próximo"
                    description="Recordatorio: El evento 'Limpieza de Riberas' comienza mañana a las 9:00 AM."
                    time="Hace 2 horas"
                    unread
                  />
                  <NotificationItem
                    title="Nueva publicación"
                    description="María González ha publicado un nuevo artículo sobre la calidad del agua."
                    time="Ayer"
                  />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-[#2ba4e0]">
                  Ver todas las notificaciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback className="bg-[#418fb6] text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Contenido del dashboard */}
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-6">
            {/* Título de la página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#282f33]">Panel Principal</h1>
                <p className="text-sm text-[#434546]">
                  Bienvenido de nuevo, Juan. Aquí tienes un resumen de la actividad reciente.
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Acción
                </Button>
              </div>
            </div>

            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard
                title="Reportes Activos"
                value="24"
                description="+4 esta semana"
                icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                trend="up"
              />
              <SummaryCard
                title="Eventos Próximos"
                value="8"
                description="2 esta semana"
                icon={<Calendar className="h-5 w-5 text-green-500" />}
                trend="up"
              />
              <SummaryCard
                title="Publicaciones"
                value="156"
                description="+12 este mes"
                icon={<FileText className="h-5 w-5 text-blue-500" />}
                trend="up"
              />
              <SummaryCard
                title="Usuarios Activos"
                value="1,245"
                description="+85 este mes"
                icon={<Users className="h-5 w-5 text-purple-500" />}
                trend="up"
              />
            </div>

            {/* Pestañas de funcionalidades */}
            <Tabs defaultValue="reportes" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#435761]">
                <TabsTrigger
                  value="reportes"
                  className="text-white data-[state=active]:bg-[#2ba4e0] data-[state=active]:text-black"
                >
                  Reportes
                </TabsTrigger>
                <TabsTrigger
                  value="publicaciones"
                  className="text-white  data-[state=active]:bg-[#2ba4e0] data-[state=active]:text-black"
                >
                  Publicaciones
                </TabsTrigger>
                <TabsTrigger
                  value="eventos"
                  className="text-white data-[state=active]:bg-[#2ba4e0] data-[state=active]:text-black"
                >
                  Eventos
                </TabsTrigger>
                <TabsTrigger value="mapas" className="text-white data-[state=active]:bg-[#2ba4e0] data-[state=active]:text-black">
                  Mapas
                </TabsTrigger>
              </TabsList>

              {/* Contenido de Reportes */}
              <TabsContent value="reportes" className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Reportes Recientes</CardTitle>
                      <Button variant="outline" size="sm" className="text-[#2ba4e0] border-[#2ba4e0]">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Reporte
                      </Button>
                    </div>
                    <CardDescription>Reportes de fuentes de contaminación creados recientemente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ReporteItem
                        title="Vertido de residuos industriales"
                        location="Río Motagua, Sector Norte"
                        date="12 mayo, 2025"
                        status="Pendiente"
                        severity="Alta"
                      />
                      <ReporteItem
                        title="Acumulación de plásticos"
                        location="Afluente Este, Zona 3"
                        date="10 mayo, 2025"
                        status="En revisión"
                        severity="Media"
                      />
                      <ReporteItem
                        title="Contaminación por agroquímicos"
                        location="Sector agrícola, Zona 5"
                        date="8 mayo, 2025"
                        status="Verificado"
                        severity="Alta"
                      />
                      <ReporteItem
                        title="Residuos sólidos urbanos"
                        location="Puente Central, Km 34"
                        date="5 mayo, 2025"
                        status="Resuelto"
                        severity="Baja"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-[#2ba4e0]">
                        Ver todos los reportes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contenido de Publicaciones */}
              <TabsContent value="publicaciones" className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Publicaciones Recientes</CardTitle>
                      <Button variant="outline" size="sm" className="text-[#2ba4e0] border-[#2ba4e0]">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Publicación
                      </Button>
                    </div>
                    <CardDescription>Artículos y noticias sobre el Río Motagua y sus afluentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <PublicacionItem
                        title="Impacto de los microplásticos en la fauna acuática del Río Motagua"
                        author="Dr. Carlos Mendoza"
                        date="11 mayo, 2025"
                        comments={8}
                        likes={24}
                      />
                      <PublicacionItem
                        title="Resultados del último monitoreo de calidad del agua"
                        author="Equipo de Investigación WaterWay"
                        date="9 mayo, 2025"
                        comments={12}
                        likes={36}
                      />
                      <PublicacionItem
                        title="Iniciativas comunitarias para la limpieza de riberas"
                        author="María González"
                        date="7 mayo, 2025"
                        comments={5}
                        likes={18}
                      />
                      <PublicacionItem
                        title="Análisis de datos satelitales: Tendencias de contaminación 2024-2025"
                        author="Ing. Roberto Juárez"
                        date="3 mayo, 2025"
                        comments={15}
                        likes={42}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-[#2ba4e0]">
                        Ver todas las publicaciones
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contenido de Eventos */}
              <TabsContent value="eventos" className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Eventos Próximos</CardTitle>
                      <Button variant="outline" size="sm" className="text-[#2ba4e0] border-[#2ba4e0]">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Evento
                      </Button>
                    </div>
                    <CardDescription>Actividades y eventos relacionados con el Río Motagua</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <EventoItem
                        title="Limpieza de Riberas"
                        location="Sector Norte, Punto de encuentro: Puente Central"
                        date="15 mayo, 2025"
                        time="09:00 - 14:00"
                        participants={28}
                        status="Inscripciones abiertas"
                      />
                      <EventoItem
                        title="Taller de Monitoreo de Calidad del Agua"
                        location="Centro Comunitario, Zona 4"
                        date="22 mayo, 2025"
                        time="10:00 - 12:00"
                        participants={15}
                        status="Inscripciones abiertas"
                      />
                      <EventoItem
                        title="Foro Empresarial: Soluciones para la Contaminación Industrial"
                        location="Hotel Riviera, Salón Esmeralda"
                        date="30 mayo, 2025"
                        time="14:00 - 18:00"
                        participants={42}
                        status="Inscripciones abiertas"
                      />
                      <EventoItem
                        title="Jornada de Reforestación de Riberas"
                        location="Afluente Este, Km 45"
                        date="5 junio, 2025"
                        time="08:00 - 13:00"
                        participants={36}
                        status="Próximamente"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-[#2ba4e0]">
                        Ver todos los eventos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contenido de Mapas */}
              <TabsContent value="mapas" className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Visualización de Mapas</CardTitle>
                    <CardDescription>Accede a los diferentes mapas disponibles en la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-[#418fb6]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[#418fb6] flex items-center gap-2">
                            <MapIcon className="h-5 w-5" />
                            Mapa de Reportes
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-[#434546] rounded-md flex items-center justify-center mb-4">
                            <MapIcon className="h-16 w-16 text-[#2ba4e0]/30" />
                          </div>
                          <p className="text-[#434546] mb-4">
                            Visualiza los reportes de contaminación creados por los usuarios de la plataforma.
                          </p>
                          <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">Ver Mapa</Button>
                        </CardContent>
                      </Card>

                      <Card className="border-[#418fb6]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[#418fb6] flex items-center gap-2">
                            <MapIcon className="h-5 w-5" />
                            Mapa de Copernicus
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-[#434546] rounded-md flex items-center justify-center mb-4">
                            <MapIcon className="h-16 w-16 text-[#2ba4e0]/30" />
                          </div>
                          <p className="text-[#434546] mb-4">
                            Accede a datos satelitales de la red Copernicus que muestran la calidad del agua.
                          </p>
                          <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">Ver Mapa</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente de elemento de la barra lateral
function SidebarItem({ icon, label, href, active = false, badge }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active ? 'bg-[#2ba4e0] text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && <Badge className="ml-auto bg-[#418fb6] hover:bg-[#418fb6] text-white">{badge}</Badge>}
    </Link>
  );
}

// Componente de notificación
function NotificationItem({ title, description, time, unread = false }: NotificationItemProps) {
  return (
    <div className={`p-3 ${unread ? 'bg-[#2ba4e0]/5' : ''}`}>
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-medium ${unread ? 'text-[#282f33]' : 'text-[#434546]'}`}>{title}</h4>
            {unread && <span className="h-2 w-2 rounded-full bg-[#2ba4e0]" />}
          </div>
          <p className="text-xs text-[#434546]/80 mt-1">{description}</p>
          <p className="text-xs text-[#434546]/60 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

// Componente de tarjeta de resumen
function SummaryCard({ title, value, description, icon, trend }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-gray-100 p-2">{icon}</div>
          {trend === 'up' && (
            <div className="flex items-center text-green-500 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  clipRule="evenodd"
                />
              </svg>
              12%
            </div>
          )}
          {trend === 'down' && (
            <div className="flex items-center text-red-500 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
              8%
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-[#282f33]">{value}</h3>
          <p className="text-sm text-[#434546] mt-1">{title}</p>
        </div>
        <p className="text-xs text-[#434546]/70 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}

// Componente de reporte
function ReporteItem({ title, location, date, status, severity }: ReporteItemProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-orange-100 text-orange-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en revisión':
        return 'bg-blue-100 text-blue-800';
      case 'verificado':
        return 'bg-purple-100 text-purple-800';
      case 'resuelto':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-lg border-[#418fb6]/10 hover:border-[#418fb6]/30 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-[#282f33]">{title}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
          <p className="text-xs text-[#434546]/80 flex items-center">
            <MapIcon className="h-3 w-3 mr-1" />
            {location}
          </p>
          <p className="text-xs text-[#434546]/80 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Badge className={getSeverityColor(severity)}>{severity}</Badge>
        <Badge className={getStatusColor(status)}>{status}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Componente de publicación
function PublicacionItem({ title, author, date, comments, likes }: PublicacionItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-lg border-[#418fb6]/10 hover:border-[#418fb6]/30 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-[#282f33]">{title}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
          <p className="text-xs text-[#434546]/80 flex items-center">
            <User className="h-3 w-3 mr-1" />
            {author}
          </p>
          <p className="text-xs text-[#434546]/80 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <div className="flex items-center text-[#434546]/80">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="text-xs">{comments}</span>
        </div>
        <div className="flex items-center text-[#434546]/80">
          <Heart className="h-4 w-4 mr-1" />
          <span className="text-xs">{likes}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Componente de evento
const EventoItem: React.FC<EventoItemProps> = ({ title, location, date, time, participants, status }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-lg border-[#418fb6]/10 hover:border-[#418fb6]/30 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-[#282f33]">{title}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
          <p className="text-xs text-[#434546]/80 flex items-center">
            <MapIcon className="h-3 w-3 mr-1" />
            {location}
          </p>
          <p className="text-xs text-[#434546]/80 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}, {time}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <div className="flex items-center text-[#434546]/80">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-xs">{participants}</span>
        </div>
        <Badge className="bg-[#2ba4e0] hover:bg-[#2ba4e0]">{status}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            <DropdownMenuItem>Inscribirse</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Componentes adicionales necesarios
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
