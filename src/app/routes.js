const express = require('express');
const jsonValidator = require('./middlewares/json-validator');

const router = express.Router();

(() => {
  router.get('/', (_, res) => {
    res.status(200).json({ message: 'Working' });
  });

  router.post('/test', jsonValidator, (req, res) => {
    res.status(200).json(req.body);
  });

  module.exports = router;
})();
