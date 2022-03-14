const { validateIdParamsSchema } = require('../util/validateSchema');

const validateIdParams = (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = validateIdParamsSchema.validate({ id });
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = validateIdParams;
