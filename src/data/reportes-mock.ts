export const reportesMock = [
  {
    id: "rep-001",
    titulo: "Acumulación de plásticos en la ribera",
    descripcion:
      "He observado una gran cantidad de botellas de plástico y otros desechos acumulados en la ribera del río. El área afectada tiene aproximadamente 50 metros de longitud y la contaminación parece ser reciente. Es preocupante porque está cerca de un área donde los niños suelen jugar.",
    tipo: "plasticos",
    fecha: "15/04/2024",
    ubicacion: "Cerca del puente principal, El Progreso",
    coordenadas: { lat: 14.8559, lng: -90.0638 }, // Río Motagua a su paso por El Progreso
    estado: "aprobado",
    resuelto: false,
    imagenes: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    usuario: {
      id: "user123",
      nombre: "Carlos Méndez",
      avatar: "",
      rol: "Usuario",
    },
    comentarios: [
      {
        id: "com-001",
        texto: "También observé esto la semana pasada. La situación ha empeorado.",
        fecha: "16/04/2024",
        usuario: {
          id: "user456",
          nombre: "Ana García",
          avatar: "",
          rol: "Usuario",
        },
        likes: 5,
      },
      {
        id: "com-002",
        texto: "He notificado a las autoridades locales sobre este problema.",
        fecha: "17/04/2024",
        usuario: {
          id: "user789",
          nombre: "Roberto Juárez",
          avatar: "",
          rol: "Moderador",
        },
        likes: 8,
      },
    ],
    actualizaciones: [
      {
        fecha: "18/04/2024",
        descripcion: "Se ha programado una jornada de limpieza para el próximo sábado.",
        usuario: {
          id: "mod001",
          nombre: "María Coordinadora",
          avatar: "",
          rol: "Moderador",
        },
      },
    ],
  },
  {
    id: "rep-002",
    titulo: "Mortandad de peces en la zona norte",
    descripcion:
      "Durante mi visita al río esta mañana, encontré aproximadamente 20-30 peces muertos flotando en la superficie. El agua tiene un color inusual y hay un olor fuerte en el área. Esto podría indicar contaminación química.",
    tipo: "peces",
    fecha: "12/04/2024",
    ubicacion: "Zona industrial de Zacapa, cerca de la fábrica textil",
    coordenadas: { lat: 14.9696, lng: -89.5354 }, // Río Motagua cerca de Zacapa
    estado: "revision",
    resuelto: false,
    imagenes: ["/placeholder.svg?height=400&width=600"],
    usuario: {
      id: "user456",
      nombre: "Ana García",
      avatar: "",
      rol: "Usuario",
    },
    comentarios: [],
  },
  {
    id: "rep-003",
    titulo: "Deforestación en la ribera del río",
    descripcion:
      "He notado que se han talado varios árboles en la ribera del río, lo que podría aumentar la erosión y afectar el ecosistema local. El área afectada es de aproximadamente 100 metros cuadrados.",
    tipo: "deforestacion",
    fecha: "10/04/2024",
    ubicacion: "Sector sur, cerca del sitio arqueológico Quiriguá",
    coordenadas: { lat: 15.2688, lng: -89.0416 }, // Río Motagua cerca de Quiriguá
    estado: "aprobado",
    resuelto: true,
    imagenes: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    usuario: {
      id: "user789",
      nombre: "Roberto Juárez",
      avatar: "",
      rol: "Investigador",
    },
    comentarios: [
      {
        id: "com-003",
        texto: "Esto es muy preocupante. La deforestación en esta área puede causar graves problemas de erosión.",
        fecha: "11/04/2024",
        usuario: {
          id: "user101",
          nombre: "Laura Ecóloga",
          avatar: "",
          rol: "Investigador",
        },
        likes: 12,
      },
    ],
    actualizaciones: [
      {
        fecha: "15/04/2024",
        descripcion: "Se ha contactado con las autoridades forestales para investigar la tala ilegal.",
        usuario: {
          id: "mod002",
          nombre: "Juan Moderador",
          avatar: "",
          rol: "Moderador",
        },
      },
      {
        fecha: "20/04/2024",
        descripcion: "Se ha iniciado un proyecto de reforestación en la zona afectada con especies nativas.",
        usuario: {
          id: "mod002",
          nombre: "Juan Moderador",
          avatar: "",
          rol: "Moderador",
        },
        imagenes: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    solucion: {
      descripcion:
        "Se han plantado 50 árboles nativos y se ha establecido un programa de monitoreo para asegurar su crecimiento.",
      fecha: "25/04/2024",
    },
    datosAdicionales: {
      "Área afectada": "100m²",
      "Especies taladas": "Principalmente pino y roble",
      "Impacto estimado": "Moderado",
      "Tiempo de recuperación": "3-5 años",
    },
  },
  {
    id: "rep-004",
    titulo: "Contaminación química en el agua",
    descripcion:
      "El agua del río tiene un color azulado inusual y hay un fuerte olor químico. Esto coincide con el inicio de operaciones de una nueva fábrica en la zona. Urgente investigación requerida.",
    tipo: "quimicos",
    fecha: "08/04/2024",
    ubicacion: "Zona industrial, Río Hondo, Zacapa",
    coordenadas: { lat: 15.0424, lng: -89.5851 }, // Río Motagua cerca de Río Hondo
    estado: "pendiente",
    resuelto: false,
    imagenes: ["/placeholder.svg?height=400&width=600"],
    usuario: {
      id: "user123",
      nombre: "Carlos Méndez",
      avatar: "",
      rol: "Usuario",
    },
    comentarios: [],
  },
  {
    id: "rep-005",
    titulo: "Erosión severa en la orilla",
    descripcion:
      "La última temporada de lluvias ha causado una erosión severa en esta sección del río. Hay riesgo de derrumbe que podría afectar a las viviendas cercanas.",
    tipo: "erosion",
    fecha: "05/04/2024",
    ubicacion: "Comunidad Las Flores, Morales, Izabal",
    coordenadas: { lat: 15.4745, lng: -88.8351 }, // Río Motagua cerca de su desembocadura en Izabal
    estado: "aprobado",
    resuelto: false,
    imagenes: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    usuario: {
      id: "user456",
      nombre: "Ana García",
      avatar: "",
      rol: "Usuario",
    },
    comentarios: [
      {
        id: "com-004",
        texto: "Como geólogo, puedo confirmar que esta situación es crítica y requiere atención inmediata.",
        fecha: "06/04/2024",
        usuario: {
          id: "user202",
          nombre: "Pedro Geólogo",
          avatar: "",
          rol: "Investigador",
        },
        likes: 15,
      },
    ],
    actualizaciones: [
      {
        fecha: "10/04/2024",
        descripcion:
          "Se ha realizado una evaluación preliminar del riesgo. Se recomienda la construcción de muros de contención.",
        usuario: {
          id: "mod003",
          nombre: "Elena Coordinadora",
          avatar: "",
          rol: "Moderador",
        },
      },
    ],
  },
  {
    id: "rep-006",
    titulo: "Proliferación excesiva de algas",
    descripcion:
      "Gran parte de la superficie del río está cubierta por algas verdes. Esto podría indicar un exceso de nutrientes, posiblemente por escorrentía agrícola.",
    tipo: "algas",
    fecha: "03/04/2024",
    ubicacion: "Cerca de zonas agrícolas, San Jerónimo, Baja Verapaz",
    coordenadas: { lat: 15.0618, lng: -90.2399 }, // Río Motagua en su paso por Baja Verapaz
    estado: "rechazado",
    resuelto: false,
    razonRechazo:
      "Las imágenes no muestran claramente el problema. Por favor, envía fotos más detalladas de la proliferación de algas.",
    imagenes: ["/placeholder.svg?height=400&width=600"],
    usuario: {
      id: "user123",
      nombre: "Carlos Méndez",
      avatar: "",
      rol: "Usuario",
    },
    comentarios: [],
  },
];