const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');

const UserRole = sequelize.define('UserRole', {
  ID_user_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'ID_user'
    }
  },
  ID_role: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'ID_role'
    }
  }
  }, {
  tableName: 'UserRoles', // Table name in the database
  timestamps: false,
});

module.exports = UserRole;
