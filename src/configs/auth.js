require('dotenv').config();

module.exports = {
  expires: process.env.EXPIRES_IN,
  secret: process.env.SECRET_KEY,
};
