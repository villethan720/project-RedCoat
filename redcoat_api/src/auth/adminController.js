require('dotenv').config();
const pool = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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

