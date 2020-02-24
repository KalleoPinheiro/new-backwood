import SessionService from '../services/session/store';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const access = await SessionService.run(email, password);

      res.status(200).json(access);
    } catch (error) {
      let status;
      switch (error.message) {
        case 'User not found':
          status = 401;
          break;
        case 'Password does not match':
          status = 401;
          break;

        default:
          status = 401;
          break;
      }
      res.status(status).json({ error: error.message });
    }
  }
}

export default new SessionController();
