const User = require('../models/user');
const { hash, compare } = require('bcryptjs');
const { throwError, normalizeName } = require('../utilities/helpers');
const config = require('../config');
const jwt = require('jsonwebtoken');

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
    let invalidPassword;
    if(isEmpty(fullname)){
        errors.push('Invalid name')
    }
    if(!isEmail(email.trim())){
        errors.push('Invalid email')
    }
    if(!isAlphanumeric(password)){
        invalidPassword = true;
        errors.push('Invalid password')
    }
    if(!invalidPassword){
        if (password !== confirmpassword) {
            errors.push('password do not match');
        }
    }

    try {
        if(errors.length > 0){
            throwError({ message: errors, status: 422});
        }
        //sanitize inputs
        const sanEmail = normalizeEmail(email.trim());
        const sanName = normalizeName(fullname.trim());

        //check if user exists in db
        const existingUser = await User.findOne({ email: sanEmail });
        if(existingUser){
            throwError({ message: 'Email already exists', status: 401});
        }

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
    }

}

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    //check login credentials and generate token for the logged in user
   try {
        const errors = [];
        if(!isEmail(email)){
            throwError({ success: false, status: 422, message: 'Incorrect email or password' });
        }
        
        //sanitize email
        const sanEmail = normalizeEmail(email.trim());
        const user = await User.findOne({ email: sanEmail });
        if(!user){
            throwError({ success: false, status: 422, message: 'Incorrect email or password' });
        }
        const matched = await compare(password, user.password);
        if(!matched){
            throwError({ success: false, status: 422, message: 'Incorrect email or password' });
        }
        //generate jwt token
        const payload = {
            fullname: user._doc.fullname,
            email: user._doc.email,
            role: user._doc.role
        }
        


        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '12h' });
        console.log(token);
        const data = {
            ...payload,
            token: token
        }
        return res.json({ success: true, data: data })
    
   } catch (error) {
       next(error)
   }
}

exports.pstLogout = (req, res, next) => {
    const token = req.body.token;

}