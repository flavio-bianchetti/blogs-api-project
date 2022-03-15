const { User } = require('../models');
const tokenGenerator = require('../util/auth/tokenGenerator');
const { validateUserSchema } = require('../util/validateSchema');

const create = async ({ displayName, email, password, image }) => {
  try {
    const { error } = validateUserSchema.validate({ displayName, email, password, image });

    if (error) return { status: 400, message: error.details[0].message };

    const user = await User.findOne({ where: { email } });
    if (user) return { status: 409, message: 'User already registered' };

    await User.create({ displayName, email, password, image });

    return tokenGenerator({ displayName, email, image });
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const find = async (id) => {
  try {
    const user = await User.findByPk(Number(id));
    return user;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const exclude = async (id) => {
  try {
    const user = await User.findByPk(Number(id));
    if (!user) return { status: 404, message: 'User not found' };

    await User.destroy({ where: { id } });
    return true;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  create,
  getAll,
  find,
  exclude,
};
