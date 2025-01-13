const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./country');

const City = sequelize.define('City', {
  ID_city: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_country: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'ID_country',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Cities', // Table name in the database
  timestamps: false,
});

module.exports = City;
