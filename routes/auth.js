// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {register} = require('../controllers/auth')
//prova
const User = require('../models/user');


// Registrazione utente
router.post('/register', register);


//prova registrazione utende.
router.post('/register', async (req, res) => {
    const { name, email, password,role } = req.body;
  
    try {
      // Verifica se l'utente esiste già
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'utente esistente' });
      }
  
      // Hash della password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Crea un nuovo utente
      user = await User.create({
        name,
        email,
        password: hashedPassword
      });
  
      res.status(201).json({ msg: 'ok!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error router');
    }
  });
  










module.exports = router;
