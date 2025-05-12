"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Camera, MapPin, Upload, X, Loader2 } from "lucide-react"
import MapSelector from "@/components/map-selector"
import { images } from "next/dist/build/webpack/config/blocks/images";

const tiposReporte = [
  { id: "basura", nombre: "Contaminación por basura" },
  { id: "plasticos", nombre: "Acumulación de plásticos" },
  { id: "quimicos", nombre: "Contaminación química" },
  { id: "algas", nombre: "Proliferación de algas" },
  { id: "peces", nombre: "Mortandad de peces" },
  { id: "deforestacion", nombre: "Deforestación en ribera" },
  { id: "erosion", nombre: "Erosión de orillas" },
  { id: "infraestructura", nombre: "Daños en infraestructura" },
  { id: "otro", nombre: "Otro problema" },
]

export default function CrearReportePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>("ubicacion")
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
  })
  const [imagenes, setImagenes] = useState<File[]>([])
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipo: value }))
  }

  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation)
    if (!useCurrentLocation) {
      // Simular obtención de ubicación actual
      setTimeout(() => {
        setSelectedLocation({ lat: 15.4842, lng: -89.1425 }) // Coordenadas de ejemplo en el Río Motagua
      }, 1000)
    } else {
      setSelectedLocation(null)
    }
  }

  const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const newPreviews: string[] = []

    newFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string)
          setImagenesPreview((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })

    setImagenes((prev) => [...prev, ...newFiles])
  }

  const removeImage = (index: number) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index))
    setImagenesPreview((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.titulo || !formData.descripcion || !formData.tipo || !selectedLocation) {
      toast.error("Información incompleta", {
        description: "Por favor completa todos los campos requeridos y selecciona una ubicación.",
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío de datos
    setTimeout(() => {
      toast.success("Reporte enviado con éxito", {
        description: "Tu reporte ha sido enviado y está pendiente de aprobación por un moderador.",
      })
      console.log(imagenes);
      setIsSubmitting(false)
      router.push("/reportes/mis-reportes")
    }, 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#282f33] mb-2">Crear nuevo reporte</h1>
        <p className="text-[#434546] mb-8">
          Ayúdanos a identificar problemas en el Río Motagua para tomar acciones y proteger este recurso vital.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Información básica</CardTitle>
                <CardDescription>
                  Proporciona los detalles principales del problema que has identificado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título del reporte</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    placeholder="Ej: Acumulación de plásticos en la ribera"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de problema</Label>
                  <Select value={formData.tipo} onValueChange={handleSelectChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposReporte.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción detallada</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Describe el problema con el mayor detalle posible. Incluye información como la extensión del problema, cuánto tiempo lleva así, etc."
                    rows={5}
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
                <TabsTrigger value="fotos">Fotos</TabsTrigger>
              </TabsList>

              <TabsContent value="ubicacion" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ubicación del problema</CardTitle>
                    <CardDescription>Indica dónde has observado el problema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="useCurrentLocation"
                        checked={useCurrentLocation}
                        onCheckedChange={handleLocationToggle}
                      />
                      <Label htmlFor="useCurrentLocation">Usar mi ubicación actual</Label>
                    </div>

                    {useCurrentLocation && !selectedLocation && (
                      <div className="flex items-center justify-center h-[300px] bg-gray-100 rounded-md">
                        <div className="flex flex-col items-center text-[#434546]">
                          <Loader2 className="h-8 w-8 animate-spin mb-2 text-[#2ba4e0]" />
                          <p>Obteniendo tu ubicación...</p>
                        </div>
                      </div>
                    )}

                    {!useCurrentLocation && (
                      <div className="space-y-2">
                        <Label>Selecciona la ubicación en el mapa</Label>
                        <div className="h-[400px] bg-gray-100 rounded-md overflow-hidden">
                          <MapSelector onLocationSelect={handleMapLocationSelect} />
                        </div>
                      </div>
                    )}

                    {selectedLocation && (
                      <div className="p-4 bg-[#2ba4e0]/10 rounded-md flex items-start">
                        <MapPin className="h-5 w-5 text-[#2ba4e0] mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#282f33]">Ubicación seleccionada</p>
                          <p className="text-sm text-[#434546]">
                            Latitud: {selectedLocation.lat.toFixed(6)}, Longitud: {selectedLocation.lng.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fotos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidencia fotográfica</CardTitle>
                    <CardDescription>Sube fotos que muestren el problema (opcional)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                        <Label htmlFor="upload-gallery" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-[#418fb6] mb-2" />
                            <p className="font-medium text-[#282f33]">Subir desde galería</p>
                            <p className="text-sm text-[#434546]">Arrastra o haz clic para seleccionar</p>
                          </div>
                          <Input
                            id="upload-gallery"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </Label>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                        <Label htmlFor="upload-camera" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Camera className="h-8 w-8 text-[#418fb6] mb-2" />
                            <p className="font-medium text-[#282f33]">Tomar foto</p>
                            <p className="text-sm text-[#434546]">Usa la cámara de tu dispositivo</p>
                          </div>
                          <Input
                            id="upload-camera"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </Label>
                      </div>
                    </div>

                    {imagenesPreview.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-[#282f33] mb-3">Imágenes seleccionadas</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {imagenesPreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                                <img
                                  src={preview || "/placeholder.svg"}
                                  alt={`Imagen ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm"
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  "Enviar reporte"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
