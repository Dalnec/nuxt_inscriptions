import { PrismaClient } from "@prisma/client";
const router = createRouter();
const prisma = new PrismaClient();

async function searchUsers(searchTerm: any, take: number, skip: number) {
  // Definir el filtro de búsqueda
  const filters = [
    { email: { contains: searchTerm, mode: "insensitive" } },
    { name: { contains: searchTerm, mode: "insensitive" } },
  ];

  const count = await prisma.user.count({ where: { NOT: { id: 1 }, OR: filters } });
  const results = await prisma.user.findMany({
    take,
    skip,
    where: { NOT: { id: 1 }, OR: filters },
    orderBy: [{ id: "desc" }],
    include: {
      profile: true,
    },
  });

  return { count, results };
}

router.get(
  "/list",
  defineEventHandler(async (event) => {
    const { search, take, skip } = getQuery(event);
    return await searchUsers(search, +take, +skip);
  })
);

router.get(
  "/profiles",
  defineEventHandler(async (event) => {
    const profiles = await prisma.profile.findMany({});
    if (profiles) {
      return profiles;
    }
    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

router.post(
  "/email",
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (body) {
      return await prisma.user.findUnique({
        where: { email: body.email },
        include: {
          profile: true,
        },
      });
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

router.post(
  "/create",
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (body) {
      const newUser = await prisma.user.create({
        data: {
          ...body,
        },
      });
      return { success: true, message: "User created!", data: newUser };
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

router.put(
  "/:id",
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));
    const body = await readBody(event);
    if (body) {
      const res = await prisma.user.update({
        where: { id },
        data: {
          ...body,
        },
      });
      return { success: true, data: res };
    }

    throw createError({
      statusCode: 404,
      // statusMessage: "No valid value",
    });
  })
);

router.delete(
  "/:id",
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));
    if (id) {
      const res = await prisma.user.delete({
        where: { id },
      });
      return { success: true, data: res };
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

export default useBase("/api/user", router.handler);
