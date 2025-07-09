const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../auth/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware'); 
const pool = require('../../db');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const sendEmail = require('../utils/sendEmail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected route (logged-in users)
router.put('/users/:userId/reward', authenticateToken);

// Admin-only route
router.get('/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const result = await pool.query( // fixed relative path from '../../db' to '../db'
            'SELECT id, email, role, reward_points FROM users'
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//verifying email
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const result = await pool.query(
            'UPDATE users SET is_verified = true, verification_token = null WHERE verification_token = $1 RETURNING *',
            [token]
        );

        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid or expired token'});
        }

        res.send('Email verified successfully! You can now log in.');
    }catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//forgot password
router.post('/api/forgot-password', async (req, res) => {
    const {email } =req.body;

    if(!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const client = await pool.connect();

        const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rowCount === 0) {
            client.release();
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpires = new Date(Date.now() + 3600000); // 1 hour

        await client.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [token, tokenExpires, email]
        );

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

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
        var passwordResetHtml = `<p>You requested a password reset</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 1 hour.</p>`;

        //sendEmail(to: email, from: process.env.FROM_EMAIL, subject: 'Password Reset Request', text: passwordResetHtml);

        client.release();
        res.json({ success: true, message: 'Password reset link sent to email' });
    
    } catch (err) {
        console.error('Error in forgot-password:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

