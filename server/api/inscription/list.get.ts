import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function searchInscriptions(searchTerm: any, take: number, skip: number) {
  // Definir el filtro de búsqueda
  const filters = [
    { vouchergroup: { contains: searchTerm, mode: "insensitive" } },
    { person: { doc_num: { contains: searchTerm } } },
    { person: { names: { contains: searchTerm, mode: "insensitive" } } },
    { person: { lastnames: { contains: searchTerm, mode: "insensitive" } } },
  ];

  const count = await prisma.inscription.count({ where: { OR: filters } });
  const results = await prisma.inscription.findMany({
    take,
    skip,
    where: { OR: filters },
    orderBy: [{ id: "desc" }],
    include: {
      person: true,
      paymentmethod: true,
    },
  });

  return { count, results };
}

export default defineEventHandler(async (event) => {
  const { search, take, skip } = getQuery(event);

  return await searchInscriptions(search, +take, +skip);
});
