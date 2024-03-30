import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Función para buscar personas con filtros
async function searchPersons(searchTerm: any, take: number = 10, skip: number = 0) {
  // Definir el filtro de búsqueda
  const where: Prisma.PersonWhereInput = {
    OR: [
      { doc_num: { contains: searchTerm } },
      { firstname: { contains: searchTerm, mode: "insensitive" } },
      { lastname: { contains: searchTerm, mode: "insensitive" } },
    ],
  };

  // Realizar la consulta con Prisma
  const count = await prisma.person.count({ where });
  const results = await prisma.person.findMany({
    take,
    skip,
    where,
    orderBy: [{ id: "desc" }],
  });

  return { count, results };
}

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  const query = getQuery(event);
  console.log("name", name);
  console.log("query", query);

  return await searchPersons(name, 10, 0);
});
