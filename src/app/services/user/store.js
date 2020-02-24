import User from '../../models/user';

class UserService {
  async run(name, email, password, admin) {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new Error('User already exists!');
    }

    const user = await User.create({ name, email, password, admin });

    return user;
  }
}

export default new UserService();
