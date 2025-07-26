const pool = require('../../db');
const sendEmail = require('../utils/sendEmail'); //custom sendgrid function

const generalEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message){
        return res.status(400).json({error: 'Please fill out all fields.'});
    }

    const subject = `New General Message: ${name}`;
    const text = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
    `;

    const html = `
        <h2>New General Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `;

    try {
        // Save to database first
        const insertQuery = `
            INSERT INTO contacts (name, email, phone, message, form_type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        const result = await pool.query(insertQuery, [name, email, phone || null, message, 'general']);
        
        // Then send email
        await sendEmail(process.env.GENERAL_EMAIL, process.env.FROM_EMAIL, subject, text, html);
        
        res.status(200).json({ 
            success: 'Message has been sent!',
            contactId: result.rows[0].id
        });
    } catch (error) {
        console.error('Error in generalEmail:', error);
        res.status(500).json({error: 'Failed to send message or save to database'});
    }
};

module.exports = {generalEmail};