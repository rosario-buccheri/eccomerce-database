const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definizione del modello Cart
const Cart = sequelize.define('Cart', {
  idCart: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey:true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'idProducts'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = Cart;
