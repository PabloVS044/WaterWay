"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"

// Definir la estructura de la configuración
export interface ConfigState {
  interface: {
    mostrarMapa: boolean
    mostrarReportes: boolean
    mostrarEstadisticas: boolean
    mostrarTestimonios: boolean
    temaOscuro: boolean
  }
  notificaciones: {
    notificacionesEmail: boolean
    notificacionesPush: boolean
    alertasNuevosReportes: boolean
    alertasComentarios: boolean
    alertasActualizaciones: boolean
  }
  privacidad: {
    perfilPublico: boolean
    mostrarUbicacion: boolean
    compartirEstadisticas: boolean
    idioma: string
    formatoFecha: string
  }
}

// Valores por defecto
const defaultConfig: ConfigState = {
  interface: {
    mostrarMapa: true,
    mostrarReportes: true,
    mostrarEstadisticas: true,
    mostrarTestimonios: true,
    temaOscuro: false,
  },
  notificaciones: {
    notificacionesEmail: true,
    notificacionesPush: true,
    alertasNuevosReportes: true,
    alertasComentarios: true,
    alertasActualizaciones: true,
  },
  privacidad: {
    perfilPublico: true,
    mostrarUbicacion: false,
    compartirEstadisticas: true,
    idioma: "es",
    formatoFecha: "dd/mm/yyyy",
  },
}

// Definir el tipo del contexto
interface ConfigContextType {
  config: ConfigState
  updateInterfaceConfig: (key: keyof ConfigState["interface"], value: boolean) => void
  updateNotificacionesConfig: (key: keyof ConfigState["notificaciones"], value: boolean) => void
  updatePrivacidadConfig: (key: keyof ConfigState["privacidad"], value: any) => void
  saveAllConfig: () => void
}

// Crear el contexto
const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useConfig() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error("useConfig debe ser usado dentro de un ConfigProvider")
  }
  return context
}

// Proveedor del contexto
export function ConfigProvider({ children }: { children: ReactNode }) {
  // Estado para la configuración
  const [config, setConfig] = useState<ConfigState>(defaultConfig)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar configuración guardada al iniciar
  useEffect(() => {
    const loadConfig = () => {
      try {
        const savedConfig = localStorage.getItem("waterway-config")
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig))
        }
      } catch (error) {
        console.error("Error al cargar la configuración:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      loadConfig()
    } else {
      setIsLoaded(true)
    }
  }, [])

  // Guardar configuración cuando cambie
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("waterway-config", JSON.stringify(config))
    }
  }, [config, isLoaded])

  // Aplicar tema oscuro cuando cambie
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      if (config.interface.temaOscuro) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [config.interface.temaOscuro, isLoaded])

  // Funciones para actualizar la configuración
  const updateInterfaceConfig = (key: keyof ConfigState["interface"], value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      interface: {
        ...prev.interface,
        [key]: value,
      },
    }))
  }

  const updateNotificacionesConfig = (key: keyof ConfigState["notificaciones"], value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      notificaciones: {
        ...prev.notificaciones,
        [key]: value,
      },
    }))
  }

  const updatePrivacidadConfig = (key: keyof ConfigState["privacidad"], value: any) => {
    setConfig((prev) => ({
      ...prev,
      privacidad: {
        ...prev.privacidad,
        [key]: value,
      },
    }))
  }

  // Función para guardar toda la configuración (simulando envío al servidor)
  const saveAllConfig = () => {
    // Aquí iría la lógica para guardar en el servidor
    toast.success("Configuración guardada correctamente", {
      description: "Tus preferencias han sido actualizadas",
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateInterfaceConfig,
        updateNotificacionesConfig,
        updatePrivacidadConfig,
        saveAllConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
