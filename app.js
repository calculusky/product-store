const path = require('path');
const cors = require('cors');
const multer = require('multer');
const multerConfig = require('./utilities/libConfig').multerConfig;
const { fileStorage, fileFilter } = multerConfig(multer); 
const express = require('express');
const app = express();


//import routes
const authRoutes = require('./routes/auth') 
const productRoutes = require('./routes/product');

//set up middlewares
app.use(cors());
app.use(express.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'))

//register routes
app.use('/auth', authRoutes );
app.use(productRoutes);

//handle errors
app.use((errors, req, res, next) => {
    //console.log(errors);
    const message = errors.message;
    const status = errors.status || 500;
    console.log(message, '-------')
    res.status(status).json({ success: false, status: status, message: message })
})

module.exports = app;