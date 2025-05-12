import AIMapExplorer from "@/components/ai-map-explorer"

export default function AIMapPage() {
  return (
    <div className="container mx-auto py-4 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold text-[#282f33] mb-3">Explorador de Mapa</h1>
        <div className="flex-1 h-[calc(100%-3rem)]">
          <AIMapExplorer />
        </div>
      </div>
    </div>
  )
}
