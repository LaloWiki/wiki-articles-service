# WikiGestor - Articles Service

Este microservicio se encarga del CRUD completo de artículos para la aplicación WikiGestor.

## Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT) para proteger rutas
- Swagger para documentación de la API

## Endpoints principales

- `GET /articulos` - Obtener todos los artículos
- `POST /articulos` - Crear un nuevo artículo (requiere token JWT)
- `GET /articulos/{id}` - Obtener un artículo por ID
- `PUT /articulos/{id}` - Actualizar un artículo por ID (requiere token JWT)
- `DELETE /articulos/{id}` - Eliminar un artículo por ID (requiere token JWT)

## Variables de entorno

- `PORT` - Puerto donde corre el servicio (ejemplo: 3002)
- `MONGODB_URI` - URL de conexión a MongoDB Atlas
- `JWT_SECRET` - Clave secreta para validar tokens JWT

## Cómo ejecutar el servicio localmente

1. Instalar dependencias:

```bash
npm install
