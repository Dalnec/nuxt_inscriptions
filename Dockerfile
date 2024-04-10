# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de Node.js
COPY package*.json .

# Instalar las dependencias
RUN npm i

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar el esquema de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Exponer el puerto que el servidor usará
EXPOSE 3000

# Configurar las variables de entorno
ENV HOST=0.0.0.0 PORT=3000

# Comando para iniciar el servidor
CMD ["npm", "start"]