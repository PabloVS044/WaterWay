"use client"

import { useState } from "react"
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Coordenadas {
  lat: number
  lng: number
}

interface Reporte {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  fecha: string
  ubicacion: string
  coordenadas?: Coordenadas
  estado: string
  resuelto: boolean
  imagenes?: string[]
  usuario: {
    id: string
    nombre: string
    avatar: string
    rol: string
  }
}

interface MapaReportesProps {
  reportes: Reporte[]
  center?: Coordenadas
  zoom?: number
  height?: string
}

const tiposReporte = [
  { id: "basura", nombre: "Contaminación por basura", color: "#ef4444" },
  { id: "plasticos", nombre: "Acumulación de plásticos", color: "#f97316" },
  { id: "quimicos", nombre: "Contaminación química", color: "#8b5cf6" },
  { id: "algas", nombre: "Proliferación de algas", color: "#22c55e" },
  { id: "peces", nombre: "Mortandad de peces", color: "#3b82f6" },
  { id: "deforestacion", nombre: "Deforestación en ribera", color: "#a16207" },
  { id: "erosion", nombre: "Erosión de orillas", color: "#a1a1aa" },
  { id: "infraestructura", nombre: "Daños en infraestructura", color: "#0f766e" },
  { id: "otro", nombre: "Otro problema", color: "#6b7280" },
]

export default function MapaReportes({ reportes, center = { lat: 15.4842, lng: -89.1425 }, zoom = 10, height = "600px" }: MapaReportesProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null)

  if (loadError) return <p>Error cargando el mapa</p>
  if (!isLoaded) return <p>Cargando mapa...</p>

  return (
    <div className="relative w-full" style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height }}
        center={center}
        zoom={zoom}
        mapTypeId="hybrid" // Puedes cambiar a 'roadmap' o 'terrain'
      >
        {reportes.map((reporte) => {
          if (!reporte.coordenadas) return null
          const tipo = tiposReporte.find((t) => t.id === reporte.tipo)

          return (
            <Marker
              key={reporte.id}
              position={reporte.coordenadas}
              onClick={() => setSelectedReporte(reporte)}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          )
        })}

        {selectedReporte && (
          <InfoWindow
            position={selectedReporte.coordenadas}
            onCloseClick={() => setSelectedReporte(null)}
          >
            <div className="p-2 w-64">
              <h3 className="font-semibold mb-1">{selectedReporte.titulo}</h3>
              <p className="text-sm mb-1">{selectedReporte.descripcion}</p>
              <p className="text-xs text-gray-500 mb-2">{selectedReporte.ubicacion}</p>
              {selectedReporte.imagenes?.[0] && (
                <img src={selectedReporte.imagenes[0]} alt="Imagen" className="mb-2 w-full h-20 object-cover rounded" />
              )}
              <Link href={`/reportes/${selectedReporte.id}`}>
                <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">Ver detalles</Button>
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
