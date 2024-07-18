// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {register,login} = require('../controllers/auth')



// Registrazione utente
router.post('/register', register);
//login
router.post('/login', login);


module.exports = router;
