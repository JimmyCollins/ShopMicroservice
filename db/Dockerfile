FROM mysql:5.7.15

MAINTAINER Jimmy

ENV MYSQL_DATABASE=shop \
    MYSQL_ROOT_PASSWORD=root

ADD db-schema-backup-with-sample-data.sql /docker-entrypoint-initdb.d

EXPOSE 3306