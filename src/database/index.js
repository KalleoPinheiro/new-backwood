import Sequelize from 'sequelize';

import User from '../app/models/user';
import databaseConfig from '../configs/database';
import logger from '../logger';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);
    try {
      await this.connection.authenticate();
      logger.info('Connection has been established successfully.');
      models.map(model => model.init(this.connection));
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
    }
  }
}

export default new Database();
