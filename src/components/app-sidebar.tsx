"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Home, Map, FileText, ClipboardList, ShieldAlert, LogOut, User, Settings } from "lucide-react"
import { colors } from "@/lib/colors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  // Verificar si estamos en la página de inicio (landing)
  if (pathname === "/") {
    return null
  }

  return (
    <Sidebar className="border-r border-gray-200 min-h-screen w-64">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-[#2ba4e0] to-[#418fb6] p-1">
              <BarChart2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#282f33]">WaterWay+</span>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/reportes/mapa"}>
              <Link href="/src/app/(with-sidebar)/reportes/mapa">
                <Map className="mr-2 h-5 w-5" />
                <span>Mapa de reportes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/reportes/crear"}>
              <Link href="/src/app/(with-sidebar)/reportes/crear">
                <FileText className="mr-2 h-5 w-5" />
                <span>Crear reporte</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/reportes/mis-reportes"}>
              <Link href="/src/app/(with-sidebar)/reportes/mis-reportes">
                <ClipboardList className="mr-2 h-5 w-5" />
                <span>Mis reportes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/moderacion")}>
              <Link href="/src/app/(with-sidebar)/moderacion/reportes">
                <ShieldAlert className="mr-2 h-5 w-5" />
                <span>Moderación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Usuario" />
              <AvatarFallback style={{ backgroundColor: colors.primary }}>CM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Carlos Méndez</p>
              <p className="text-xs text-gray-500">Usuario</p>
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/perfil">
                  <User className="mr-2 h-5 w-5" />
                  <span>Mi perfil</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/configuracion">
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Configuración</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/logout">
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Cerrar sesión</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
