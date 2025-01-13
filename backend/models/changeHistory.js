const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Entity = require('./entity');
const Action = require('./action');

const ChangeHistory = sequelize.define('ChangeHistory', {
  ID_change: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'ID_user',
    },
  },
  ID_entity: {
    type: DataTypes.INTEGER,
    references: {
      model: Entity,
      key: 'ID_entity',
    },
  },
  ID_action: {
    type: DataTypes.INTEGER,
    references: {
      model: Action,
      key: 'ID_action',
    },
  },
  change_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  change_description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'ChangeHistories', // Table name in the database
  timestamps: false,
});

module.exports = ChangeHistory;
