const { Sequelize } = require('sequelize');

// Creiamo una nuova istanza di Sequelize per connetterci al database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;
