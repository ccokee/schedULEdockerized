# Usamos un contenedor ligero de node.
FROM mhart/alpine-node:latest
LABEL Jorge Curbera <jcurbr00@estudiantes.unileon.es>

# Nos movemos a la carpeta api del contenedor
WORKDIR /api

# copiamos package*.json a la carpeta /api del contenedor
COPY package*.json /api/

# Instalamos las dependencias en el contenedor
RUN npm install -g nodemon
RUN npm install

# Back pa dentro del contenedor
COPY . /api/
EXPOSE 40000

# Arrancar la app
CMD ["node", "app.js"]