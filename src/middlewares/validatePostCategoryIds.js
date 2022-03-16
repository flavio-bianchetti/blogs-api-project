const { Category } = require('../models');

const validatePostCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  return Promise.all(categoryIds
    .map((categoryId) => Category.findOne({ where: { id: categoryId } })))
      .then((categories) => {
        if (categories.some((category) => !category)) {
          return res.status(400).json({ message: '"categoryIds" not found' });
        }
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
      });
};

module.exports = validatePostCategoryIds;
