const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);
const { Op } = Sequelize;

const findOneResult = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    attributes: ['title', 'content', 'userId'],
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
   });
   return result;
};

// const create = async ({ title, content, userId, categoryIds }) => {
//   const t = await sequelize.transaction();
//   try {
//     const p = await BlogPost
//       .create({ title, content, userId, published: new Date(), updated: new Date() },
//         { transaction: t });

//     return Promise.all(categoryIds.map((c) => PostCategory.create({ postId: p.id, categoryId: c },
//       { transaction: t }))).then(() => {
//           t.commit();
//           return p.dataValues; 
//       }).catch(() => {
//           t.rollback();
//           return { error: 'Error creating post' }; 
//       });
//   } catch (err) {
//     await t.roolback();
//     console.error(err);
//     return { error: err.message };
//   }
// };

const create = async ({ title, content, userId, categoryIds }) => {
  const t = await sequelize.transaction();
  return BlogPost.create({ title, content, userId, published: new Date(), updated: new Date() },
    { transaction: t })
    .then((p) => Promise
      .all(categoryIds.map((c) => PostCategory.create({ postId: p.id, categoryId: c },
        { transaction: t })))
        .then(() => {
          t.commit();
          return p.dataValues; 
        }).catch(() => {
          t.rollback();
          return { error: 'Error creating post' }; 
        }))
    .catch((err) => {
      t.rollback();
      console.error(err);
      return { error: err.message };
    });
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

const update = async ({ postId, title, content, userId }) => {
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost.findByPk(postId);

    if (!post) return { status: 404, message: 'Post does not exist' };

    if (post.dataValues.userId !== userId) return { status: 401, message: 'Unauthorized user' };

    await BlogPost
      .update({ title, content, updated: new Date() }, { where: { id: postId }, transaction: t });

    await t.commit();

    return findOneResult(postId);
  } catch (err) {
    await t.roolback();
    console.error(err);
    return { error: err.message };
  }
};

const exclude = async ({ postId, userId }) => {
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost.findByPk(postId);

    if (!post) return { status: 404, message: 'Post does not exist' };

    if (post.dataValues.userId !== userId) return { status: 401, message: 'Unauthorized user' };

    const result = await BlogPost.destroy({ where: { id: postId }, transaction: t });

    await t.commit();

    return result;
  } catch (err) {
    await t.roolback();
    console.error(err);
    return { error: err.message };
  }
};

// solução de busca adaptada daquela encontrada na documentação:
// https://sequelize.org/v4/manual/tutorial/querying.html#combinations
const search = async (searchTerm) => {
  try {
    const result = await BlogPost.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${searchTerm}%` } },
          { content: { [Op.like]: `%${searchTerm}%` } }],
      },
      include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
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
  update,
  exclude,
  search,
};
