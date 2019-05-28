#Usamos la ultima version de ubuntu
FROM ubuntu:latest
LABEL Jorge Curbera <jcurbr00@estudiantes.unileon.es>

#Actualizamos
RUN apt-get update
RUN apt-get -y upgrade

# Instalar apache y demas purrela.
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install apache2 libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-gd php-pear php-apc php7.0-curl php7.0-ldap php7.0-cgi php7.0-json curl lynx-cur

# Habilitar mods php y apache
RUN phpenmod openssl
RUN a2enmod php7.0
RUN a2enmod rewrite

# Actualizar php.ini para permitir <? ?> tags y reducir el loggeo.
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.0/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.0/apache2/php.ini

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# Publicar puerto 80
EXPOSE 80

# Añadir aplicacion
RUN mkdir /var/www/schedULE
COPY . /var/www/schedULE
RUN chown -R www-data:www-data /var/www/schedULE

# Copia la config creada en el contenedor
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

# Arrancar apache
CMD /usr/sbin/apache2ctl -D FOREGROUND