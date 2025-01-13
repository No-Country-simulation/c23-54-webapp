'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      ID_user_role: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ID_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'ID_user',
        },
        onDelete: 'CASCADE',
      },
      ID_role: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles', 
          key: 'ID_role',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRoles');
  }
};
