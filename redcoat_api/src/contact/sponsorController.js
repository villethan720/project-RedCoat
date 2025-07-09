const pool = require('../../db');
const sendEmail = require('../utils/sendEmail'); //custom sendgrid function

const sponsorEmail = async (req, res) => {
    const { name , email, phone, message } = req.body;

    if(!name || !email || !message){
        return res.status(400).json({error: 'Please fill out all fields.' });
    }

    const subject = `New Sponsor/Representative Message: ${name}`;
    const text = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
    `;

    const html = `
        <h2>New Sponsor/Representtive Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `;

    try { 
        await sendEmail(process.env.SPONSOR_EMAIL, process.env.FROM_EMAIL, subject, text, html);
        res.status(200).json({ success: 'Message has been sent'});
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to send message'});
    }
};

module.exports = {sponsorEmail};