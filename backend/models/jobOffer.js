const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const City = require('./city');
const Modality = require('./modality');
const JobCategory = require('./jobCategory');

const JobOffer = sequelize.define('JobOffer', {
  ID_offer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'ID_user'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  salary_range_min: {
    type: DataTypes.DECIMAL
  },
  salary_range_max: {
    type: DataTypes.DECIMAL
  },
  publication_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deadline: {
    type: DataTypes.DATE
  },
  ID_city: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'ID_city'
    }
  },
  status: {
    type: DataTypes.STRING
  },
  ID_modality: {
    type: DataTypes.INTEGER,
    references: {
      model: Modality,
      key: 'ID_modality'
    }
  },
  ID_job_category: {
    type: DataTypes.INTEGER,
    references: {
      model: JobCategory,
      key: 'ID_job_category'
    }
  }
  }, {
  tableName: 'JobOffers', // Table name in the database
  timestamps: false,
});

module.exports = JobOffer;
