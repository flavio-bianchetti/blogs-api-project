const { validateEmailAndPasswordSchema } = require('../util/validateSchema');
const { User } = require('../models');
const tokenGenerator = require('../util/auth/tokenGenerator');

const create = async ({ email, password }) => {
  try {
    const { error } = validateEmailAndPasswordSchema.validate({ email, password });
    if (error) return { status: 400, message: error.details[0].message };

    const user = await User.findOne({ where: { email } });
    if (!user) return { status: 400, message: 'Invalid fields' };

    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    };
    return tokenGenerator(userInfo);
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  create,
};
