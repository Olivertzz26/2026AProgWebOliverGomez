# Examen Práctico Final — Programación Web

## Proyecto: Sistema de Fútbol con Microservicios

Este proyecto es una solución distribuida basada en microservicios para administrar información relacionada con fútbol.

El sistema contiene:

- 3 microservicios backend
- 3 microservicios frontend
- 1 base de datos PostgreSQL
- Contenedores Docker
- Docker Compose
- Ejecución dentro de Vagrant
- Arquitectura Hexagonal en backend

---

## Entidades utilizadas

Las entidades del sistema son:

1. Equipos
2. Jugadores
3. Partidos

Cada entidad cuenta con su propio microservicio backend, frontend y tabla en PostgreSQL.

---

## Microservicios Backend

### Backend Equipos

Puerto: `3001`

Rutas:

- `GET /equipos`
- `GET /equipos/:id`
- `POST /equipos`
- `PUT /equipos/:id`
- `DELETE /equipos/:id`

---

### Backend Jugadores

Puerto: `3002`

Rutas:

- `GET /jugadores`
- `GET /jugadores/:id`
- `POST /jugadores`
- `PUT /jugadores/:id`
- `DELETE /jugadores/:id`
- `GET /equipos`

---

### Backend Partidos

Puerto: `3003`

Rutas:

- `GET /partidos`
- `GET /partidos/:id`
- `POST /partidos`
- `PUT /partidos/:id`
- `DELETE /partidos/:id`
- `GET /equipos`

---

## Microservicios Frontend

### Frontend Equipos

Puerto: `5171`

URL:

```text
http://localhost:5171
