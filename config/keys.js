// config/keys.js

module.exports = {
    jwtSecret: 'il_tuo_segreto_JWT_qui',
  };
  // config/keys.js

require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
};
