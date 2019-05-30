### Schedule-front: multistaged build

# Añadimos palceholders de argumentos para la construccion
ARG MYSQL_HOST_ARG
ARG MYSQL_DATABASE_ARG
ARG MYSQL_USER_ARG
ARG MYSQL_PASSWORD_ARG
ARG DATABASE_HOST_ARG
ARG BACK_HOST_ARG

## Frontend build Stage
FROM node:current-alpine AS develop-stage
LABEL David + Adrian + Jorge

# Añadimos placeholders para el environment

ENV MYSQL_HOST=$MYSQL_HOST_ARG
ENV MYSQL_DATABASE=$MYSQL_DATABASE_ARG
ENV MYSQL_USER=$MYSQL_USER_ARG
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD_ARG
ENV BACK_HOST=$BACK_HOST_ARG
ENV DATABASE_HOST=$DATABASE_HOST_ARG


# Seteamos el workdir que vamos a usar dentro del contenedor
WORKDIR /app

# Copiamos el package json del proyecto e instalamos las dependencias
COPY package*.json ./
RUN npm install
RUN yarn global add quasar-cli vue-cli
COPY . .

## Build stage
# Añadimos placeholders para el environment

ENV MYSQL_HOST=$MYSQL_HOST_ARG \
MYSQL_DATABASE=$MYSQL_DATABASE_ARG \
MYSQL_USER=$MYSQL_USER_ARG \
MYSQL_PASSWORD=$MYSQL_PASSWORD_ARG \
BACK_HOST=$BACK_HOST_ARG \
DATABASE_HOST=$DATABASE_HOST_ARG

FROM develop-stage as build-stage
LABEL David + Adrian + Jorge

# Hacemos la construccion del frontend
RUN yarn
RUN quasar build

## Signing stage
FROM alpine:latest AS signing-stage

WORKDIR /certs
RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssl && \
    echo "$SCHEDULECERT_PASSWORD" >> passfile.txt && \
    openssl genrsa -des3 -passout pass:SCHEDULECERT -out server.pass.key 2048 && \
    openssl rsa -passin pass:SCHEDULECERT -in server.pass.key -out server.key && \
    rm server.pass.key && echo "removed" && rm passfile.txt && \
    openssl req -new -key server.key -out server.csr -subj "/C=SP/ST=LEON/L=LEON/O=UNILEON/OU=G13/CN=server" && \
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

## Deploy Stage
FROM httpd:alpine AS deploy
LABEL David + Adrian + Jorge

# Copiamos el frontend distribuible del constructor al contenedor
COPY --from=build-stage /app/dist/spa-mat/ /usr/local/apache2/htdocs/
COPY --from=signing-stage /certs/* /usr/local/apache2/conf/

# Copiamos la configuración del servicio al contenedor
COPY ./schedule.conf /usr/local/apache2/conf/httpd.conf

# Incluir todos los modulos extra de ssl
RUN sed -i \
        -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
        -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
        conf/httpd.conf && \
    apk update && \
    apk upgrade && \
    apk add --no-cache curl

EXPOSE 80
EXPOSE 443

COPY httpd-foreground /usr/local/bin/

CMD ["httpd-foreground"]