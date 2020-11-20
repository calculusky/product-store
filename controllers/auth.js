const User = require('../models/user');
const { hash, compare } = require('bcryptjs');
const { throwError, normalizeName } = require('../utilities/helpers');
const config = require('../config');
const jwt = require('jsonwebtoken');
const {
    isEmail,
    isEmpty,
    isAlpha,
    normalizeEmail,
    isAlphanumeric
} = require('validator');



exports.postSignup = async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        identitycode
    } = req.body;

    //validate inputs and sanitize data
    const errors = [];
    //let invalidPassword;
    if(isEmpty(firstname) || !isAlpha(firstname)){
        errors.push({ msg: 'Invalid Firstname', param: 'firstname' })
    }
    if(isEmpty(lastname) || !isAlpha(lastname)){
        errors.push({ msg: 'Invalid Lastname', param: 'lastname' })
    }
    if(!isEmail(email)){
        errors.push({ msg: 'Invalid Email', param: 'email' })
    }
    if(!isAlphanumeric(password)){
        //invalidPassword = true;
        errors.push({ msg: 'Invalid Password', param: 'password' })
    }
    // if(!invalidPassword){
    //     if (password !== confirmpassword) {
    //         errors.push('password do not match');
    //     }
    // }
    if (password !== confirmpassword) {
        errors.push({ msg: 'Password do not match', param: 'confirmpassword' });
    }
    if(identitycode){
        if(identitycode !== 'veegil01'){
            errors.push({ msg: 'Incorrect ID', param: 'identitycode' })
        }
    }

    try {
        if(errors.length > 0){
            throwError({ message: errors, status: 422, validationErrors: true });
        }
        //sanitize inputs
        const sanEmail = normalizeEmail(email.trim());
        const sanFirstname = normalizeName(firstname.trim());
        const sanLastname = normalizeName(lastname.trim());

        //check if user exists in db
        const existingUser = await User.findOne({ email: sanEmail });
        if(existingUser){
            throwError({ message: 'Email already exists', status: 401});
        }

        //hash password and store user in db
        const hashedPassword = await hash(password, 12);
        const user = new User({
            firstname: sanFirstname,
            lastname: sanLastname,
            email: sanEmail,
            password: hashedPassword,
            role: identitycode ? 'admin' : undefined
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
        if(email === null || password === null){
            throwError({ success: false, status: 422, message: 'Email or Password cannot be empty' });
        }
        
        if(!isEmail(email)){
            throwError({ success: false, status: 422, message: 'Incorrect email or password' });
        }
        if(!isAlphanumeric(password)){
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
            _id: user._doc._id,
            firstname: user._doc.firstname,
            lastname: user._doc.lastname,
            email: user._doc.email,
            role: user._doc.role
        }        
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '12h' });
        //console.log(token);
        const data = {
            user: {...payload },
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

exports.postGetUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //console.log(authHeader, 'auth$$$$')
   try {
    if(!authHeader){
        //throwError({ success: false, status: 401, message: 'token not found'});
        return res.json({ success: false});
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.json({ success: false })
    }
    //console.log(token, '-------')
    const decodedUser = jwt.verify(token, config.jwtSecret);
    if(!decodedUser){
        return res.json({ success: false});
    }
    //console.log(decodedUser, 'decoded user')
    const user = await User.findById(decodedUser._id);
    if(!user){
        throwError({ success: false, status: 401, message: 'user not found'})
    }
    const data = {
       ...user._doc,
       password: undefined,
    }
    return res.json({ success: true, data: data})

   } catch (error) {
       if(error.message === 'invalid token' || error.message === 'jwt expired'){
           //console.log(error.message, 'errMMM')
           return res.json({ success: false });
       }
       next(error);
   }
}