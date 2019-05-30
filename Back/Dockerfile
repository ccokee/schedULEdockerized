# Usamos un contenedor ligero de node.
FROM node:current-alpine

# Nos movemos a la carpeta api del contenedor
WORKDIR /app

ARG MYSQL_DATABASE_ARG
ARG MYSQL_USER_ARG
ARG MYSQL_PASSWORD_ARG
ARG DATABASE_HOST_ARG
ARG BACK_HOST_ARG

ENV MYSQL_DATABASE=$MYSQL_DATABASE_ARG
ENV MYSQL_USER=$MYSQL_USER_ARG
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD_ARG
ENV BACK_HOST=$BACK_HOST_ARG
ENV DATABASE_HOST=$DATABASE_HOST_ARG

# copiamos package*.json a la carpeta /api del contenedor
COPY package*.json /app/

# Instalamos las dependencias en el contenedor
RUN apk update && \
    apk upgrade && \
    apk add --no-cache curl && \
    npm install

# Back pa dentro del contenedor
COPY . /app/
EXPOSE 40000

# Arrancar la app
CMD ["node", "app.js"]