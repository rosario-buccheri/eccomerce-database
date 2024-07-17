// routes/auth.js

const express = require('express');
const router = express.Router();
const { logout, getUser } = require('../controllers/auth');
const { authenticateToken } = require('../middleware/auth');
const {logout,getAlllogout, storelogout, updatelogout, deletelogout} = require('../controllers/logout')

router.post('/logout', storelogout);
router.put('/logout/:id', updatelogout);
router.get('/logout', getAlllogout);
router.delete('/logout', deletelogout);



router.get('/logout', authenticateToken, logout);

module.exports = router;
