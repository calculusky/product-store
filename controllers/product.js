const Product = require('../models/product');
const { isEmpty, isFloat } = require('validator');
 
exports.postAddProduct = (req, res, next) => {
    const {
        title,
        price, 
        description,
        image
    } = req.body;

    //validate and sanitize inputs
    const errors = [];
    if(isEmpty(title) || !isAlpha(title)){
        errors.push('Title must be letters only');
    }
    if(!isFloat(price)){
        errors.push('Price must be numeric or decimal input');
    }
    if(isEmpty(description)){
        errors.push('Description must not be empty');
    }
    
}