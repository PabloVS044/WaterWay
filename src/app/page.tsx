"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapIcon, Users, BarChart3 } from "lucide-react"

// estilos para las animaciones y diseño
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  body {
    background-color: #282f33;
    color: #434546;
  }
`

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen justify-center">      <style jsx global>
        {styles}
      </style>
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b bg-[#282f33] shadow-md justify-center">
        <div className="container flex h-16 items-center justify-between px-6 mx-auto max-w">
          <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <span className="text-xl font-bold text-[#2ba4e0]">WaterWay+</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#proyecto"
              className="text-sm font-medium text-white hover:text-[#2ba4e0] transition-colors duration-300"
            >
              Proyecto
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-[#2ba4e0] transition-colors duration-300"
            >
              Acerca de
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-[#2ba4e0] transition-colors duration-300"
            >
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg shadow-lg">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section
            className="relative bg-cover bg-center text-white mx-auto max-w"
            style={{
              backgroundImage:
                "linear-gradient(rgba(40, 47, 51, 0.6), rgba(40, 47, 51, 0.6)), url('https://www.portalambiental.com.mx/sites/default/files/media/image/2021/08/rio_motagua.jpeg')",
            }}
          >
            <div className="container relative z-10 py-32 md:py-48 flex flex-col items-center text-center px-6 mx-auto max-w">
              <div className="space-y-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-[fadeIn_1s_ease-in-out_0.2s_forwards]">
                  Protegiendo el Río Motagua
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-0 animate-[fadeIn_1s_ease-in-out_0.6s_forwards]">
                  Una plataforma para analizar, visualizar y combatir la contaminación del Río Motagua utilizando la red
                  Copernicus y la colaboración ciudadana.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeIn_1s_ease-in-out_1s_forwards]">
                  <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white transition-all duration-300 hover:scale-105 px-8 py-6 text-lg rounded-lg shadow-lg">
                    Registrarse
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-[#418fb6] hover:bg-white/10 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg rounded-lg"
                  >
                    Conocer más
                  </Button>
                </div>
              </div>
            </div>
          </section>


        {/* Proyecto Section */}
        <section id="proyecto" className="py-24 bg-white relative overflow-hidden">
          <div className="container relative px-6 mx-auto max-w ">
            <div className="flex flex-col items-center text-center mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#282f33] mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-in-out_0.2s_forwards]"
                style={{ animationFillMode: "forwards" }}
              >
                Sobre el Proyecto
              </h2>
              <p
                className="text-lg md:text-xl text-[#434546] max-w-3xl opacity-0 animate-[fadeInUp_0.8s_ease-in-out_0.4s_forwards]"
                style={{ animationFillMode: "forwards" }}
              >
                WaterWay es un portal que utiliza datos satelitales de la red Copernicus para determinar y proponer
                soluciones a la contaminación del Río Motagua. Nuestro objetivo es concientizar acerca del cuidado del
                medio ambiente a través de la evidencia recaudada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-[#418fb6]/20 h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:border-[#2ba4e0]/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#418fb6] flex items-center gap-2">
                    <MapIcon className="h-5 w-5" />
                    Análisis de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#434546]">
                    Utilizamos datos satelitales de Copernicus para monitorear la calidad del agua y detectar fuentes
                    de contaminación en tiempo real.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#418fb6]/20 h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:border-[#2ba4e0]/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#418fb6] flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Colaboración Comunitaria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#434546]">
                    Involucramos a ciudadanos, investigadores, empresas y autoridades en la identificación y solución
                    de problemas ambientales.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#418fb6]/20 h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:border-[#2ba4e0]/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#418fb6] flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Visualización Interactiva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#434546]">
                    Ofrecemos mapas interactivos, reportes y visualizaciones que facilitan la comprensión de los datos
                    y la toma de decisiones.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-[#282f33] py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0 transition-all duration-300 hover:scale-105">
            <MapIcon className="h-6 w-6 text-[#2ba4e0]" />
            <span className="text-xl font-bold text-white">WaterWay</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link href="#" className="text-sm text-white/80 hover:text-[#2ba4e0] transition-colors duration-300">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-sm text-white/80 hover:text-[#2ba4e0] transition-colors duration-300">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-sm text-white/80 hover:text-[#2ba4e0] transition-colors duration-300">
              Contacto
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-white/60">© 2025 WaterWay. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
