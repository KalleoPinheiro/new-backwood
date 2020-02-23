import UserService from '../services/user-service';

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, admin } = req.body;

      const user = await UserService.run(name, email, password, admin);

      res
        .status(200)
        .json({ name: user.name, email: user.email, admin: user.admin });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new UserController();
