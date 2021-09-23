const express = require('express');
const app = express();
require('dotenv').config();

const loaders = require('./loaders');

const { PORT } = require('./config');

async function startServer() {

  // Init loaders
  loaders(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();