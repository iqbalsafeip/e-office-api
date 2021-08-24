const multer = require('multer');
const path = require('path');

const { v4 : uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        switch(file.fieldname){
            case 'ttd_file' : return cb(null, './uploads/ttd_file');
            case 'photo_file' : return cb(null, './uploads/photo_file');
        }
    },
    filename: function(req,file,cb){
        cb(null, new Date().getTime() + uuidv4() + path.extname(file.originalname))
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
        cb(null, true)
    } else {
        cb(new Error('Unsupported filex'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    }
})


module.exports = {
    upload: upload
}