const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const City = require('./city');
const Role = require('./role');

const User = sequelize.define('User', {
  ID_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  last_access_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  ID_city: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'ID_city'
    },
    allowNull: false
  },
  ID_role: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'ID_role',
      defaultValue: 3
    },
  }
}, {
  tableName: 'Users', // Table name in the database
  timestamps: false,
});

module.exports = User;
