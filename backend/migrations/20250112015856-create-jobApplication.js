'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobApplications', {
      ID_application: {
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
      ID_job_offer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'JobOffers',
          key: 'ID_offer',
        },
        onDelete: 'CASCADE',
      },
      application_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      ID_application_status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ApplicationStatuses',
          key: 'ID_application_status',
        },
      },
      comments: {
        type: Sequelize.TEXT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobApplications');
  }
};
