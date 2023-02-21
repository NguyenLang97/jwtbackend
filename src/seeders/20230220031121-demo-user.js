'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'User',
      [
        {
          email: 'nguyenvanlang1997@gmail.com',
          password: '123',
          username: 'John',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'nguyenvanlang1997@gmail.com',
          password: '123',
          username: 'John',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'nguyenvanlang1997@gmail.com',
          password: '123',
          username: 'John',
          createdAt: new Date(),
          updatedAt: new Date()
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
