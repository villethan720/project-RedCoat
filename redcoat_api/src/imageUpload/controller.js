const uploadImage = async(req, res) => {
    try {
        console.log("File received:", req.file);

        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No file uploaded'});
        }

        const imageUrl = req.file.path;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({error: 'Image upload failed' });
    }
};

module.exports = { uploadImage };