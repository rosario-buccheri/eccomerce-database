// middleware/auth.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

const authMiddleware = (req, res, next) => {
  if ( req.header('Authorization')) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send({ error: 'Invalid token.' });
    }
  } else {
    res.status(400).send({ error: 'Access denied. No token provided.' });
  }
  
};



module.exports = authMiddleware;
