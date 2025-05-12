import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const reportes = await prisma.contamination_Report.createMany({
    data: [
      {
        title: 'Contaminación por Plástico',
        description: 'Se observa acumulación de botellas y bolsas en el lago.',
        lat: 14.6400,
        lng: -90.5100,
        status: 'pending',
        type: 'Plástico',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
      {
        title: 'Aguas Negras Vertidas',
        description: 'Alguien está vertiendo aguas negras en un canal cercano.',
        lat: 14.6501,
        lng: -90.5202,
        status: 'pending',
        type: 'Aguas Residuales',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
      {
        title: 'Contaminación por Desechos Industriales',
        description: 'Restos químicos flotando en el agua.',
        lat: 14.6390,
        lng: -90.5050,
        status: 'pending',
        type: 'Desechos Industriales',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
      {
        title: 'Espuma en el Río',
        description: 'Espuma blanca saliendo de una tubería.',
        lat: 14.6411,
        lng: -90.5077,
        status: 'pending',
        type: 'Contaminación Química',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
      {
        title: 'Cadáveres de peces',
        description: 'Muchos peces muertos aparecieron flotando esta mañana.',
        lat: 14.6320,
        lng: -90.5030,
        status: 'pending',
        type: 'Muerte de Fauna',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
      {
        title: 'Vertido de Pintura',
        description: 'Agua teñida de azul, parece pintura o tinte.',
        lat: 14.6365,
        lng: -90.5099,
        status: 'pending',
        type: 'Vertido Químico',
        resolved: false,
        created_by: 'b2da2e37-2126-48a8-9afa-4caf857fe25b',
      },
    ],
  });

  console.log('Reportes creados:', reportes.count);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
