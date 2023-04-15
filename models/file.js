'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  File.init({
    filename: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    originalname: DataTypes.STRING,
    path: DataTypes.STRING,
    url: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    reviewStatus: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    size: DataTypes.INTEGER.UNSIGNED,
    isTop: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    weight: {
      type: DataTypes.STRING,
      defaultValue: '0',
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'File',
  });
  File.beforeCreate((file) => {
    return File.max('order').then(maxOrder => {
      file.order = (maxOrder || 0) + 1;
    });
  });
  return File;
};