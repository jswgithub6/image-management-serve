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
    reviewStatus: DataTypes.STRING,
    size: DataTypes.INTEGER.UNSIGNED,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};