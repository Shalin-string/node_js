const multer = require('multer');

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    },
    destination:"./uploads"
})

const upload = new multer({
    storage:storage
})

module.exports = upload