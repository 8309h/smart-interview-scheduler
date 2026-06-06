import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HireSync API',
      version: '1.0.0',
      description: 'Smart Interview Scheduling Platform API documentation',
    },
    servers: [
      { url: 'http://localhost:5000/api/v1', description: 'Local server' },
    ],
  },
  apis: ['./src/routes/**/*.js', './src/controllers/**/*.js'],
};

export default swaggerJSDoc(options);
