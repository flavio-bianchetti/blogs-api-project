const { Category } = require('../models');
const { validateNameSchema } = require('../util/validateSchema');

const create = async ({ name }) => {
  try {
    const { error } = validateNameSchema.validate({ name });

    if (error) return { status: 400, message: error.details[0].message };

    const category = await Category.findOne({ where: { name } });
    if (category) return { status: 409, message: 'Category name already registered' };

    const newCategory = await Category.create({ name });

    return newCategory;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const getAll = async () => {
  try {
    const category = await Category.findAll();
    return category;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  create,
  getAll,
};
