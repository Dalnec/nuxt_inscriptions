import { PrismaClient } from "@prisma/client";
const router = createRouter();
const prisma = new PrismaClient();

router.get(
  "/:id",
  defineEventHandler(async (event) => {
    try {
      const id = Number(getRouterParam(event, "id"));
      if (id) {
        const person = await prisma.person.findFirst({
          where: { id },
        });
        if (!person) {
          throw createError({
            statusCode: 404,
            statusMessage: "Person not found",
          });
        }
        return person;
      }
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: "No valid value" + error,
      });
    }
  })
);

router.get(
  "/doc_num/:doc_num",
  defineEventHandler((event) => {
    const doc_num = getRouterParam(event, "doc_num");
    if (doc_num) {
      return prisma.person.findUnique({
        where: { doc_num },
      });
    }
    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

export default useBase("/api/person", router.handler);
