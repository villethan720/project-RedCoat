const pool = require('../../db');

//Validate that id is a numeric string
const isValidId = (id) => /^\d+$/.test(id);

// Get all contact submissions
const getAllContacts = async (req, res) => {
    try {
        const query = `
            SELECT id, name, email, phone, message, form_type, created_at
            FROM contacts
            ORDER BY created_at DESC
        `;
        
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching contacts:', {error});
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

// Get contacts by form type
const getContactsByType = async (req, res) => {
    const { formType } = req.params;
    
    if (!['general', 'sponsor'].includes(formType)) {
        return res.status(400).json({ error: 'Invalid form type. Must be "general" or "sponsor"' });
    }
    
    try {
        const query = `
            SELECT id, name, email, phone, message, form_type, created_at
            FROM contacts
            WHERE form_type = $1
            ORDER BY created_at DESC
        `;
        
        const result = await pool.query(query, [formType]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching contacts by type:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({error: 'Invalid ID format, ID must be number'});
    }
    
    try {
        const query = `
            SELECT id, name, email, phone, message, form_type, created_at
            FROM contacts
            WHERE id = $1
        `;
        
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching contact by ID:', { id, error });
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

// Delete a contact submission
const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({error: 'Invalid ID format, ID must be number'});
    }
    
    try {
        const query = 'DELETE FROM contacts WHERE id = $1 RETURNING id';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        res.status(200).json({ success: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', {id, error});
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

// Get contact statistics
const getContactStats = async (req, res) => {
    try {
        const recentQuery = `
            SELECT 
                form_type,
                COUNT(*) as count,
                DATE(created_at) as date
            FROM contacts
            WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
            GROUP BY form_type, DATE(created_at)
            ORDER BY date DESC, form_type
        `;
        
        const recentResult = await pool.query(recentQuery);
        
        // Get total counts
        const totalQuery = `
            SELECT 
                form_type,
                COUNT(*) as count
            FROM contacts
            GROUP BY form_type
        `;
        const totalResult = await pool.query(totalQuery);

        // Process the results into a more useful format
        const stats = {
            total: 0,
            general: 0,
            sponsor: 0,
            recent: result.rows
        };

        totalResult.rows.forEach(row => {
            const count = parseInt(row.count, 10);
            stats[row.form_type] = count;
            stats.total += count;
        });
        
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching contact stats:', {error});
        res.status(500).json({ error: 'Failed to fetch contact statistics' });
    }
};

module.exports = {
    getAllContacts,
    getContactsByType,
    getContactById,
    deleteContact,
    getContactStats
}; 