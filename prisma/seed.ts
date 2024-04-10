import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paymentmethod_data = [
  { description: "EFECTIVO" },
  { description: "BCP", account: "43505016976070", icon: "/images/icons/logo_bcp.ico" },
  { description: "BBVA", account: "0011-0814-0216399183", icon: "/images/icons/logo_bbva.ico" },
  { description: "PIURA", account: "210-01-072684", icon: "/images/icons/logo_yape.ico" },
  { description: "INTERBANK", account: "8983322363216", icon: "/images/icons/logo_yape.ico" },
  { description: "YAPE", account: "935018772", icon: "/images/icons/logo_yape.ico" },
  { description: "PLIN", account: "935018772", icon: "/images/icons/logo_plin.ico" },
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
