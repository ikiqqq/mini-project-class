'use strict';

const students = require("../controllers/students");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idStudents: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : "students",
          key : "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      math: {
        type: Sequelize.INTEGER
      },
      physics: {
        type: Sequelize.INTEGER
      },
      algorithm: {
        type: Sequelize.INTEGER
      },
      programming: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('scores');
  }
};