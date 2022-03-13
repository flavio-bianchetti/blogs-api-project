const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const validateJWTMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) return res.status(401).json({ message: 'User token not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWTMiddleware;
