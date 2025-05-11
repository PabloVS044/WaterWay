"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FiHome,
  FiMap,
  FiFileText,
  FiClipboard,
  FiShield,
  FiLogOut,
  FiUser,
  FiSettings,
  FiMenu,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"
import { colors } from "@/lib/colors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
  isActive?: boolean
}

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Verificar si estamos en la página de inicio (landing)
  const isLandingPage = pathname === "/"

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setIsCollapsed(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: FiHome,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Mapa de reportes",
      href: "/reportes/mapa",
      icon: FiMap,
      isActive: pathname === "/reportes/mapa",
    },
    {
      title: "Crear reporte",
      href: "/reportes/crear",
      icon: FiFileText,
      isActive: pathname === "/reportes/crear",
    },
    {
      title: "Mis reportes",
      href: "/reportes/mis-reportes",
      icon: FiClipboard,
      isActive: pathname === "/reportes/mis-reportes",
    },
  ]

  const adminNavItems: NavItem[] = [
    {
      title: "Moderación",
      href: "/moderacion/reportes",
      icon: FiShield,
      isActive: pathname.startsWith("/moderacion"),
    },
  ]

  const userNavItems: NavItem[] = [
    {
      title: "Mi perfil",
      href: "/perfil",
      icon: FiUser,
    },
    {
      title: "Configuración",
      href: "/configuracion",
      icon: FiSettings,
    },
    {
      title: "Cerrar sesión",
      href: "/logout",
      icon: FiLogOut,
    },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Si estamos en la página de inicio, no renderizar el sidebar
  if (isLandingPage) {
    return null
  }

  // Renderizar la versión móvil
  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleMobileSidebar}>
          <FiMenu className="h-5 w-5" />
        </Button>

        {/* Overlay para cerrar el sidebar en móvil */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileSidebar} />}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform md:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-r from-[#2ba4e0] to-[#418fb6] p-1">
                  <FiBarChart2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-[#282f33]">WaterWay+</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                <FiChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
              <nav className="space-y-6">
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      isCollapsed={false}
                      onClick={isMobile ? toggleMobileSidebar : undefined}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    {adminNavItems.map((item) => (
                      <NavItem
                        key={item.href}
                        item={item}
                        isCollapsed={false}
                        onClick={isMobile ? toggleMobileSidebar : undefined}
                      />
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
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
              <div className="space-y-1">
                {userNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isCollapsed={false}
                    onClick={isMobile ? toggleMobileSidebar : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </>
    )
  }

  // Renderizar la versión de escritorio
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-64",
      )}
    >
      <div className={cn("flex items-center p-4 border-b", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-[#2ba4e0] to-[#418fb6] p-1">
              <FiBarChart2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#282f33]">WaterWay+</span>
          </div>
        )}
        {isCollapsed && (
          <div className="rounded-full bg-gradient-to-r from-[#2ba4e0] to-[#418fb6] p-1">
            <FiBarChart2 className="h-6 w-6 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={isCollapsed ? "absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white shadow-sm" : ""}
        >
          {isCollapsed ? <FiChevronRight className="h-3 w-3" /> : <FiChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-6">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-1">
              {adminNavItems.map((item) => (
                <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className={cn("p-4 border-t border-gray-200", isCollapsed && "flex flex-col items-center")}>
        {!isCollapsed ? (
          <>
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
            <div className="space-y-1">
              {userNavItems.map((item) => (
                <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Usuario" />
              <AvatarFallback style={{ backgroundColor: colors.primary }}>CM</AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              {userNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex justify-center text-gray-500 hover:text-[#2ba4e0] transition-colors"
                  title={item.title}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

interface NavItemProps {
  item: NavItem
  isCollapsed: boolean
  onClick?: () => void
}

function NavItem({ item, isCollapsed, onClick }: NavItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center py-2 px-3 rounded-md transition-colors",
        item.isActive ? "bg-[#2ba4e0]/10 text-[#2ba4e0]" : "text-gray-700 hover:bg-gray-100",
        isCollapsed && "justify-center px-2",
      )}
    >
      <item.icon className={cn("h-5 w-5", item.isActive ? "text-[#2ba4e0]" : "text-gray-500")} />
      {!isCollapsed && <span className="ml-3">{item.title}</span>}
    </Link>
  )
}
