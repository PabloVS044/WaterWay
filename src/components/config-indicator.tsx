"use client"

import { useEffect, useState } from "react"
import { useConfig } from "@/contexts/config-context"

export function ConfigIndicator() {
  const { config } = useConfig()
  const [showIndicator, setShowIndicator] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Determinar qué cambió
    setMessage("Cambio aplicado")
    setShowIndicator(true)
    const timer = setTimeout(() => setShowIndicator(false), 1500)
    return () => clearTimeout(timer)
  }, [config])

  if (!showIndicator) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-[#2ba4e0] text-white px-4 py-2 rounded-md text-sm shadow-lg border border-[#1a91c9] flex items-center">
      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
      {message}
    </div>
  )
}
