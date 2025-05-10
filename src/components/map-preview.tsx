"use client"

import { useEffect, useState } from "react"

export default function MapPreview() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-[#434546]">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Placeholder for the interactive map */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1200')" }}
      />

      {/* Overlay with map controls and info */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#282f33]/80 to-transparent flex flex-col justify-end p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-[#282f33] mb-2">Cuenca del Río Motagua</h3>
          <div className="flex justify-between text-sm text-[#434546]">
            <div>
              <p>
                Nivel de contaminación: <span className="text-red-500 font-medium">Alto</span>
              </p>
              <p>Última actualización: 24 horas atrás</p>
            </div>
            <div>
              <p>
                Alertas activas: <span className="text-amber-500 font-medium">3</span>
              </p>
              <p>
                Puntos críticos: <span className="text-red-500 font-medium">7</span>
              </p>
            </div>
          </div>
        </div>

        {/* Map legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs text-[#434546] space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Calidad óptima</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Calidad media</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Contaminación alta</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>Punto de muestreo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
