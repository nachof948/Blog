const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicacionesSchema = new Schema({
    titulo:{
        type:String,
        required:true,
    },
    texto:{
        type:String,
        required:true,
    },
    fechaCreacion:{
        type:Date,
        default:Date.now()
    },
    actualizacion:{
        type:Date,
        default:Date.now()
    },
})

module.exports = mongoose.model('Publicaciones', PublicacionesSchema)