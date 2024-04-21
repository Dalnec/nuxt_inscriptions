import { PrismaClient } from "@prisma/client";
import { useFetch } from "nuxt/app";
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

router.get(
  "/dni/:dni",
  defineEventHandler(async (event) => {
    const dni = getRouterParam(event, "dni");
    if (dni) {
      const token = "ba019259a25321333dd5d806678f88d5514a7c2b6c11515481617759d873249b";
      const data = await $fetch(`https://my.apidev.pro/api/dni/${dni}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      return data;
    }
    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

router.get(
  "/documenttypes",
  defineEventHandler(async (event) => {
    const docs = await prisma.documentType.findMany({ where: { active: true } });
    if (docs) {
      return docs;
    }
    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

router.get(
  "/churches",
  defineEventHandler(async (event) => {
    const churches = await prisma.church.findMany({ where: { active: true } });
    if (churches) {
      return churches;
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
      return await prisma.person.update({
        where: { id },
        data: {
          ...body,
        },
      });
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No valid value",
    });
  })
);

export default useBase("/api/person", router.handler);
