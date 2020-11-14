//environment configurations

//connection variables
exports.port = process.env.PORT || 4000;
exports.mongoDBUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/product-store';
exports.jwtSecret = process.env.JWT_SECRET;