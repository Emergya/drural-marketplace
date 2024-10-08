# Drural Backend

Este repositorio contiene el código del backend de **Drural**, una aplicación web desarrollada en Django y desplegada en un entorno Docker.

## Tabla de Contenidos

1. [Requisitos previos](#requisitos-previos)
2. [Comandos útiles](#comandos-útiles)

   - [Ejecución de pruebas](#ejecución-de-pruebas)
   - [Aplicación de migraciones](#aplicación-de-migraciones)
   - [Mostrar cambios en el esquema GraphQL](#mostrar-cambios-en-el-esquema-graphql)
   - [Exportar esquema GraphQL](#generar-esquema-graphql)

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Instalar infraestructura](../infraestructure/README.md)

## Comandos útiles

Todo los comandos deben lanzarse en el directorio de infraestructura y con el backend levantado.

### Ejecución de pruebas

```bash
docker-compose exec api pytest
```

### Aplicación de migraciones

```bash
docker-compose exec api python manage.py migrate
```

### Mostrar cambios en el esquema GraphQL

```bash
docker-compose exec api python3 manage.py get_graphql_schema
```

### Exportar esquema GraphQL

```bash
python3 manage.py get_graphql_schema > saleor/graphql/schema.graphql
```
