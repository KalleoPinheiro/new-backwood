import { sign } from 'jsonwebtoken';

import User from '../../models/user';
import authConfig from '../../../configs/auth';

class SessionService {
  async run(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Password does not match');
    }

    const { id, name } = user;

    return {
      user: { id, name, email },
      token: sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expires,
      }),
    };
  }
}

export default new SessionService();
