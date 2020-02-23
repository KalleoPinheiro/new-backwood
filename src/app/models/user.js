import Sequelize, { Model } from 'sequelize';
import { compare, hash } from 'bcrypt';

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      { sequelize: connection }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
