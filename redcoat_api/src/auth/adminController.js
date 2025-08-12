require('dotenv').config();
const pool = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //require for session authentication
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

     // Basic input validation
     if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        //fetch user by email
        const query = 'SELECT id, email, password, is_verified, role FROM users WHERE email = $1';
        const result = await pool.query(query, [email.trim().toLowerCase()]);

        if (result.rows.length === 0) {
            return res.stauts(400).json({message: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        //validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:'Invalid email or password'});
        }

        //ensure user is verified
        if (!user.is_verified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.'});
        }
        
        //create JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //send token
        res.status(200).json({token}); //token to allow access
    } catch (err) {
        console.error('Login error:', { email, error: err.message });
        res.status(500).json({ message: 'Server error. Please try again later.'});
    }
};

