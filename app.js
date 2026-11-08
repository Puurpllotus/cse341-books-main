import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use(router);

// Home route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

export default app;