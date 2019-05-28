#Usamos la ultima version de ubuntu
FROM ubuntu:latest
LABEL Jorge Curbera <jcurbr00@estudiantes.unileon.es>

#Actualizamos
RUN apt-get -yqq update \
    && apt-get -yqq upgrade

# Instalar apache y demas purrela.
RUN DEBIAN_FRONTEND=noninteractive apt-get -yqq install apache2 \
     curl \
     && apt-get -q clean \
     && rm -rf /var/lib/apg/lists

# Habilitar mods php y apache
RUN a2enmod rewrite

# Publicar puerto 80
EXPOSE 80

# Añadir aplicacion
RUN mkdir -p /var/www/schedULE
WORKDIR /var/www/schedULE
COPY ./dist/spa-mat/ .

RUN chown -R www-data:www-data /var/www/schedULE

# Copia la config creada en el contenedor
COPY schedule.conf /etc/apache2/sites-enabled/000-default.conf
RUN echo "AddType image/x-icon .ico" >> /etc/apache2/apache2.conf
COPY ./dist/spa-mat/statics/favicon.png .
# Hacer magia con el webkit


# Arrancar apache
CMD /usr/sbin/apache2ctl -D FOREGROUND