"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as Label from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "next-auth";

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

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await signIn("credentials", { ...data, redirect: false })
      console.log(res)
      if (!res?.ok) {
        console.log(res?.error)
        toast.error("No se pudo iniciar sesion")
        return;
      }
      router.push("/")
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  return (
    <div className="space-y-6 text-black">
      <div className="space-y-2 text-center">
        <h1 className="text-5xl font-bold">Bienvenido</h1>
        <p className="text-gray-500">Inicia sesión para acceder a WaterWay+</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label.Root htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </Label.Root>
          <Input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
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
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
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

export function LoggedInView({ session }: { session: Session }) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <p className="text-gray-600">Has iniciado sesión correctamente</p>
        {session?.user?.email && (
          <p className="text-sm text-gray-500">{session.user.email}</p>
        )}
      </div>

      <Button
        onClick={() => {
          signOut().catch(() => {
            toast.error("No se ha podido hacer correctamente log out")
          })
        }}
        className="w-full"
      >
        Cerrar sesión
      </Button>
    </div>
  )
}