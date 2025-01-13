'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobOffers', {
      ID_offer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      salary_range_min: {
        type: Sequelize.DECIMAL,
      },
      salary_range_max: {
        type: Sequelize.DECIMAL,
      },
      publication_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ID_modality: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Modalities',
          key: 'ID_modality',
        },
        allowNull: false,
      },
      ID_job_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'JobCategories',
          key: 'ID_job_category',
        },
        allowNull: false,
      },
      ID_city: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID_city',
        },
        allowNull: false,
      },
      ID_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'ID_user',
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobOffers');
  }
};
