class IndexController {
  async index(_, res) {
    res.status(200).json({ message: 'Working!' });
  }
}
export default new IndexController();
