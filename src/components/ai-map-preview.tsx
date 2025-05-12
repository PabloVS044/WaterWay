"use client"

import { useState } from "react"
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AIMapPreview() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe lo que quieres ver..."
              className="pl-10 pr-10 py-2 text-sm border-[#2ba4e0] focus-visible:ring-[#2ba4e0]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2ba4e0]" />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2ba4e0]" />
          </div>
        </div>
      </div>

      <div className="flex-1 relative border border-dashed border-[#2ba4e0]/30 rounded-lg overflow-hidden bg-[#f5f5f5]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-8 w-8 text-[#2ba4e0]/50 mx-auto mb-2" />
            <p className="text-[#2ba4e0] font-medium text-sm">Explorador de mapa con IA</p>
            <p className="text-xs text-[#434546] mt-1 max-w-xs">
              Describe lo que quieres ver y la IA generará visualizaciones
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/mapa-ia">
          <Button className="w-full bg-[#2ba4e0] hover:bg-[#418fb6] text-white">
            Explorar mapa con IA <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
