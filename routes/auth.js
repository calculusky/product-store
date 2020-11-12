const express = require('express');
const router = express.Router();
const { postSignup } = require('../controllers/auth');

router.post('/signup', postSignup);

module.exports = router;