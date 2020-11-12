const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();


//import routes
const authRoutes = require('./routes/auth')

//set up middlewares
app.use(cors());
app.use(express.json());

//register routes
app.use('/auth', authRoutes );

//handle errors
app.use((errors, req, res, next) => {
    console.log(errors);
    const message = errors.message;
    const status = errors.status || 500;
    res.status(status).json({ success: false, status: status, message: message })
})

module.exports = app;