const pool = require('../../db');
const sendEmail = require('../utils/sendEmail'); //custom sendgrid function

//email format check
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const sponsorEmail = async (req, res) => {
    const { name , email, phone, message } = req.body;

    //input check
    if(!name || !email || !phone || !message){
        return res.status(400).json({error: 'Please fill out all fields.' });
    }

    //email validation
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }


    const safePhone = phone && phone.trim() !== '';

    const subject = `New Sponsor/Representative Message: ${name}`;
    const text = `
        Name: ${name}
        Email: ${email}
        Phone: ${safePhone || 'N/A'}
        Message: ${message}
    `.trim();

    const html = `
        <h2>New Sponsor/Representative Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `;

    try { 
        // Save to database first
        const insertQuery = `
            INSERT INTO contacts (name, email, phone, message, form_type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        const result = await pool.query(insertQuery, [name.trim(), email.trim().toLowerCase(), safePhone, message.trim(), 'sponsor']);

        const contactId = parseInt(result.rows[0].id, 10);
        
        // Then send email
        await sendEmail(process.env.SPONSOR_EMAIL, process.env.FROM_EMAIL, subject, text, html);
        
        res.status(200).json({ 
            success: 'Message has been sent!',
            contactId
        });
    } catch(error){
        console.error('Error in sponsorEmail:', {error, email, name });
        res.status(500).json({error: 'Failed to send message or save to database'});
    }
};

module.exports = {sponsorEmail};