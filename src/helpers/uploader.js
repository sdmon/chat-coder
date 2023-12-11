// Para subir archivos

const multer = require('multer');

// dirname para subir una jerarquia mas
const { dirname } = require('node:path')

const storage = multer.diskStorage({
    // Destino para guardar el archivo, request, archivo y callback
    destination: function(req, file, cb){
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    // Nombre para el archivo
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

exports.uploader = multer({
    storage
})

