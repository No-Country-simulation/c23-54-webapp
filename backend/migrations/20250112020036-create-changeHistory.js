'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChangeHistories', {
      ID_change: {
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
        allowNull: false,
      },
      ID_entity: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Entities',
          key: 'ID_entity',
        },
        allowNull: false,
      },
      ID_action: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Actions',
          key: 'ID_action',
        },
        allowNull: false,
      },
      change_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      change_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChangeHistories');
  }
};
