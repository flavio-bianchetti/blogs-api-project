const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (data) => {
  const SECRET = process.env.JWT_SECRET;
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data }, SECRET, jwtConfig);
    return { token };
  } catch (err) {
    console.error(err);
    return { tokenError: err.message };
  }
};
