// src/app/(with-sidebar)/moderacion/reportes/components/ModeracionHeader.tsx
export default function ModeracionHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-[#282f33]">Moderación de reportes</h1>
        <p className="text-[#434546]">Revisa y gestiona los reportes enviados por los usuarios</p>
      </div>
    </div>
  )
}