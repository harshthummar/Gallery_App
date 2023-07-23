const express = require("express");
const router = new express.Router();
const Album = require("../models/albumModel");
const auth = require("../middleware/auth");


router.post("/albums",auth, async (req, res) => {
    try {
      const { name } = req.body;
      const album = new Album({ name });
      await album.save();
      res.status(201).json(album);
    } catch (error) {
      console.log("Error of upload image on album",error.message);
      res.status(500).json({ error: "Error creating album" });
    }
  });


  router.get("/albums",auth, async (req, res) => {
    try {
      const albums = await Album.find();
      res.json(albums);
    } catch (error) {
      console.log("Error of fetching albums",error.message);
      res.status(500).json({ error: "Error fetching albums" });
    }
  });


  
  module.exports = router