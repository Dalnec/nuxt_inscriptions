// server/middleware/sendImage.js
import { createReadStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");
  console.log("path", path);

  // Convertir pipeline a una función que devuelva una promesa
  const pipelineAsync = promisify(pipeline);

  // Ruta de la imagen que quieres enviar
  const imagePath = "./public/uploads/" + path;

  // Establecer el tipo de contenido de la respuesta
  event.node.res.setHeader("Content-Type", "image/*");

  // Crear un stream de lectura para el archivo de imagen
  const readStream = createReadStream(imagePath);

  // Utilizar pipeline para enviar el archivo al cliente
  await pipelineAsync(readStream, event.node.res);
});
