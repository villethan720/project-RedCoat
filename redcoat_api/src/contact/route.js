const { Router } = require('express');
const { sponsorEmail } = require('./sponsorController');
const {generalEmail } = require('./generalController');

const router = Router();

// Route for sponsor inquiries
router.post("/sponsor", sponsorEmail);

// Route for general inquiries  
router.post("/general", generalEmail);

// Alternative: Single endpoint that routes based on formType
router.post("/", async (req, res) => {
    const { formType } = req.body;
    
    if (formType === 'sponsor') {
        return await sponsorEmail(req, res);
    } else if (formType === 'general') {
        return await generalEmail(req, res);
    } else {
        return res.status(400).json({ error: 'Invalid form type. Please specify "sponsor" or "general".' });
    }
});

module.exports = router;