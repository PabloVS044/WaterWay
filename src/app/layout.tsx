import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/app/provider"
import { Sidebar } from "@/components/sidebar"
import { ConfigProvider } from "@/contexts/config-context"
import { ConfigNotification } from "@/components/config-notification"


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
          <ThemeProvider attribute="class" defaultTheme="light">
            <ConfigProvider>
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <main className="flex-1">{children}</main>
              </div>
              <ConfigNotification />
            </ConfigProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
