"use client"

import { useEffect, useState } from "react"

interface ImpactCounterProps {
  label: string
  value: number
  suffix?: string
}

export default function ImpactCounter({ label, value, suffix = "" }: ImpactCounterProps) {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Animate the counter
    const duration = 2000 // ms
    const steps = 50
    const stepValue = value / steps
    const stepTime = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  if (!mounted) return null

  return (
    <div className="text-center px-4">
      <p className="text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-white/80 text-lg">{label}</p>
    </div>
  )
}
