// src/app/(with-sidebar)/moderacion/reportes/types.ts
export interface Reporte {
  id: string
  titulo: string
  descripcion: string
  tipo: string | null,
  fecha: string
  ubicacion: string
  estado: "pending" | "revision" | "approved" | "rejected"
  resuelto: boolean
  imagenPrincipal: string | null
  usuarioId: string
  usuarioNombre: string
  usuarioAvatar: string | null
  razonRechazo?: string
}

export interface ReporteFilters {
  searchTerm?: string
  type?: string
  mostrarResueltos?: boolean
}

export interface ReportesStats {
  pendientes: number
  revision: number
  aprobados: number
  rechazados: number
  total: number
}

export const tiposReporte = [
  { id: "todos", nombre: "Todos los tipos" },
  { id: "basura", nombre: "Contaminación por basura" },
  { id: "plasticos", nombre: "Acumulación de plásticos" },
  { id: "quimicos", nombre: "Contaminación química" },
  { id: "algas", nombre: "Proliferación de algas" },
  { id: "peces", nombre: "Mortandad de peces" },
  { id: "deforestacion", nombre: "Deforestación en ribera" },
  { id: "erosion", nombre: "Erosión de orillas" },
  { id: "infraestructura", nombre: "Daños en infraestructura" },
  { id: "otro", nombre: "Otro problema" },
]