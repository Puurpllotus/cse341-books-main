import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const directory = path.dirname(filename);

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: 'API documentation for the CSE 341 Books project',
    },
   servers: [
  {
    url: 'http://localhost:3000',
    description: 'Development server',
  },
  {
    url: 'https://cse341-books-api-gpd2.onrender.com',
    description: 'Production server',
  },
],
  },
  apis: [
    path.join(directory, 'src', 'router.js'),
    path.join(directory, 'app.js'),
  ],
};

const swaggerSpecification = swaggerJsdoc(options);

fs.writeFileSync(
  path.join(directory, 'swagger.json'),
  JSON.stringify(swaggerSpecification, null, 2)
);

console.log('Swagger documentation generated.');