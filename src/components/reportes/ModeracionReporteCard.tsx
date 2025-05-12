"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-toastify"
import { MapPin, Calendar, Eye, CheckCheck, X, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { aprobarReporte, rechazarReporte } from "@/actions/reportes"
import { Reporte, tiposReporte } from "@/components/reportes/types"

export default function ModeracionReporteCard({ reporte, soloVer = false }: { reporte: Reporte, soloVer?: boolean }) {
  const [showRechazoDialog, setShowRechazoDialog] = useState(false)
  const [rechazoRazon, setRechazoRazon] = useState("")
  const [isPending, setIsPending] = useState(false)

  const handleAprobar = async () => {
    try {
      setIsPending(true)
      await aprobarReporte(reporte.id)
      toast.success("Reporte aprobado")
    } catch (error) {
      console.log(error)
      toast.error("Error al aprobar el reporte")
    } finally {
      setIsPending(false)
    }
  }

  const handleRechazar = () => {
    setShowRechazoDialog(true)
  }

  const confirmarRechazo = async () => {
    try {
      setIsPending(true)
      await rechazarReporte(reporte.id, rechazoRazon)
      setShowRechazoDialog(false)
      setRechazoRazon("")
      toast.error("Reporte rechazado")
    } catch (error) {
      console.log(error)
      toast.error("Error al rechazar el reporte")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Card className="hover:shadow-sm transition">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              {reporte.imagenPrincipal ? (
                <Image
                  src={reporte.imagenPrincipal}
                  alt={reporte.titulo}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#418fb6]/10">
                  <MapPin className="h-8 w-8 text-[#418fb6]" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-[#282f33]">{reporte.titulo}</h3>
                <Badge
                  variant={
                    reporte.estado === "approved"
                      ? "outline"
                      : reporte.estado === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {reporte.estado === "pending" && "Pendiente"}
                  {reporte.estado === "revision" && "En revisión"}
                  {reporte.estado === "approved" && "Aprobado"}
                  {reporte.estado === "rejected" && "Rechazado"}
                </Badge>
              </div>
              <p className="text-sm text-[#434546] line-clamp-2 mt-1">{reporte.descripcion}</p>
              <div className="flex items-center mt-2 text-xs text-[#434546]">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{reporte.ubicacion}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-[#418fb6]/10 text-[#418fb6] hover:bg-[#418fb6]/20">
                    {tiposReporte.find((t) => t.id === reporte.tipo)?.nombre || reporte.tipo}
                  </Badge>
                  <div className="flex items-center text-xs text-[#434546]">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{reporte.fecha}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={reporte.usuarioAvatar || ""} alt={reporte.usuarioNombre} />
                    <AvatarFallback>{reporte.usuarioNombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{reporte.usuarioNombre}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
            <div className="flex gap-2">
              <Link href={`/reportes/${reporte.id}`}>
                <Button variant="outline" size="sm" className="text-[#434546]">
                  <Eye className="mr-1 h-4 w-4" /> Ver detalles
                </Button>
              </Link>

              {!soloVer && (
                <>
                  <Button variant="outline" size="sm" className="text-[#434546]">
                    <Edit className="mr-1 h-4 w-4" /> Editar
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="text-[#434546]" disabled={isPending}>
                        Acciones
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-green-600 cursor-pointer"
                        onClick={handleAprobar}
                        disabled={isPending}
                      >
                        <CheckCheck className="mr-2 h-4 w-4" /> Aprobar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={handleRechazar}
                        disabled={isPending}
                      >
                        <X className="mr-2 h-4 w-4" /> Rechazar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRechazoDialog} onOpenChange={setShowRechazoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar reporte</DialogTitle>
            <DialogDescription>
              Proporciona una razón para rechazar este reporte. Esta información será enviada al usuario.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Razón del rechazo..."
            value={rechazoRazon}
            onChange={(e) => setRechazoRazon(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRechazoDialog(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button
              className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white"
              onClick={confirmarRechazo}
              disabled={!rechazoRazon.trim() || isPending}
            >
              Confirmar rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}