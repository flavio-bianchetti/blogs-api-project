const { validateTitleContentAndCategoryIdsSchema } = require('../util/validateSchema');

const validatePostSchema = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user.dataValues;
  const { error } = validateTitleContentAndCategoryIdsSchema
    .validate({ title, content, userId: id, categoryIds });
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = validatePostSchema;
