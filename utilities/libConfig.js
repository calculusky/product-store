
//configure multer
exports.multerConfig = (multer) => {
    return {
            fileStorage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'images')
                },
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname}`);
                }
            }),

            fileFilter: (req, file, cb) => {
                if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.size <= 5000){
                    cb(null, true)
                }else{
                    cb(null, false);
                }
            }

    }
}
