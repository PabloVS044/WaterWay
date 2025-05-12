import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/app/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WaterWay+ | Protegiendo el Río Motagua",
  description: "Plataforma de monitoreo y protección del Río Motagua",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
