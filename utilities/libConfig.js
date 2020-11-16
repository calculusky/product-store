
//configure multer
exports.multerConfig = (multer) => {
    return {
            fileStorage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'image')
                },
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}-${file.mimetype}`);
                }
            }),

            fileFilter: (req, file, cb) => {
                if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                    cb(null, true)
                }else{
                    cb(null, false);
                }
            }

    }
}
