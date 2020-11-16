const express = require('express');
const router = express.Router();
const { postAddProduct, postEditProduct } = require('../controllers/product');

router.post('/addproduct', postAddProduct);
router.post('/editproduct', postEditProduct);

module.exports = router;