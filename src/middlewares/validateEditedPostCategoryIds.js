const validateEditedPostCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
  next();
};

module.exports = validateEditedPostCategoryIds;
