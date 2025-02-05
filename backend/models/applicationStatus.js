const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApplicationStatus = sequelize.define('ApplicationStatus', {
  ID_application_status: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'ApplicationStatuses', // Table name in the database
  timestamps: false,
});

module.exports = ApplicationStatus;
