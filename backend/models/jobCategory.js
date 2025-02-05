const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobCategory = sequelize.define('JobCategory', {
  ID_job_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'JobCategories', // Table name in the database
  timestamps: false,
});

module.exports = JobCategory;
