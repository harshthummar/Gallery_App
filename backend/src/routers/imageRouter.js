const express = require("express");
const router = new express.Router();
const Gallery = require("../models/galleryModel");
const auth = require("../middleware/auth");
const upload  = require('../utils/multer')


router.post("/image",auth, upload.single("image"), async (req, res) => {
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }
    const { filename } = req.file;
    const { album } = req.body;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const simpleDateString = `${day}-${month}-${year}`
    const gallery = new Gallery({
      imageName: filename,
      date: simpleDateString,
      owner:req.user._id,
      album
    });
    await gallery.save();
    res.status(201).send({ message: "Successful Insertion" });
  } catch (error) {
    console.log("Error of insert image:", error.message);
    res.status(500).send({error: "Internal server error"});
  }
});

router.get("/images", auth,async (req, res) => {
  
  try {
    let images
    if(req.query.albumId)
    {
      
       images = await Gallery.find({owner:req.user._id , album:req.query.albumId})
    }
  
    else{
       images = await Gallery.find({owner:req.user._id})
    }
   
    res.status(200).json(images);
  } catch (error) {
    console.error("Error of fetching images:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/:imageId/comment',auth, async (req, res) => {
    
   try{
    const imageId = req.params.imageId;
    const comment = req.body.comment;
    const image = await Gallery.findByIdAndUpdate({_id:imageId,owner: req.user._id},{comment:comment})
    await image.save()
    res.status(200).json(comment);
   }
   catch(error)
   {
    console.error("Error of adding comment on images:", error.message);
    res.status(500).json({ error: "Internal server error" });
   }

   
  });

  router.post('/:imageId/like',auth, async (req, res) => {
    
   try{
    const imageId = req.params.imageId;
    const like = req.body.liked;
    const image = await Gallery.findByIdAndUpdate({_id:imageId,owner: req.user._id},{like})
    await image.save()
    res.status(200).json(like);
   }
   catch(error)
   {
    console.error("Error of adding like on images:", error.message);
    res.status(500).json({ error: "Internal server error" });
   }

   
  });

  

module.exports = router;
