// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('users',{
  
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:'client'
  }
}, {freezeTableName:true});

module.exports = User;
