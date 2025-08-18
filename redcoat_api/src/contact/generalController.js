const pool = require('../../db');
const sendEmail = require('../utils/sendEmail'); //custom sendgrid function

//validate the email being given
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generalEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;

    //input validation
    if (!name || !email || !message){
        return res.status(400).json({error: 'Please fill out all fields.'});
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    //ensure that phone number is saved correctly
    const safePhone = phone && phone.trim() !== '' ? phone.trim() : null;

    const subject = `New General Message: ${name}`;
    const text = `
        Name: ${name}
        Email: ${email}
        Phone: ${safePhone || 'N/A'}
        Message: ${message}
    `.trim();

    const html = `
        <h2>New General Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${safePhone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `;

    try {
        // Save to database
        const insertQuery = `
            INSERT INTO contacts (name, email, phone, message, form_type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        const result = await pool.query(insertQuery, [name.trim(), email.trim().toLowerCase(), safePhone || null, message.trim(), 'general']);

        const contactId = parseInt(result.rows[0].id, 10);

        // Attempt to send email, but do not fail the request if it errors
        let emailSent = false;
        try {
            await sendEmail(process.env.GENERAL_EMAIL, process.env.FROM_EMAIL, subject, text, html);
            emailSent = true;
        } catch (emailErr) {
            console.error('SendGrid error in generalEmail:', {
                message: emailErr.message,
                stack: emailErr.stack,
                response: emailErr.response && emailErr.response.body,
            });
        }
        
        res.status(200).json({ 
            success: 'We have received your message! 🎈',
            contactId,
            emailSent
        });
    } catch (error) {
        console.error('Error in generalEmail:', {
            message: error.message,
            stack: error.stack,
            pgCode: error.code,
            pgDetail: error.detail,
            sendgridResponse: error.response && error.response.body,
            email,
            name
        });
        res.status(500).json({error: 'Failed to send message or save to database'});
    }
};

module.exports = {generalEmail};