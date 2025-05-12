"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as Label from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { WavesIcon, User, X } from "lucide-react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Image from "next/image"

const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs))
}

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
        "focus:outline-none focus:ring-2 focus:ring-[#2BA4E0] focus:ring-offset-2",
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
        "flex h-10 w-full rounded-md border border-[#435761]/30 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-[#2BA4E0] focus:border-[#2BA4E0]",
        "placeholder:text-gray-400",
        className,
      )}
      {...props}
    />
  )
}

export function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/login?registered=true")
    } catch (error) {
      console.error("Registration failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
        </div>
        <h1 className="text-5xl font-bold text-[#282F33]">Crear cuenta</h1>
        <p className="text-[#434546]">Regístrate para formar parte de WaterWay+</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6 text-center">
          {previewUrl ? (
            <div className="relative w-28 h-28 mx-auto">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Vista previa"
                className="w-28 h-28 rounded-full object-cover border-2 border-[#2BA4E0]"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200"
              >
                <X className="h-4 w-4 text-[#282F33]" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto flex flex-col items-center cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-full bg-[#435761]/5 flex items-center justify-center group-hover:bg-[#2BA4E0]/10 transition-colors">
                <User className="h-12 w-12 text-[#418FB6] stroke-[1.25]" />
              </div>
              <span className="text-xs text-[#434546]/70 mt-2">Subir foto de perfil</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label.Root htmlFor="firstName" className="text-sm font-medium text-[#282F33]">
              Nombre
            </Label.Root>
            <Input
              id="firstName"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label.Root htmlFor="lastName" className="text-sm font-medium text-[#282F33]">
              Apellido
            </Label.Root>
            <Input
              id="lastName"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label.Root htmlFor="email" className="text-sm font-medium text-[#282F33]">
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
          <Label.Root htmlFor="password" className="text-sm font-medium text-[#282F33]">
            Contraseña
          </Label.Root>
          <Input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-[#434546]">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#2BA4E0] hover:text-[#418FB6] font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
