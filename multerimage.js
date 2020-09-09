const multer  = require('multer');
const path=require('path');
var sizeOf = require('image-size');
//var dimensions = sizeOf('uploadImage/Adorama.png');
//console.log(dimensions.width, dimensions.height);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadImage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    
    if ((file.mimetype == 'image/jpeg') || (file.mimetype == 'image/png')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 4095 *4095 }  });
module.exports=upload ;