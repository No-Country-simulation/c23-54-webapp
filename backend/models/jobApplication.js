const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const JobOffer = require('./jobOffer');
const ApplicationStatus = require('./applicationStatus');

const JobApplication = sequelize.define('JobApplication', {
  ID_application: {
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
  ID_job_offer: {
    type: DataTypes.INTEGER,
    references: {
      model: JobOffer,
      key: 'ID_job_offer'
    }
  },
  application_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ID_application_status: {
    type: DataTypes.INTEGER,
    references: {
      model: ApplicationStatus,
      key: 'ID_application_status'
    }
  },
  comments: {
    type: DataTypes.TEXT
  }
  }, {
  tableName: 'JobApplications', // Table name in the database
  timestamps: false,
});

module.exports = JobApplication;
