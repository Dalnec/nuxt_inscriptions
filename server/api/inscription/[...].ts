import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { Person } from "./types";
import { customAlphabet } from "nanoid";
// import path from "path";

const router = createRouter();
const prisma = new PrismaClient();

router.post(
  "/create",
  defineEventHandler(async (event) => {
    // try {
    // const formdata = await readMultipartFormData(event);
    // const data: Person = {
    //   doc_num: "",
    //   names: "",
    //   lastnames: "",
    //   church: "",
    //   birthday: new Date(),
    //   paymentmethod: "",
    //   phone: "",
    //   gender: "",
    // };
    // let file: any;
    // formdata?.forEach((value: any) => {
    //   if (value.name && value.data) {
    //     if (value.name == "file") {
    //       file = value;
    //     } else {
    //       data[value.name] = value.data.toString("utf8");
    //     }
    //   }
    // });
    // const namefile = `${data.paymentmethod}_${data.doc_num}.${file.filename.split(".").pop()}`;
    // const path = `./public/uploads/${namefile}`;
    // await writeFile(path, file.data);

    // const new_data = await prisma.person.create({
    //   data: {
    //     doc_num: data.doc_num,
    //     names: data.names,
    //     lastnames: data.lastnames,
    //     church: data.church,
    //     birthday: new Date(data.birthday).toISOString(),
    //     phone: data.phone,
    //     gender: data.gender,
    //     Inscription: {
    //       create: [
    //         {
    //           assignedBy: data.doc_num,
    //           voucherpath: namefile,
    //           paymentMethodId: 1,
    //         },
    //       ],
    //     },
    //   },
    // });
    // Parse the multipart form data

    const nanoid = customAlphabet("1234567890abcdef", 10);
    const groupcode = nanoid(5);
    const imgcode = nanoid();
    const typePerson = {
      P: "PASTOR",
      M: "MIEMBROACTIVO",
      I: "INVITADO",
    };
    const formData = await readMultipartFormData(event);

    let file: any;
    let data: any;
    let payment: any;
    let amount: any;

    formData?.forEach((value: any) => {
      if (value.name && value.data) {
        if (value.name == "file") {
          file = value;
        } else if (value.name == "data") {
          data = value.data.toString("utf8");
        } else if (value.name == "payment") {
          payment = JSON.parse(value.data.toString("utf8"));
        } else if (value.name == "amount") {
          amount = JSON.parse(value.data.toString("utf8"));
        }
      }
    });
    console.log("file", file);
    console.log("data", JSON.parse(data));
    console.log("payment", payment);
    console.log("amount", amount);

    const data_person = JSON.parse(data).map((p) => {
      delete p.mode;
      return {
        ...p,
        birthday: new Date(p.birthday).toISOString(),
        type_person: typePerson[p.type_person],
      };
    });

    let validated_new_persons = [];
    let new_persons_saved = [];
    // VERIFY IF PERSON ALREADY
    const existingPersons = await prisma.person.findMany({
      where: {
        OR: data_person.map((person: any) => ({
          doc_num: person.doc_num,
        })),
      },
    });

    if (existingPersons.length > 0) {
      // VERIFY IF PERSON ALREADY IN INSCRIPTIONS
      const inscriptions = await prisma.inscription.findMany({
        where: {
          OR: existingPersons.map((person) => ({
            personId: person.id,
          })),
        },
        include: {
          person: true,
        },
      });
      if (inscriptions.length > 0) {
        return {
          success: false,
          message: "La persona ya se encuentra Inscrita",
          data: inscriptions,
        };
      }
      // FILTER NEW PERSONS
      validated_new_persons = data_person.filter((e) => !existingPersons.some((ep) => ep.doc_num === e.doc_num));
      if (validated_new_persons.length > 0) {
        new_persons_saved = await Promise.all(
          validated_new_persons.map(async (d) => {
            return await prisma.person.create({
              data: d,
            });
          })
        );
      }
    } else {
      new_persons_saved = await Promise.all(
        data_person.map(async (d) => {
          return await prisma.person.create({
            data: d,
          });
        })
      );
    }

    // JOIN ALL PERSONS
    const all_persons = [...existingPersons, ...new_persons_saved];

    const namefile = `${payment}_${groupcode}_${imgcode}.${file.filename.split(".").pop()}`;
    // const path = `./public/uploads/${namefile}`;
    // const img_path = `${path.join("public", "uploads", namefile)}`;
    // console.log("img_path", img_path);

    // await writeFile(img_path, file.data);

    await useStorage().setItemRaw(`fs:${namefile}`, file.data);

    // CREATE INSCRIPTION
    const inscriptions = all_persons.map((i) => {
      return {
        countgroup: all_persons.length,
        paymentMethodId: +payment,
        vouchergroup: groupcode,
        voucherpath: namefile,
        voucheramount: amount * all_persons.length,
        amount: amount,
        personId: i.id,
      };
    });

    const new_inscriptions = await prisma.$transaction(async (prisma) => {
      // const recipient = await prisma.inscription.createMany({
      //   data: inscriptions,
      // });

      // return recipient;
      return await Promise.all(
        inscriptions.map(async (i) => {
          return await prisma.inscription.create({
            data: i,
          });
        })
      );
    });

    return { success: true, message: "Inscripcion(es) guardada(s)", data: new_inscriptions };
    // } catch (error) {
    //   throw createError({
    //     statusCode: 404,
    //     message: "No valid value" + error,
    //   });
    // }
  })
);

router.get(
  "/paymentmethods",
  defineEventHandler(async (event) => {
    const methods = await prisma.paymentMethod.findMany({ where: { active: true } });
    if (methods) {
      return methods;
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
      return await prisma.inscription.update({
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
export default useBase("/api/inscription", router.handler);
