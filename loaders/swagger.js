const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Loading yml.safeLoad to avoid errors
const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../swagger.yml'), 'utf8'));

module.exports = (app) => {
  // Serves Swagger API documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}