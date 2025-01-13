const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const JobOffer = require('./jobOffer');

const Notification = sequelize.define('Notification', {
  ID_notification: {
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
  message: {
    type: DataTypes.TEXT
  },
  type: {
    type: DataTypes.STRING
  },
  send_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  }, {
  tableName: 'Notifications', // Table name in the database
  timestamps: false,
});

module.exports = Notification;
