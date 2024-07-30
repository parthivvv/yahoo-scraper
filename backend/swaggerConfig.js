// backend/swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yahoo Finance Scraper and Forex Data API',
      version: '1.0.0',
      description: 'API documentation for the Yahoo Finance Scraper and Forex Data project.',
    },
    servers: [
      {
        url: 'https://yahoo-scraper.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Files containing annotations for the Swagger docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
