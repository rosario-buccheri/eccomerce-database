// controllers/auth.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { jwtSecret } = require('../config/keys');
const { register } = require('../controllers/auth');


router.post('/register', register);
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
  
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Crea nuovo utente
    user = await User.create({
      name,
      email,
      password, 
    });

    // JWT token

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
