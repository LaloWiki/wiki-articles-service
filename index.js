const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRoutes = require('./routes/articles');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3002;

// 🔁 Conexión a MongoDB Atlas usando .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/articles', articleRoutes);

// Documentación Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de servicio de artículos',
    version: '1.0.0',
    description: 'Documentación del microservicio de artículos',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de artículos corriendo en http://localhost:${PORT}`);
});
