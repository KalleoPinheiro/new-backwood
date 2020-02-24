import User from '../../models/user';

class UserService {
  async run(id, body) {
    const { email, oldPassword } = body;
    const user = await User.findByPk(id);

    if (user && user.email !== email && email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new Error('User already exists!');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new Error('Password does not match!');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const newUser = await user.update(body);
    return { id, name: newUser.name, email, admin: newUser.admin };
  }
}

export default new UserService();
