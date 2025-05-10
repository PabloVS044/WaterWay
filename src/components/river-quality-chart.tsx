"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

interface RiverQualityChartProps {
  dataType: "contaminacion" | "biodiversidad" | "impacto"
}

// Datos de ejemplo para las visualizaciones
const contaminacionData = [
  { month: "Ene", plasticos: 420, quimicos: 240, metalesPesados: 180 },
  { month: "Feb", plasticos: 380, quimicos: 218, metalesPesados: 190 },
  { month: "Mar", plasticos: 450, quimicos: 250, metalesPesados: 210 },
  { month: "Abr", plasticos: 520, quimicos: 290, metalesPesados: 220 },
  { month: "May", plasticos: 550, quimicos: 310, metalesPesados: 250 },
  { month: "Jun", plasticos: 580, quimicos: 320, metalesPesados: 260 },
  { month: "Jul", plasticos: 620, quimicos: 350, metalesPesados: 290 },
  { month: "Ago", plasticos: 590, quimicos: 330, metalesPesados: 270 },
  { month: "Sep", plasticos: 540, quimicos: 300, metalesPesados: 240 },
  { month: "Oct", plasticos: 510, quimicos: 280, metalesPesados: 230 },
  { month: "Nov", plasticos: 490, quimicos: 270, metalesPesados: 220 },
  { month: "Dic", plasticos: 530, quimicos: 290, metalesPesados: 240 },
]

const biodiversidadData = [
  { year: "2018", peces: 85, aves: 92, plantas: 78 },
  { year: "2019", peces: 75, aves: 87, plantas: 72 },
  { year: "2020", peces: 65, aves: 80, plantas: 68 },
  { year: "2021", peces: 55, aves: 75, plantas: 62 },
  { year: "2022", peces: 48, aves: 70, plantas: 58 },
  { year: "2023", peces: 42, aves: 65, plantas: 52 },
  { year: "2024", peces: 38, aves: 62, plantas: 48 },
]

const impactoData = [
  { region: "Alta Verapaz", afectados: 450000, economico: 12, acceso: 65 },
  { region: "Baja Verapaz", afectados: 320000, economico: 18, acceso: 58 },
  { region: "El Progreso", afectados: 280000, economico: 22, acceso: 52 },
  { region: "Guatemala", afectados: 850000, economico: 15, acceso: 70 },
  { region: "Izabal", afectados: 420000, economico: 25, acceso: 48 },
  { region: "Zacapa", afectados: 380000, economico: 20, acceso: 55 },
]

export default function RiverQualityChart({ dataType }: RiverQualityChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center">Cargando gráficos...</div>
  }

  if (dataType === "contaminacion") {
    return (
      <div className="w-full h-full">
        <h3 className="text-xl font-semibold text-[#282f33] mb-4">Niveles de contaminación (toneladas/mes)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={contaminacionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="plasticos" stackId="1" stroke="#2ba4e0" fill="#2ba4e0" name="Plásticos" />
            <Area type="monotone" dataKey="quimicos" stackId="1" stroke="#418fb6" fill="#418fb6" name="Químicos" />
            <Area
              type="monotone"
              dataKey="metalesPesados"
              stackId="1"
              stroke="#49758b"
              fill="#49758b"
              name="Metales pesados"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (dataType === "biodiversidad") {
    return (
      <div className="w-full h-full">
        <h3 className="text-xl font-semibold text-[#282f33] mb-4">Índice de biodiversidad (% respecto a línea base)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={biodiversidadData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="peces"
              stroke="#2ba4e0"
              strokeWidth={2}
              name="Especies de peces"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="aves"
              stroke="#418fb6"
              strokeWidth={2}
              name="Especies de aves"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="plantas"
              stroke="#49758b"
              strokeWidth={2}
              name="Especies de plantas"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <h3 className="text-xl font-semibold text-[#282f33] mb-4">Impacto humano por región</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={impactoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis yAxisId="left" orientation="left" stroke="#2ba4e0" />
          <YAxis yAxisId="right" orientation="right" stroke="#49758b" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="afectados" fill="#2ba4e0" name="Personas afectadas" radius={[4, 4, 0, 0]} />
          <Bar
            yAxisId="right"
            dataKey="economico"
            fill="#418fb6"
            name="Impacto económico (millones USD)"
            radius={[4, 4, 0, 0]}
          />
          <Bar yAxisId="right" dataKey="acceso" fill="#49758b" name="Acceso a agua potable (%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
