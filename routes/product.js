const express = require('express');
const router = express.Router();
const { getProducts, postAddProduct, postEditProduct } = require('../controllers/product');

router.get('/', getProducts);
router.post('/addproduct', postAddProduct);
router.post('/editproduct', postEditProduct);

module.exports = router;