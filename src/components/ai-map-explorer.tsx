"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Loader2, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import L from "leaflet"
import type { Map, TileLayer } from "leaflet"

// Ejemplos de prompts sugeridos para el usuario
const PROMPT_SUGGESTIONS = [
  "Muestra áreas con alta contaminación plástica",
  "Visualiza la calidad del agua en la cuenca del Motagua",
  "Identifica puntos críticos de deforestación cerca del río",
  "Muestra comunidades afectadas por inundaciones recientes",
  "Visualiza la biodiversidad acuática en el río",
]

// Interfaz para el token
interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
  token_type: string
  "not-before-policy": number
  session_state: string
  scope: string
}

// Extender la interfaz WMSOptions para incluir evalscript
declare module 'leaflet' {
  interface WMSOptions {
    evalscript?: string;
    time?: string;
    token?: string;
    maxcc?: number;
  }
}

// Clase para gestionar tokens
class TokenManager {
  private tokenResponse: TokenResponse
  private accessToken: string
  private refreshToken: string
  private expiresIn: number
  private refreshExpiresIn: number
  private issuedAt: number
  private tokenUrl: string
  private clientId: string
  private refreshInterval: NodeJS.Timeout | null

  constructor(initialTokenResponse: TokenResponse) {
    this.tokenResponse = initialTokenResponse
    this.accessToken = initialTokenResponse.access_token
    this.refreshToken = initialTokenResponse.refresh_token
    this.expiresIn = initialTokenResponse.expires_in * 1000
    this.refreshExpiresIn = initialTokenResponse.refresh_expires_in * 1000
    this.issuedAt = Date.now()
    this.tokenUrl = 'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token'
    this.clientId = 'cdse-public'
    this.refreshInterval = null
  }

  getAccessToken(): string {
    return this.accessToken
  }

  isAccessTokenExpiring(): boolean {
    const now = Date.now()
    const timeElapsed = now - this.issuedAt
    const bufferTime = 30 * 1000
    return timeElapsed >= (this.expiresIn - bufferTime)
  }

  isRefreshTokenExpired(): boolean {
    const now = Date.now()
    const timeElapsed = now - this.issuedAt
    return timeElapsed >= this.refreshExpiresIn
  }

  async refreshAccessToken(): Promise<string> {
    if (this.isRefreshTokenExpired()) {
      throw new Error('El refresh_token ha expirado. Por favor, autentícate nuevamente.')
    }

    try {
      const response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'client_id': this.clientId,
          'grant_type': 'refresh_token',
          'refresh_token': this.refreshToken
        })
      })

      if (!response.ok) {
        throw new Error(`Error al refrescar el token: ${response.statusText}`)
      }

      const newTokenResponse: TokenResponse = await response.json()
      this.tokenResponse = newTokenResponse
      this.accessToken = newTokenResponse.access_token
      this.refreshToken = newTokenResponse.refresh_token
      this.expiresIn = newTokenResponse.expires_in * 1000
      this.refreshExpiresIn = newTokenResponse.refresh_expires_in * 1000
      this.issuedAt = Date.now()

      console.log('Token refrescado exitosamente')
      return this.accessToken
    } catch (error) {
      console.error('Error al refrescar el token:', error)
      throw error
    }
  }

  startAutoRefresh(updateLayers: () => void): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }

    this.refreshInterval = setInterval(async () => {
      if (this.isAccessTokenExpiring()) {
        try {
          await this.refreshAccessToken()
          updateLayers()
        } catch (error) {
          console.error('No se pudo refrescar el token:', error)
          clearInterval(this.refreshInterval!)
          toast.error('Sesión expirada. Por favor, autentícate nuevamente.')
        }
      }
    }, 60 * 1000)
  }

  stopAutoRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
      this.refreshInterval = null
    }
  }
}

export default function AIMapPreview() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState<string | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const trueColorLayerRef = useRef<TileLayer.WMS | null>(null)
  const waterQualityLayerRef = useRef<TileLayer.WMS | null>(null)
  const tokenManagerRef = useRef<TokenManager | null>(null)
  const baseLayerRef = useRef<L.TileLayer | null>(null)

  // Token inicial
  const initialToken: TokenResponse = {
    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYVUh3VWZKaHVDVWo0X3k4ZF8xM0hxWXBYMFdwdDd2anhob2FPLUxzREZFIn0.eyJleHAiOjE3NDcwNzMwMDMsImlhdCI6MTc0NzA3MjQwMywianRpIjoiMTAyMTY5NjItY2RkNC00YzI2LTlkOTUtZDlhMDA3ZWE3NDdiIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5kYXRhc3BhY2UuY29wZXJuaWN1cy5ldS9hdXRoL3JlYWxtcy9DRFNFIiwiYXVkIjpbIkNMT1VERkVSUk9fUFVCTElDIiwiYWNjb3VudCJdLCJzdWIiOiIxY2M5Yzc2Mi1kMGQ1LTRjZTUtYWJjMy0yNmU5MTI0MGI1NjgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjZHNlLXB1YmxpYyIsInNlc3Npb25fc3RhdGUiOiI0M2Y2MjY0Ni0xYTRiLTQ2ZDMtOWZmZS03NTJlOGU0YmU2NTEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCIsIioiLCJodHRwczovL3dvcmtzcGFjZS5zdGFnaW5nLWNkc2UtZGF0YS1leHBsb3Jlci5hcHBzLnN0YWdpbmcuaW50cmEuY2xvdWRmZXJyby5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWNkYXMiLCJjb3Blcm5pY3VzLWdlbmVyYWwiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6IkFVRElFTkNFX1BVQkxJQyBvcGVuaWQgZW1haWwgcHJvZmlsZSBvbmRlbWFuZF9wcm9jZXNzaW5nIHVzZXItY29udGV4dCIsInNpZCI6IjQzZjYyNjQ2LTFhNGItNDZkMy05ZmZlLTc1MmU4ZTRiZTY1MSIsImdyb3VwX21lbWJlcnNoaXAiOlsiL2FjY2Vzc19ncm91cHMvdXNlcl90eXBvbG9neS9jb3Blcm5pY3VzX2dlnmVyYWwiLCIvb3JnYW5pemF0aW9ucy9kZWZhdWx0LTFjYzljNzYyLWQwZDUtNGNlNS1hYmMzLTI2ZTkxMjQwYjU2OC9yZWd1bGFyX3VzZXIiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJQYWJsbyBWw6FzcXVleiIsIm9yZ2FuaXphdGlvbnMiOlsiZGVmYXVsdC0xY2M5Yzc2Mi1kMGQ1LTRjZTUtYWJjMy0yNmU5MTI0MGI1NjgiXSwidXNlcl9jb250ZXh0X2lkIjoiOGM1MGQ0YWUtNDVkOC00MzZkLWFjMTUtMDUwNTRkNjhlYThmIiwiY29udGV4dF9yb2xlcyI6e30sImNvbnRleHRfZ3JvdXBzIjpbIi9hY2Nlc3NfZ3JvdXBzL3VzZXJfdHlwb2xvZ3kvY29wZXJuaWN1c19nZW5lcmFsLyIsIi9vcmdhbml6YXRpb25zL2RlZmF1bHQtMWNjOWM3NjItZDBkNS00Y2U1LWFiYzMtMjZlOTEyNDBiNTY4L3JlZ3VsYXJfdXNlci8iXSwicHJlZmVycmVkX3VzZXJuYW1lIjoicHZhc3F1ZXpzMDQ0QGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJQYWJsbyIsImZhbWlseV9uYW1lIjoiVsOhc3F1ZXoiLCJ1c2VyX2NvbnRleHQiOiJkZWZhdWx0LTFjYzljNzYyLWQwZDUtNGNlNS1hYmMzLTI2ZTkxMjQwYjU2OCIsImVtYWlsIjoicHZhc3F1ZXpzMDQ0QGdtYWlsLmCvbSJ9.Co1PIqYEvYyJbiDuFjrFsKE_1YsFRidMTOhnvalkROirU9M6uyhIH5fYaqba7Tp-Z93k8tPLi6mm2y9YNzeA9Z0QjjkQDe6oLJA32VgYrSY-Wt8R8lyjqrfd2DyvKwXYAsAH6gMstzvQPXXON5ZYtUTf732FZAx1utneFez4OQ9JJsLQdkbuDsZW8QINq20O0GiqSLSoeq4rgyvrxL-w78qd7UUgtXNcZuahZiq5-HloCx5cvycqCMdLc8-46K7cVPZPIR1ZxY03jUcQP5S9M7aUPvTTts4azwlpeZ_eP8LIEDg8BA3_cr2OwI2Y2GHU3CxktNCt-l3mf3K9Hg8tIA",
    expires_in: 600,
    refresh_expires_in: 3600,
    refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhZmFlZTU2Zi1iNWZiLTRiMzMtODRlYS0zMWY2NzMyMzNhNzgifQ.eyJleHAiOjE3NDcwNzYwMDMsImlhdCI6MTc0NzA3MjQwMywianRpIjoiY2RmNTI1MzYtZDZiMi00NGYyLWFhN2YtMjk0M2MxOTJjOWZkIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5kYXRhc3BhY2UuY29wZXJuaWN1cy5ldS9hdXRoL3JlYWxtcy9DRFNFIiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eS5kYXRhc3BhY2UuY29wZXJuaWN1cy5ldS9hdXRoL3JlYWxtcy9DRFNFIiwic3ViIjoiMWNjOWM3NjItZDBkNS00Y2U1LWFiYzMtMjZlOTEyNDBiNTY4IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImNkc2UtcHVibGljIiwic2Vzc2lvbl9zdGF0ZSI6IjQzZjYyNjQ2LTFhNGItNDZkMy05ZmZlLTc1MmU4ZTRiZTY1MSIsInNjb3BlIjoiQVVESUVOQ0VfUFVCTElDIG9wZW5pZCBlbWFpbCBwcm9maWxlIG9uZGVtYW5kX3Byb2Nlc3NpbmcgdXNlci1jb250ZXh0Iiwic2lkIjoiNDNmNjI2NDYtMWE0Yi00NmQzLTlmZmUtNzUyZThlNGJlNjUxIn0.L_bhw5KEmBBrt1QO9vZchdIEHDul9h9WXwOXLlSJEiI",
    token_type: "Bearer",
    "not-before-policy": 0,
    session_state: "43f62646-1a4b-46d3-9ffe-752e8e4be651",
    scope: "AUDIENCE_PUBLIC openid email profile ondemand_processing user-context"
  }

  // Configuración de Sentinel Hub
  const instanceId = 'YOUR_INSTANCE_ID' // Reemplaza con tu INSTANCE_ID
  const baseWmsUrl = `https://sh.dataspace.copernicus.eu/ogc/wms/${instanceId}`

  // Evalscripts
  const trueColorEvalscript = `//VERSION=3
function setup() {
    return {
        input: [{bands: ["B04", "B03", "B02"]}],
        output: {bands: 3}
    };
}
function evaluatePixel(sample) {
    return [sample.B04 * 2.5, sample.B03 * 2.5, sample.B02 * 2.5];
}`
  const waterQualityEvalscript = `//VERSION=3
function setup() {
    return {
        input: [{bands: ["B04", "B08"]}],
        output: {bands: 3}
    };
}
function evaluatePixel(sample) {
    let ndci = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
    let r, g, b;
    if (ndci < 0) { r = 0; g = 0; b = 1; }
    else if (ndci < 0.3) { r = 0; g = 1; b = 0; }
    else { r = 1; g = 0; b = 0; }
    return [r, g, b];
}`

  // Crear capas WMS
  const createLayers = (): void => {
    trueColorLayerRef.current = L.tileLayer.wms(baseWmsUrl, {
      layers: 'TRUE_COLOR',
      format: 'image/png',
      transparent: true,
      styles: '',
      evalscript: encodeURIComponent(trueColorEvalscript),
      time: '2025-05-01/2025-05-12',
      token: tokenManagerRef.current?.getAccessToken(),
      maxcc: 20
    })

    waterQualityLayerRef.current = L.tileLayer.wms(baseWmsUrl, {
      layers: 'WATER_QUALITY',
      format: 'image/png',
      transparent: true,
      styles: '',
      evalscript: encodeURIComponent(waterQualityEvalscript),
      time: '2025-05-01/2025-05-12',
      token: tokenManagerRef.current?.getAccessToken(),
      maxcc: 20
    })
  }

  // Inicializar Leaflet y el mapa
  useEffect(() => {
    // Cargar estilos de Leaflet
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Cargar Leaflet.js
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => {
      if (mapContainerRef.current && !mapRef.current) {
        // Inicializar el mapa
        mapRef.current = L.map(mapContainerRef.current, {
          center: [14.7, -89.2], // Centro en la cuenca del Motagua
          zoom: 10
        })

        // Añadir capa base de OpenStreetMap
        baseLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef.current)

        // Inicializar TokenManager
        tokenManagerRef.current = new TokenManager(initialToken)
        tokenManagerRef.current.startAutoRefresh(() => updateMapLayers())

        // Crear capas WMS
        createLayers()
        trueColorLayerRef.current?.addTo(mapRef.current)

        // Añadir selector de capas
        const layerSelect = document.createElement('select')
        layerSelect.className = 'absolute top-2 right-2 z-[1000] p-2 border rounded bg-white'
        layerSelect.innerHTML = `
          <option value="trueColor">True Color</option>
          <option value="waterQuality">Water Quality</option>
        `
        mapContainerRef.current!.appendChild(layerSelect)

        layerSelect.addEventListener('change', (e: Event) => {
          const target = e.target as HTMLSelectElement
          updateMapLayers(target.value as 'trueColor' | 'waterQuality')
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      tokenManagerRef.current?.stopAutoRefresh()
      link.remove()
      script.remove()
    }
  }, [initialToken]) // Añadimos initialToken a las dependencias

  // Actualizar capas
  function updateMapLayers(layer: 'trueColor' | 'waterQuality' = (document.querySelector('select') as HTMLSelectElement)?.value as 'trueColor' | 'waterQuality' || 'trueColor'): void {
    if (!mapRef.current) return

    // Eliminar las capas temáticas pero mantener la capa base
    mapRef.current.eachLayer(l => {
      if (l !== baseLayerRef.current) {
        mapRef.current!.removeLayer(l)
      }
    })

    // Añadir la capa base si no está presente
    if (!mapRef.current.hasLayer(baseLayerRef.current!)) {
      baseLayerRef.current!.addTo(mapRef.current)
    }

    // Añadir la capa temática seleccionada
    if (layer === 'trueColor') {
      trueColorLayerRef.current!.addTo(mapRef.current!)
    } else {
      waterQualityLayerRef.current!.addTo(mapRef.current!)
    }
  }

  // Procesar el prompt
  const processPrompt = async (text: string) => {
    if (!text.trim()) return

    setIsLoading(true)
    setActiveView(text)

    try {
      // Enviar prompt a Azure Analytics
      const response = await fetch('YOUR_AZURE_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AZURE_TOKEN'
        },
        body: JSON.stringify({ prompt: text })
      })

      if (!response.ok) {
        throw new Error('Error al procesar el prompt')
      }

      const result = await response.json()
      const { lat, lon, layer } = result // Ejemplo: { lat: 14.7, lon: -89.2, layer: 'waterQuality' }

      // Actualizar el mapa
      if (mapRef.current) {
        mapRef.current.setView([lat, lon], 10)
        updateMapLayers(layer)
        const select = document.querySelector('select') as HTMLSelectElement
        if (select) select.value = layer
      }

      toast.success("Visualización generada", {
        description: `Se ha generado la visualización para: "${text}"`,
      })
    } catch (error) {
      console.error('Error al procesar el prompt:', error)
      toast.error("Error al generar la visualización", {
        description: "No se pudo procesar el prompt. Revisa la consola para más detalles.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Barra de búsqueda con IA */}
      <div className="relative mb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe lo que quieres ver en el mapa..."
              className="pl-10 pr-16 py-6 text-base border-2 border-[#2ba4e0] focus-visible:ring-[#2ba4e0]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  processPrompt(prompt)
                }
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2ba4e0]" />
            {isLoading ? (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2ba4e0] animate-spin" />
            ) : (
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2ba4e0]" />
            )}
          </div>
          <Button
            onClick={() => processPrompt(prompt)}
            disabled={isLoading || !prompt.trim()}
            className="bg-[#2ba4e0] hover:bg-[#418fb6] h-12"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="ml-2 hidden sm:inline">Generar</span>
          </Button>
        </div>

        {/* Sugerencias de prompts */}
        <div className="flex flex-wrap gap-2 mt-2">
          {PROMPT_SUGGESTIONS.map((suggestion, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-[#2ba4e0]/10 border-[#2ba4e0] text-[#2ba4e0]"
              onClick={() => {
                setPrompt(suggestion)
                processPrompt(suggestion)
              }}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contenedor del mapa */}
      <div className="flex-1 relative border-2 border-dashed border-[#2ba4e0]/30 rounded-lg overflow-hidden bg-[#f5f5f5] h-[calc(100%-5rem)]">
        <div ref={mapContainerRef} className="absolute inset-0">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#2ba4e0] mx-auto mb-4" />
              <p className="text-[#2ba4e0] font-medium">Generando visualización...</p>
              <p className="text-sm text-[#434546] mt-2">Procesando datos y creando mapa</p>
            </div>
          ) : activeView ? (
            <></> // El mapa se muestra aquí
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center p-6">
              <MapPin className="h-10 w-10 text-[#2ba4e0]/50 mx-auto mb-4" />
              <p className="text-[#2ba4e0] font-medium">Exploración de Mapa</p>
              <p className="text-sm text-[#434546] mt-2">
                Describe lo que quieres ver en el mapa usando el campo de texto superior
              </p>
            </div>
          )}
        </div>

        {/* Información mínima de la vista actual */}
        {activeView && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 border-t border-[#2ba4e0]/20">
            <p className="text-xs text-[#434546]">
              <span className="font-medium text-[#2ba4e0]">Vista actual:</span> {activeView}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}