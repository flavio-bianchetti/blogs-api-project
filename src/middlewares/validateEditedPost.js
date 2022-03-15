const { validateEditedPostSchema } = require('../util/validateSchema');

const validateEditedPost = (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const { error } = validateEditedPostSchema
      .validate({ postId: id, title, content, userId: req.user.dataValues.id });
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = validateEditedPost;
