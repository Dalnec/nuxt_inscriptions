import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paymentmethod_data = [
  { description: "Efectivo" },
  { description: "Tarjeta" },
  { description: "Transferencia" },
  { description: "Yape" },
  { description: "Plin" },
];
const documenttype_data = [
  { id: "0", description: "SIN DOCUMENTO", active: true },
  { id: "1", description: "DNI", active: true },
  { id: "4", description: "CI", active: true },
  { id: "7", description: "PASAPORTE", active: true },
];
const profile_data = [{ description: "ADMINISTRADOR" }, { description: "STAFF" }, { description: "PERSONA" }];
async function main() {
  await prisma.paymentMethod.createMany({
    data: paymentmethod_data,
    skipDuplicates: true,
  });

  await prisma.documentType.createMany({
    data: documenttype_data,
    skipDuplicates: true,
  });

  await prisma.profile.createMany({
    data: profile_data,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
