'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'admins',
      [
        {
          username: 'riski',
          password: "darliana76",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          username: "lisa",
          password: "darliana76",
          updatedAt: new Date(),
          createdAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
