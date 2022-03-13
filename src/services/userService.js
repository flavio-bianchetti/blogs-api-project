const Joi = require('joi');
const { User } = require('../models');
const tokenGenerator = require('../util/auth/tokenGenerator');

const validateSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const create = async ({ displayName, email, password, image }) => {
  try {
    const { error } = validateSchema.validate({ displayName, email, password, image });

    if (error) return { status: 400, message: error.details[0].message };

    const user = await User.findOne({ where: { email } });
    if (user) return { status: 409, message: 'User already registered' };

    await User.create({ displayName, email, password, image });

    return tokenGenerator(user);
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  create,
};
