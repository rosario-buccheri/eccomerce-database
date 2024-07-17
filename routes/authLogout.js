// routes/auth.js

const express = require('express');
const router = express.Router();
const { logout, getUser } = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');

router.get('/logout', authenticateToken, logout);

module.exports = router;
