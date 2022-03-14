const { Category } = require('../models');

const validatePostCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  try {
    await categoryIds.map(async (categoryId) => {
      const category = await Category.findOne({ where: { id: categoryId } });
      if (!category) return res.status(400).json({ message: '"categoryIds" not found' });
    });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = validatePostCategoryIds;
