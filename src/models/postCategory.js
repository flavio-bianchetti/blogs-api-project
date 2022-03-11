module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {}, { timestamps: false, tableName: 'PostsCategories', underscored: true });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: 'PostCategory',
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: 'PostCategory',
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };
  return PostCategory;
};
