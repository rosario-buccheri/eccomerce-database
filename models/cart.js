const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definizione del modello Cart
const Cart = sequelize.define('Cart', {
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
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = Cart;
