"use client"

import { useState, useRef } from "react"
import { Search, MapPin, Layers, Loader2, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Ejemplos de prompts sugeridos para el usuario
const PROMPT_SUGGESTIONS = [
  "Muestra áreas con alta contaminación plástica",
  "Visualiza la calidad del agua en la cuenca del Motagua",
  "Identifica puntos críticos de deforestación cerca del río",
  "Muestra comunidades afectadas por inundaciones recientes",
  "Visualiza la biodiversidad acuática en el río",
]

export default function AIMapExplorer() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState<string | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Función para procesar el prompt (simulada)
  const processPrompt = (text: string) => {
    if (!text.trim()) return

    setIsLoading(true)

    // Simular procesamiento de IA
    setTimeout(() => {
      setIsLoading(false)
      setActiveView(text)

      toast.success("Visualización generada", {
        description: `Se ha generado la visualización para: "${text}"`,
      })
    }, 2000)
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

      {/* Contenedor del mapa - ahora ocupa todo el espacio disponible */}
      <div className="flex-1 relative border-2 border-dashed border-[#2ba4e0]/30 rounded-lg overflow-hidden bg-[#f5f5f5] h-[calc(100%-5rem)]">
        {/* Placeholder para el mapa */}
        <div ref={mapContainerRef} className="absolute inset-0 flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#2ba4e0] mx-auto mb-4" />
              <p className="text-[#2ba4e0] font-medium">Generando visualización...</p>
              <p className="text-sm text-[#434546] mt-2">Procesando datos y creando mapa</p>
            </div>
          ) : activeView ? (
            <div className="text-center p-6">
              <MapPin className="h-10 w-10 text-[#2ba4e0] mx-auto mb-4" />
              <p className="text-[#2ba4e0] font-medium">Visualización generada</p>
              <p className="text-sm text-[#434546] mt-2 max-w-md">
                Aquí se mostrará el mapa basado en: &quot;{activeView}&quot;
              </p>
              <p className="text-xs text-[#434546] mt-4 italic">Implementa tu mapa interactivo en este contenedor</p>
            </div>
          ) : (
            <div className="text-center p-6">
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
