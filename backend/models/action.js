const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Action = sequelize.define('Action', {
  ID_action: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_action: {
    type: DataTypes.TEXT,
  },
  description_action: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'Actions', // Table name in the database
  timestamps: false,
});

module.exports = Action;
