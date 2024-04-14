FROM postgres:alpine

# Variáveis de ambiente para o PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=myappdb

# Copiando os arquivos de inicialização do banco de dados
COPY init-db.sql /docker-entrypoint-initdb.d/

# Porta para o banco PostgreSQL
EXPOSE 5432

