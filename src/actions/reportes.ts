"use server";

// Response type for both actions
import { ReporteFilters } from "@/components/reportes/types";
import { Response, prisma } from "@/services/utils";

/**
 * Approves a contamination report
 * @param id - The ID of the report to approve
 * @returns ActionResponse with success status
 */
export async function aprobarReporte(id: string): Promise<Response<null>> {
  try {
    const reporte = await prisma.contamination_Report.findUnique({
      where: { id },
    });

    if (!reporte) {
      return { success: false, data: null, error: { detail: "Reporte no encontrado." } };
    }

    if (reporte.status === "approved") {
      return { success: false, data: null, error: { detail: "El reporte ya está aprobado." } };
    }

    await prisma.contamination_Report.update({
      where: { id },
      data: {
        status: "approved",
        reject_reason: null, // limpiamos si se aprobó luego de haber sido rechazado antes
      },
    });

    return { success: true, data: null, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, error: { detail: "Error al aprobar el reporte." } };
  }
}
;

/**
 * Rejects a contamination report with a reason
 * @param id - The ID of the report to reject
 * @param razon - The reason for rejecting the report
 * @returns ActionResponse with success status
 */
export async function rechazarReporte(id: string, razon: string): Promise<Response<null>> {
  try {
    if (!razon || razon.trim().length < 5) {
      return { success: false, data: null, error: { detail: "Razón de rechazo inválida." } };
    }

    const reporte = await prisma.contamination_Report.findUnique({
      where: { id },
    });

    if (!reporte) {
      return { success: false, data: null, error: { detail: "Reporte no encontrado." } };
    }

    if (reporte.status === "rejected") {
      return { success: false, data: null, error: { detail: "El reporte ya fue rechazado." } };
    }

    await prisma.contamination_Report.update({
      where: { id },
      data: {
        status: "rejected",
        reject_reason: razon,
      },
    });

    return { success: true, data: null, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, error: { detail: "Error al rechazar el reporte." } };
  }
}

export async function getReportesPorEstado(
  estado: "pending" | "revision" | "approved" | "rejected",
  filters: ReporteFilters
) {
  const { searchTerm, type, mostrarResueltos } = filters;

  const reportes = await prisma.contamination_Report.findMany({
    where: {
      status: estado,
      ...(type && { type }),
      ...(mostrarResueltos === false && { resolved: false }),
      ...(Boolean(searchTerm) && {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      creator: true,
      images: {
        take: 1, // Solo la primera imagen
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });


  console.log({ reportes, filters })

  return reportes.map((r) => ({
    id: r.id,
    titulo: r.title,
    descripcion: r.description,
    tipo: r.type,
    fecha: r.created_at.toISOString(),
    ubicacion: `Lat: ${r.lat}, Lng: ${r.lng}`,
    estado: r.status as "pending" | "revision" | "approved" | "rejected",
    resuelto: r.resolved,
    imagenPrincipal: r.images[0]?.image_key ?? null,
    usuarioId: r.creator.id,
    usuarioNombre: `${r.creator.name} ${r.creator.last_name}`,
    usuarioAvatar: null, // si agregas avatars, aquí lo pones
  }));
}

export async function getReportesStats() {
  const [pendientes, revision, aprobados, rechazados, total] = await Promise.all([
    prisma.contamination_Report.count({ where: { status: "pending" } }),
    prisma.contamination_Report.count({ where: { status: "revision" } }),
    prisma.contamination_Report.count({ where: { status: "approved" } }),
    prisma.contamination_Report.count({ where: { status: "rejected" } }),
    prisma.contamination_Report.count(),
  ]);

  return {
    pendientes,
    revision,
    aprobados,
    rechazados,
    total,
  };
}

