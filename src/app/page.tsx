import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, BarChart2, Users, Building, Shield, Database, ArrowRight, ExternalLink } from "lucide-react"
import RiverQualityChart from "@/components/river-quality-chart"
import MapPreview from "@/components/map-preview"
import ImpactCounter from "@/components/impact-counter"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#282f33]/90 to-[#418fb6]/70 z-10" />
        <div
          className="relative h-[90vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Protegiendo el futuro del <span className="text-[#2ba4e0]">Río Motagua</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Utilizamos datos satelitales y ciencia colaborativa para monitorear, analizar y proteger uno de los
                recursos hídricos más importantes de Guatemala.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white px-8 py-6 text-lg">
                    Únete al proyecto <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8 py-6 text-lg"
                >
                  Explorar datos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-20 bg-[#282f33]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">El Río Motagua en números</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Los datos satelitales revelan la realidad de uno de los ríos más contaminados de Centroamérica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-[#435761] border-none">
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold text-[#2ba4e0] mb-2">486 km</p>
                <p className="text-white/80">Longitud del río</p>
              </CardContent>
            </Card>
            <Card className="bg-[#435761] border-none">
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold text-[#2ba4e0] mb-2">15,000</p>
                <p className="text-white/80">Toneladas de plástico al año</p>
              </CardContent>
            </Card>
            <Card className="bg-[#435761] border-none">
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold text-[#2ba4e0] mb-2">4.2M</p>
                <p className="text-white/80">Personas afectadas</p>
              </CardContent>
            </Card>
            <Card className="bg-[#435761] border-none">
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold text-[#2ba4e0] mb-2">70%</p>
                <p className="text-white/80">Reducción de biodiversidad</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#282f33] mb-6">Monitoreo satelital en tiempo real</h2>
              <p className="text-lg text-[#434546] mb-8">
                WaterWay+ utiliza la red Copernicus para monitorear constantemente la calidad del agua, niveles de
                contaminación y cambios en el ecosistema del Río Motagua. Nuestros algoritmos procesan terabytes de
                datos para ofrecer información precisa y actualizada.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#418fb6] p-2 rounded-full mr-4 mt-1">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#282f33]">Datos de alta precisión</h3>
                    <p className="text-[#434546]">
                      Resolución espacial de hasta 10 metros para detectar cambios sutiles en el ecosistema
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#418fb6] p-2 rounded-full mr-4 mt-1">
                    <BarChart2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#282f33]">Análisis predictivo</h3>
                    <p className="text-[#434546]">
                      Modelos que anticipan riesgos ambientales y ayudan a prevenir desastres
                    </p>
                  </div>
                </div>
              </div>
              <Button className="mt-8 bg-[#418fb6] hover:bg-[#49758b] text-white">
                Explorar el mapa interactivo <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="lg:w-1/2 h-[400px] bg-[#f5f5f5] rounded-xl overflow-hidden shadow-lg">
              <MapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization Preview */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#282f33] mb-4">Visualizando el impacto ambiental</h2>
            <p className="text-lg text-[#434546] max-w-3xl mx-auto">
              Transformamos datos complejos en visualizaciones claras que permiten entender la situación actual y tomar
              decisiones informadas
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <Tabs defaultValue="contaminacion" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="contaminacion" className="text-lg">
                  Contaminación
                </TabsTrigger>
                <TabsTrigger value="biodiversidad" className="text-lg">
                  Biodiversidad
                </TabsTrigger>
                <TabsTrigger value="impacto" className="text-lg">
                  Impacto humano
                </TabsTrigger>
              </TabsList>
              <TabsContent value="contaminacion" className="h-[400px]">
                <RiverQualityChart dataType="contaminacion" />
              </TabsContent>
              <TabsContent value="biodiversidad" className="h-[400px]">
                <RiverQualityChart dataType="biodiversidad" />
              </TabsContent>
              <TabsContent value="impacto" className="h-[400px]">
                <RiverQualityChart dataType="impacto" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center">
            <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white px-8 py-6 text-lg">
              Acceder a todos los datos <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="py-16 bg-[#418fb6]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Nuestro impacto hasta hoy</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <ImpactCounter label="Muestras analizadas" value={12458} suffix="+" />
              <ImpactCounter label="Alertas generadas" value={347} />
              <ImpactCounter label="Acciones de limpieza" value={86} />
              <ImpactCounter label="Comunidades beneficiadas" value={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#282f33] mb-4">
              Cada rol cuenta en la protección del Río Motagua
            </h2>
            <p className="text-lg text-[#434546] max-w-3xl mx-auto">
              WaterWay+ conecta a diferentes actores para crear un ecosistema de colaboración
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-[#2ba4e0]">
              <CardContent className="p-6 pt-8">
                <div className="bg-[#2ba4e0]/10 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-[#2ba4e0]" />
                </div>
                <h3 className="text-xl font-bold text-[#282f33] mb-2">Usuarios</h3>
                <p className="text-[#434546] mb-4">
                  Ciudadanos comprometidos que reportan incidentes, participan en acciones comunitarias y difunden
                  información sobre el estado del río.
                </p>
                <Link href="/registro/usuario" className="text-[#2ba4e0] font-medium flex items-center hover:underline">
                  Registrarse como usuario <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#418fb6]">
              <CardContent className="p-6 pt-8">
                <div className="bg-[#418fb6]/10 p-3 rounded-full w-fit mb-4">
                  <Database className="h-6 w-6 text-[#418fb6]" />
                </div>
                <h3 className="text-xl font-bold text-[#282f33] mb-2">Investigadores</h3>
                <p className="text-[#434546] mb-4">
                  Científicos y académicos que analizan datos, desarrollan modelos predictivos y proponen soluciones
                  basadas en evidencia.
                </p>
                <Link
                  href="/registro/investigador"
                  className="text-[#418fb6] font-medium flex items-center hover:underline"
                >
                  Unirse como investigador <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#49758b]">
              <CardContent className="p-6 pt-8">
                <div className="bg-[#49758b]/10 p-3 rounded-full w-fit mb-4">
                  <Building className="h-6 w-6 text-[#49758b]" />
                </div>
                <h3 className="text-xl font-bold text-[#282f33] mb-2">Empresas</h3>
                <p className="text-[#434546] mb-4">
                  Organizaciones comprometidas con la sostenibilidad que implementan prácticas responsables y financian
                  proyectos de recuperación.
                </p>
                <Link href="/registro/empresa" className="text-[#49758b] font-medium flex items-center hover:underline">
                  Participar como empresa <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#435761]">
              <CardContent className="p-6 pt-8">
                <div className="bg-[#435761]/10 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-[#435761]" />
                </div>
                <h3 className="text-xl font-bold text-[#282f33] mb-2">Moderadores</h3>
                <p className="text-[#434546] mb-4">
                  Expertos que verifican la calidad de los datos, validan reportes y aseguran que la información sea
                  precisa y confiable.
                </p>
                <Link href="/contacto" className="text-[#435761] font-medium flex items-center hover:underline">
                  Más información <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#282f33] md:col-span-2 lg:col-span-2">
              <CardContent className="p-6 pt-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-2/3">
                    <div className="bg-[#282f33]/10 p-3 rounded-full w-fit mb-4">
                      <BarChart2 className="h-6 w-6 text-[#282f33]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#282f33] mb-2">Datos abiertos para todos</h3>
                    <p className="text-[#434546] mb-4">
                      Creemos en la transparencia y el acceso libre a la información. Todos los datos recopilados por
                      WaterWay+ están disponibles para consulta pública, investigación y desarrollo de soluciones.
                    </p>
                    <Button className="bg-[#282f33] hover:bg-[#434546] text-white">Explorar datos abiertos</Button>
                  </div>
                  <div className="md:w-1/3 bg-[#f5f5f5] h-40 rounded-lg flex items-center justify-center">
                    <p className="text-[#434546] text-center px-4">Vista previa del portal de datos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#282f33] mb-4">Voces por el Río Motagua</h2>
            <p className="text-lg text-[#434546] max-w-3xl mx-auto">
              Conoce a las personas que están haciendo la diferencia
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#282f33]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Únete al movimiento por un Río Motagua limpio
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Cada acción cuenta. Juntos podemos transformar el futuro de uno de los recursos hídricos más importantes
              de la región.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-[#2ba4e0] hover:bg-[#418fb6] text-white px-8 py-6 text-lg">
                  Crear una cuenta
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white/20 hover:bg-white/10 px-8 py-6 text-lg"
              >
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
