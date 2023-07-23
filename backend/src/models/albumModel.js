const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique:true},
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
  },
  });
  


 const Album = mongoose.model("Album", albumSchema);
 module.exports = Album