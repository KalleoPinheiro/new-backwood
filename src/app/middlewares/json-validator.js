(() => {
  const jsonValidator = async (req, res, next) => {
    if (!req.is('json')) {
      return res.sendStatus(415);
    }
    return next();
  };
  module.exports = jsonValidator;
})();
