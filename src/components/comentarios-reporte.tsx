"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Flag, Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Comentario {
  id: string
  texto: string
  fecha: string
  usuario: {
    id: string
    nombre: string
    avatar: string
    rol: string
  }
  likes: number
}

interface ComentariosReporteProps {
  reporteId: string
  comentarios: Comentario[]
}

export default function ComentariosReporte({ reporteId, comentarios: initialComentarios }: ComentariosReporteProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>(initialComentarios)
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likedComentarios, setLikedComentarios] = useState<string[]>([])

  const handleSubmitComentario = () => {
    if (!nuevoComentario.trim()) return

    setIsSubmitting(true)

    // Simular envío de datos
    setTimeout(() => {
      const nuevoComentarioObj: Comentario = {
        id: `com-${Date.now()}`,
        texto: nuevoComentario,
        fecha: new Date().toLocaleDateString(),
        usuario: {
          id: "user123", // Usuario actual simulado
          nombre: "Usuario Actual",
          avatar: "",
          rol: "Usuario",
        },
        likes: 0,
      }

      setComentarios([nuevoComentarioObj, ...comentarios])
      setNuevoComentario("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleLikeComentario = (comentarioId: string) => {
    if (likedComentarios.includes(comentarioId)) {
      // Ya le dio like, quitar
      setLikedComentarios(likedComentarios.filter((id) => id !== comentarioId))
      setComentarios(comentarios.map((c) => (c.id === comentarioId ? { ...c, likes: c.likes - 1 } : c)))
    } else {
      // Dar like
      setLikedComentarios([...likedComentarios, comentarioId])
      setComentarios(comentarios.map((c) => (c.id === comentarioId ? { ...c, likes: c.likes + 1 } : c)))
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Usuario actual" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="resize-none mb-2"
            />
            <div className="flex justify-end">
              <Button
                className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white"
                onClick={handleSubmitComentario}
                disabled={!nuevoComentario.trim() || isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Comentar"} <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {comentarios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#434546]">No hay comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
          ) : (
            comentarios.map((comentario) => (
              <div key={comentario.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src={comentario.usuario.avatar || "/placeholder.svg"}
                      alt={comentario.usuario.nombre}
                    />
                    <AvatarFallback>{comentario.usuario.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#282f33]">{comentario.usuario.nombre}</p>
                        <p className="text-xs text-[#434546]">{comentario.fecha}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#434546]">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-[#434546] mt-1">{comentario.texto}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 h-7 px-2 ${
                          likedComentarios.includes(comentario.id) ? "text-[#2ba4e0]" : "text-[#434546]"
                        }`}
                        onClick={() => handleLikeComentario(comentario.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{comentario.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
