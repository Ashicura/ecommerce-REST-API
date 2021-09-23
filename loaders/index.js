const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');
const swagger = require('./swagger');

module.exports = async (app) => {

  // Express middlewares
  const expressApp = await expressLoader(app);

  // Passport middleware
  const passport = await passportLoader(expressApp);

  // API route handler
  await routeLoader(app, passport);

  // Swagger
  await swaggerLoader(app);
  
  // Error Handler
  app.use((err, req, res, next) => {

    const { message, status } = err;
  
    return res.status(status).send({ message });
  });
}