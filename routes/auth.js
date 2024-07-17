// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {register,getAllauth, storeauth, updateauth, deleteauth} = require('../controllers/auth')



// Registrazione utente
router.post('/register', register);

router.post('/auth', storeauth);
router.put('/auth/:id', updateauth);
router.get('/auth', getAllauth);
router.delete('/auth', deleteauth);


module.exports = router;
