const express = require('express');
const router = express.Router();
const { 
    postSignup, 
    postLogin,
    postGetUser } = require('../controllers/auth');

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.post('/getuser', postGetUser);


module.exports = router;