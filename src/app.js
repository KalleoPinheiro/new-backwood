import 'dotenv/config';
import './database';

import express from 'express';
import helmet from 'helmet';

import routes from './app/routes';

class App {
  constructor() {
    this.app = express();
    this.middlawares();
    this.routes();
  }

  middlawares() {
    this.app.use(helmet());
    this.app.use(express.json({ limit: '300kb' }));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
