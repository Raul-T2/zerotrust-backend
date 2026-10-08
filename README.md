# Backend - Zero Trust (Actividad 1)

Arquitectura hexagonal (puertos y adaptadores):

- `src/domain`          Entidades (User)
- `src/application`     Casos de uso y puertos (contratos)
- `src/infrastructure`  Adaptadores: HTTP/Express, JWT, bcrypt, repositorio, logger
- `src/main.js`         Composicion: conecta adaptadores con casos de uso

## Ejecutar
    npm install
    cp .env.example .env     # y edita JWT_SECRET
    npm start

## Endpoints
- `GET  /api/health`
- `POST /api/auth/login`  { username, password } -> { token, user }
- `GET  /api/dashboard`   Authorization: Bearer <token>
