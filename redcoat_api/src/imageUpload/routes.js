const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../utils/cloudinary');
const { uploadImage } = require('../imageUpload/controller');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, //storage place
    params: {
        folder: 'clothing-images', //directs to folder
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
})

const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;

