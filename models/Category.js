const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definizione del modello Category
const Category = sequelize.define('Category', {
  idCategories: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey:true,
    autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

});

module.exports = Category;
