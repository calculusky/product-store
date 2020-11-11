const User = require('../models/user');
const { hash, compare } = require('bcryptjs');

const {
    isEmail,
    isEmpty,
    matches,
    normalizeEmail,
    isAlpha
} = require('validator');



exports.postSignup = (req, res, next) => {
    const {
        name,
        email,
        password,
        confirmpassword
    } = req.body;

    //validate inputs
    const errors = [];

}