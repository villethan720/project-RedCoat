const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware'); 
const pool = require('../../db');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//email format check 
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// admin login
router.post('/login', loginUser);


// Admin-only route
router.get('/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const result = await pool.query( 
            'SELECT id, email, role  FROM users'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server error');
    }
});

//forgot password
router.post('/api/forgot-password', async (req, res) => {
    const {email } =req.body;

    if(!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'A Valid Email is required' });
    }

    try {
        const client = await pool.connect();

        const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rowCount === 0) {
            client.release();
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await client.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [token, tokenExpires, email]
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        const msg = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: 'Password Reset Request',
            html: `
            <p>You requested a password reset</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 1 hour.</p>
            `,
        };

        await sgMail.send(msg);
        client.release();

        res.json({ success: true, message: 'Password reset link sent to email' });
    
    } catch (err) {
        console.error('Error in /api/forgot-password:', err);
        res.status(500).json({ success: false, message: 'Internal Server error' });
    }
});

module.exports = router;

