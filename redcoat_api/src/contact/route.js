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
    
    if (!formType) {
        return res.status(400).json({ error: 'Missing formType. Expected "sponsor" or "general".' });
    }

    switch (formType.toLowerCase()) {
        case 'sponsor':
            return sponsorEmail(req, res);
        case 'general':
            return generalEmail(req, res);
        default:
            return res.status(400).json({ error: 'Invalid formType. Must be "sponsor" or "general".' });
    }
});

module.exports = router;