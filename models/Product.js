const { Model } = require('sequelize');
const sequelize = require('../config/database');

const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
  idProducts: { 
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey:true,
    autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Product;


