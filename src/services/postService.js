const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
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

module.exports = {
  create,
};
