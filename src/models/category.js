const Category = (sequelize, DataTypes) =>
  sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });

module.exports = Category;
