"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as Label from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { WavesIcon } from "lucide-react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for class names
const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs))
}

// Button component using Radix Slot
const Button = ({
  className,
  asChild = false,
  disabled,
  children,
  ...props
}: {
  className?: string
  asChild?: boolean
  disabled?: boolean
  children: React.ReactNode
  [key: string]: any
}) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "bg-[#418FB6] text-white hover:bg-[#49758B] cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  )
}

const Input = ({
  className,
  type = "text",
  ...props
}: {
  className?: string
  type?: string
  [key: string]: any
}) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
        "placeholder:text-gray-400",
        className,
      )}
      {...props}
    />
  )
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with your actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 text-black">
      <div className="space-y-2 text-center text-black">
        <div className="flex justify-center">
        </div>
        <h1 className="text-5xl font-bold">Bienvenido</h1>
        <p className="text-gray-500">Inicia sesión para acceder a WaterWay+</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label.Root htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </Label.Root>
          <Input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label.Root htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label.Root>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full " disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
