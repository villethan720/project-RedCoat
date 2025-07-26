const { Router } = require('express');
const { 
    getAllContacts, 
    getContactsByType, 
    getContactById, 
    deleteContact, 
    getContactStats 
} = require('./contactController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireAdmin);

// Get all contact submissions
router.get('/all', getAllContacts);

// Get contacts by form type (general or sponsor)
router.get('/type/:formType', getContactsByType);

// Get a specific contact by ID
router.get('/:id', getContactById);

// Delete a contact submission
router.delete('/:id', deleteContact);

// Get contact statistics
router.get('/stats/overview', getContactStats);

module.exports = router; 