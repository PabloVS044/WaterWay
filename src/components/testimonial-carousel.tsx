"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Los datos de WaterWay+ nos han permitido identificar los puntos críticos de contaminación y dirigir nuestros esfuerzos de limpieza de manera más efectiva.",
    author: "María Hernández",
    role: "Coordinadora de Proyecto Ambiental",
    organization: "Fundación Río Limpio",
  },
  {
    id: 2,
    quote:
      "Como investigador, el acceso a datos satelitales procesados ha revolucionado mi trabajo. Ahora puedo monitorear cambios en tiempo real y desarrollar modelos predictivos más precisos.",
    author: "Dr. Carlos Mendoza",
    role: "Hidrólogo",
    organization: "Universidad de San Carlos",
  },
  {
    id: 3,
    quote:
      "Nuestra empresa ha reducido su impacto ambiental en un 40% gracias a las alertas tempranas y recomendaciones que recibimos a través de WaterWay+.",
    author: "Alejandro Morales",
    role: "Director de Sostenibilidad",
    organization: "Industrias del Atlántico",
  },
  {
    id: 4,
    quote:
      "La transparencia de los datos ha permitido a nuestra comunidad exigir acciones concretas a las autoridades. Ahora tenemos evidencia científica que respalda nuestras demandas.",
    author: "Luisa Ramírez",
    role: "Líder comunitaria",
    organization: "Comunidad El Progreso",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  if (!mounted) return null

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-[#2ba4e0]/30 mb-4" />
                  <p className="text-lg text-[#434546] mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#418fb6]/20 flex items-center justify-center mr-4">
                      <span className="text-[#418fb6] font-bold">
                        {testimonial.author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#282f33]">{testimonial.author}</p>
                      <p className="text-sm text-[#434546]">
                        {testimonial.role}, {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        aria-label="Testimonio anterior"
      >
        <ChevronLeft className="h-6 w-6 text-[#282f33]" />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        aria-label="Testimonio siguiente"
      >
        <ChevronRight className="h-6 w-6 text-[#282f33]" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${current === index ? "bg-[#2ba4e0]" : "bg-[#d1d5db]"}`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
