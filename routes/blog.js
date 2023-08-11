const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog')
const UserVerify = require('../middleware/userVerify')
const multer = require('multer')
const path = require('path')






router.get('/allblogPost', async (req, res) => {

    try {
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page -1) * limit
        const blog = await blogModel.find(req.body).limit(limit).skip(startIndex)
        res.send(blog)

    } catch (error) {
        console.log(error)
        res.send("Internal Error", error)

    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });
  


router.post('/blogPost', UserVerify, upload.single("image"), async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return res.status(400).json({ message: "Upload all information" });
    }

    try {
        const blog = new blogModel({ title, description,image:req.file.filename, category, userId: req.userId }); // Use req.user._id to access the user ID
        await blog.save();
        res.status(201).json({ blog, message: "BlogPost has been successfully created" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error");
    }
});









module.exports = router