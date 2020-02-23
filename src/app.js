const express = require('express');
const helmet = require('helmet');
const routes = require('./app/routes');
require('dotenv').config();

(() => {
  const app = express();
  app.use(helmet());
  app.use(express.json({ limit: '300kb' }));

  // Load Routes
  app.use(routes);

  module.exports = app;
})();
