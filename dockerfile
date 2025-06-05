# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
# Esto permite que npm install use la caché de Docker si solo cambian estas
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
# Ignora archivos como .git, node_modules (si tienes .dockerignore)
COPY . .

# Expone el puerto en el que tu aplicación Node.js va a escuchar (ej. 3001, según tu app.js)
EXPOSE 3001

CMD ["node", "app.js"]