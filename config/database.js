const { Sequelize } = require('sequelize');
// Creiamo una nuova istanza di Sequelize per connetterci al database
const sequelize = new Sequelize('ecommerce_db', 'root', 'Rosario17/', {
  host: 'localhost',
  dialect: 'mysql',
  define:{timestamps:false}
});

module.exports = sequelize;
