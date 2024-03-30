import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  console.log("event", event.method);
  const myDate = new Date("2022-01-01");
  const isoString = myDate.toISOString();
  const person = {
    code: "prueba",
    doc_num: "prueba",
    firstname: "prueba",
    lastname: "prueba",
    gender: "M",
    birthday: isoString,
    phone: "999999999",
    email: "prueba",
    church: "prueba",
    status: true,
    documenttype_id: "0",
  };
  const exists = await prisma.person.count({
    where: { doc_num: person.doc_num },
  });

  if (exists > 0) {
    return { success: false, message: "Documento ya se encuentra registrado" };
  }

  const last = await prisma.person.findFirst({
    orderBy: { id: "desc" },
  });

  person.code = generate_cod("P", last);

  try {
    return await prisma.person.create({
      data: { ...person },
    });
  } catch (error) {
    console.log(error);

    return { success: false, message: error };
  }
});
