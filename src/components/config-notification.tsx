"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useConfig } from "@/contexts/config-context"

export function ConfigNotification() {
  const { config } = useConfig()

  // Mostrar notificación cuando cambia la configuración
  useEffect(() => {
    const handleConfigChange = () => {
      // Solo mostrar en cambios después de la carga inicial
      if (typeof window !== "undefined" && localStorage.getItem("config-loaded") === "true") {
        toast.success("Configuración aplicada", {
          description: "Los cambios se han aplicado correctamente",
          duration: 3000,
        })
      } else if (typeof window !== "undefined") {
        localStorage.setItem("config-loaded", "true")
      }
    }

    handleConfigChange()
  }, [config])

  return null
}
