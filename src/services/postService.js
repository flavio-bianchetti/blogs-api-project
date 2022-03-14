const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const create = async ({ title, content, userId, categoryIds }) => {
  const t = await sequelize.transaction();
  try {
    const published = new Date();
    const updated = new Date();

    const post = await BlogPost.create({ title, content, userId, published, updated },
      { transaction: t });

    categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId: post.id, categoryId }, { transaction: t });
    });

    await t.commit();
    return post.dataValues;
  } catch (err) {
    await t.roolback();
    console.error(err);
    return { error: err.message };
  }
};

const getAll = async () => {
  try {
    const result = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });
    return result;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const find = async (id) => {
  try {
    const post = await BlogPost.findByPk(id);

    if (!post) return { status: 404, message: 'Post does not exist' };

    const result = await BlogPost.findOne({
      where: { id },
      include: [{
        model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    return result;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  create,
  getAll,
  find,
};
