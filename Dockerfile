FROM mariadb:latest
FROM node:12

ENV  MARIADB_ROOT_PASSWORD gssiot
ENV  MARIADB_DATABASE sfims

RUN  /bin/bash -c 'apt-get update && apt-get install -y git'
RUN  /bin/bash -c 'mkdir sfims'
RUN  /bin/bash -c 'cd sfims'
RUN  /bin/bash -c 'git init'
RUN  /bin/bash -c 'git clone https://lalalalz:wlstn4050!@github.com/lalalalz/sfims.git'

RUN  npm install

COPY ./db/table_ver3.sql /docker-entrypoint-initdb.d/
COPY ./db/view_ver3.sql /docker-entrypoint-initdb.d/