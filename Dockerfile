FROM mariadb:latest

ENV MARIADB_ROOT_PASSWORD gssiot
ENV MARIADB_DATABASE SFIMS

COPY ./db/table.sql /docker-entrypoint-initdb.d/
COPY ./db/view.sql /docker-entrypoint-initdb.d/

VOLUME /var/lib/mysql