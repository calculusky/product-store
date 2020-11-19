const path = require('path');
const fs = require('fs');

//throws error
exports.throwError = ({ message, status, detail, validationErrors }) => {
    const error = new Error();
    error.message = message;
    error.status = status;
    error.validationErrors = validationErrors;
    throw error;
}

//sanitize name
exports.normalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

//delete old image
exports.deleteImage = (imagePath) => {
    fs.unlink(imagePath, err => {
        if(err){
            throw err
        }
    })
}

