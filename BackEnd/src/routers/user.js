const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwt');
const { login,signup } = require('../controller/user');


router.post('/signup', signup);
router.post('/login', verifyToken, login);

module.exports = router
