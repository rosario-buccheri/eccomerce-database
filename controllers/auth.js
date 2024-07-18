// controllers/auth.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../config/keys');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ msg: 'utente  esiste già' });
    }
const hpassword = await bcrypt.hash(password,10)
  
    user = await User.create({
      name:name,
      email:email,
      password:hpassword,
    });

    res.json({ msg: 'utente registrato normamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'email non trovata' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      }

      const token = jwt.sign({ user }, jwtSecret, {expiresIn: '30d'});
      res.status(200).json({ message: 'Accesso effettuato' });
      
    } catch (error) {
      console.error('Errore durante il login:', error);
      res.status(500).json({ message: 'Errore durante il login' });
    }
  };
