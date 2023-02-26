'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.Profile, { as:'owner', foreignKey: 'ownerId' }),
      Blog.hasMany(models.Like, {
        as: 'likeReceived',
        foreignKey: 'blogId',
      }),
      Blog.hasMany(models.Comment, {
        as: 'commentReceived',
        foreignKey: 'blogId',
      })
    }
  }
  Blog.init({
    photo: DataTypes.STRING,
    content: DataTypes.STRING,
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};