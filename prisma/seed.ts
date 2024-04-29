import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const churches_data = [
  { description: "Ninguna" },
  { description: "Otra" },
  { description: "Aguas Claras" },
  { description: "Aguas Verdes" },
  { description: "Alfarillo" },
  { description: "Alfonso Ugarte" },
  { description: "Alianza" },
  { description: "Alto Andino" },
  { description: "Atumplaya" },
  { description: "Awajun" },
  { description: "Balsayacu" },
  { description: "Banda De Shilcayo" },
  { description: "Beirut" },
  { description: "Bellavista" },
  { description: "Betania" },
  { description: "Calzada" },
  { description: "Campanilla" },
  { description: "Cashnahuasi" },
  { description: "Eslabón" },
  { description: "Challual" },
  { description: "Consuelo" },
  { description: "Cristino G. Carhuapoma" },
  { description: "Democracia" },
  { description: "Dos de Mayo" },
  { description: "El Limon" },
  { description: "El Mirador" },
  { description: "El Mirador De Picota" },
  { description: "El Paraiso" },
  { description: "El Tambo" },
  { description: "Garzayacu" },
  { description: "Hunguraguipampa" },
  { description: "Jepelacio" },
  { description: "Jerillo" },
  { description: "José Oyala" },
  { description: "Juanjui" },
  { description: "La Esperanza" },
  { description: "La Florida" },
  { description: "La Fortaleza" },
  { description: "La Huarpia" },
  { description: "La Palma" },
  { description: "La Ribera" },
  { description: "La Union" },
  { description: "Las Malvinas" },
  { description: "Las Mercedes" },
  { description: "Los Olivos" },
  { description: "Mamonaquihua" },
  { description: "Monterrico" },
  { description: "Moyobamba" },
  { description: "Naciente del Rio Negro" },
  { description: "Naranjillo" },
  { description: "Naranjos" },
  { description: "Nueva Cajamarca" },
  { description: "Nueva Rioja" },
  { description: "Nuevo Gualulo" },
  { description: "Nuevo Loreto" },
  { description: "Nuevo Milagro" },
  { description: "Nuevo Pacaypampa" },
  { description: "Nuevo Perlamayo" },
  { description: "Ochamé" },
  { description: "Pacayzapa" },
  { description: "Pampa Hermosa" },
  { description: "Pasmayo" },
  { description: "Perlamayo" },
  { description: "Pomacochas" },
  { description: "Potrerillo" },
  { description: "Pueblo Libre" },
  { description: "Pueblo Libre Km 45" },
  { description: "Roque" },
  { description: "San Agustin" },
  { description: "Morales." },
  { description: "San Andres Del Valle Sisa" },
  { description: "San Carlos" },
  { description: "San Francisco" },
  { description: "San Hilarión" },
  { description: "San José de Altomayo" },
  { description: "San Juan de Pacayzapa" },
  { description: "San Juan de Soritor" },
  { description: "San Juan del Mayo" },
  { description: "San Marcos" },
  { description: "San Martin De Alao" },
  { description: "San Miguel de Soritor" },
  { description: "San Pablo de Altomayo" },
  { description: "Santa Clara" },
  { description: "Flor del Oriente" },
  { description: "Santo Toribio" },
  { description: "Sector Capironal" },
  { description: "Sector Rio Soritor" },
  { description: "Shucshuyacu" },
  { description: "Siete de Junio" },
  { description: "Soritor" },
  { description: "Tarapoto" },
  { description: "Valle Andino" },
  { description: "Valle La Conquista" },
  { description: "Villa El Triunfo" },
  { description: "Vista Alegre" },
  { description: "Yantaló" },
  { description: "Yorongos" },
  { description: "Yuracyacu" },
  { description: "Yurimaguas" },
];

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
const profile_data = [
  { description: "root" },
  { description: "ADMINISTRADOR" },
  { description: "STAFF" },
  { description: "PERSONA" },
];
async function main() {
  await prisma.paymentMethod.createMany({
    data: paymentmethod_data,
    skipDuplicates: true,
  });

  await prisma.church.createMany({
    data: churches_data,
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
