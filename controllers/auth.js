const User = require('../models/user');
const { hash, compare } = require('bcryptjs');
const { throwError, normalizeName } = require('../utilities/helpers');

const {
    isEmail,
    isEmpty,
    normalizeEmail,
    isAlphanumeric
} = require('validator');



exports.postSignup = async (req, res, next) => {
    const {
        fullname,
        email,
        password,
        confirmpassword
    } = req.body;

    //validate inputs and sanitize data
    const errors = [];
    if(isEmpty(name)){
        errors.push('Invalid name')
    }
    if(!isEmail(email)){
        errors.push('Invalid email')
    }
    if(!isAlphanumeric(password)){
        errors.push('Invalid password')
    }
    if (password !== confirmpassword) {
        errors.push('password do not match');
    }

    try {
        if(errors.length > 0){
            throwError({ message: errors, status: 422});
        }
        //sanitize inputs
        const sanEmail = normalizeEmail(email.trim());
        const sanName = normalizeName(fullname);

        //hash password and store user in db
        const hashedPassword = await hash(password, 12);
        const user = new User({
            fullname: sanName,
            email: sanEmail,
            password: hashedPassword
        });
        const savedUser = await user.save();
        const returnUser = {
            ...savedUser._doc,
            password: undefined
        }
        return res.json({ success: true, data: returnUser })
        
    } catch (error) {
        next(error);
        console.log(error);
    }

}