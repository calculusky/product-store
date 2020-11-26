const Product = require('../models/product');
const { isEmpty, isFloat, isAlpha } = require('validator');
const { throwError, deleteImage } = require('../utilities/helpers');


exports.getProducts = async (req, res, next) => {
   try {
    const products = await Product.find();
    // const data = {
    //     title: products.tit
    // }
    return res.json({ success: true, data: products });

   } catch (error) {
       next(error);
   }
}

 
exports.postAddProduct = async (req, res, next) => {
    const {
        title,
        price, 
        description,
    } = req.body;
    const image = req.file;

    //console.log(image, '----img-----%%%%')

    //validate and sanitize inputs
    const errors = [];
    const sanTitle = title.trim();
    if(isEmpty(sanTitle)){
        errors.push({ msg: 'Title must have a minimum letter of three ', param: 'title'});
    }
    if(!isFloat(price) || isEmpty(price)){
        errors.push({ msg: 'Price must be numeric or decimal input', param: 'price'});
    }
    if(isEmpty(description)){
        errors.push({ msg: 'Description must not be empty', param: 'description'});
    }
     //check if image was added
    if(!image){
        errors.push({ msg: 'No image selected', param: 'image'})
    } 
   try {
        if(errors.length > 0){
            throwError({ success: false, status: 422, message: errors });
        } 
       
        
        const sanDescription = description.trim();
        const product = new Product({
            title: sanTitle,
            price: price,
            description: sanDescription,
            imagePath: image.path.replace('\\', '/')
        });
        const savedProduct = await product.save();
        const data = {
            ...savedProduct._doc
        }
        return res.json({ success: true, data: data})

   } catch (error) {
       next(error);
   }
}


exports.postEditProduct = async (req, res, next) => {
    const prodId = req.params.prodId;
    const updatedImage = req.file;
    const {
        updatedTitle,
        updatedPrice,
        updatedDescription,
    } = req.body;

    //validate and sanitize
    const errors = [];
    const sanUpdatedTitle = updatedTitle.trim();
    if(isEmpty(sanUpdatedTitle) || !isAlpha(sanUpdatedTitle)){
        errors.push('Title must be letters only');
    }
    if(!isFloat(updatedPrice)){
        errors.push('Price must be numeric or decimal input');
    }
    if(isEmpty(updatedDescription)){
        errors.push('Description must not be empty');
    }
    try {
        if(errors.length > 0){
            throwError({ success: false, status: 422, message: 'Invalid inputs' });
        } 
        const sanUpdatedDescription = updatedDescription.trim();
        //fetch product from db
        const product = await Product.findById(prodId);
        if(!product){
            throwError({ success: false, status: 404, message: 'product not found' }); 
        }
        product.title = sanUpdatedTitle;
        product.price = updatedPrice;
        product.description = sanUpdatedDescription;
        if(updatedImage){
            //delete old image from file
            deleteImage(product.imagePath)
            product.imagePath = updatedImage.path;
        }
        const savedProduct = await product.save();
        const data = {
            ...savedProduct
        }
        return res.json({ success: true, data: data });

    } catch (error) {
        
    }
}

exports.deleteProduct = async (req, res, next) => {
    const prodId = req.params.prodId;
    try {
        const product = await Product.findById(prodId);
        if(!product){
            throwError({ success: false, status: 404, message: 'product not found' }); 
        }
        deleteImage(product.imagePath);
        const data = await Product.findByIdAndRemove(prodId);
        return res.json({ success: true, data: data });

    } catch (error) {
        next(error)
    }
}