import UserStoreService from '../services/user/store';
import UserUpdateService from '../services/user/update';

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, admin } = req.body;

      const user = await UserStoreService.run(name, email, password, admin);

      res
        .status(200)
        .json({ name: user.name, email: user.email, admin: user.admin });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { name, email, admin } = await UserUpdateService.run(
        req.user_id,
        req.body
      );

      res.status(200).json({ name, email, admin });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new UserController();
