require('dotenv').config();
const pool = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Check for existing users
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already Exists' });
        }

        //saving password securely and save verification token
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        //add to db
        await pool.query(
            `INSERT INTO users (email, password, verification_token) 
            VALUES ($1, $2, $3)`,
            [email, hashedPassword, verificationToken]
        );

        //allow user to be verified with this link
        const verificationLink = `http://localhost:3009/api/verify-email?token=${verificationToken}`;

        //email to verify user
        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER,
            subject: 'Verify your email',
            html: `
                <p>Thank you for signing up for Red Coat's rewards program!</p>
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                `
        };

        console.log('Preparing to send email for verification', email);
        await sgMail.send(msg);
        console.log('Verification email sent');

        res.status(201).json({ message: 'User Registered' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //get users at the email given
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        //checks if email is right
        if (users.rows.length === 0) {
            return res.status(400).json({message: 'Invalid Password or Email' });
        }

        //check if password is right
        const validPass = await bcrypt.compare(password, users.rows[0].password)
        if(!validPass) {
            return res.status(400).json({ message: 'Invalid Password or Email'});
        }

        //checks if user is verified
        if (!users.rows[0].is_verified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }
        
        //stores token for their session
        const token = jwt.sign(
            {userId: users.rows[0].id, role: users.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({token}); //token to allow access
    } catch (err) {
        console.error(err)
        res.status(500).send('server error');
    }
};

