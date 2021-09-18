'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scores.belongsTo(models.students, {foreignKey : "idStudents"})
    }
  };
  scores.init({
    math: DataTypes.INTEGER,
    physics: DataTypes.INTEGER,
    algorithm: DataTypes.INTEGER,
    programming: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scores',
  });
  return scores;
};