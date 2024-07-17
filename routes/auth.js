// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Registrazione utente
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se l'utente esiste già
  let user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).send('User already exists');
  }

  // Cripta la password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crea e salva il nuovo utente
  user = await User.create({ name, email, password: hashedPassword, role: 'user' });
  const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret_key');
  res.send({ user, token });
});

module.exports = router;
