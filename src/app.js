const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');
const routes = require('./app/routes');
require('dotenv').config();

(() => {
  const app = express();
  app.use(helmet());
  app.use(express.json({ limit: '300kb' }));
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      name: process.env.API_NAME,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 60000 * 60 * 24,
      },
    })
  );

  // Load Routes
  app.use(routes);

  module.exports = app;
})();
