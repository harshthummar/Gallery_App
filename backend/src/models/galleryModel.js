const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    imageName:{
        type:String,
        unique:true,
        required:true,
        trim:true

    },
    comment:{
        type:String,
        default:null
    },
    like:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album"},
    
})

const Gallery = mongoose.model('Gallery',gallerySchema)

module.exports = Gallery