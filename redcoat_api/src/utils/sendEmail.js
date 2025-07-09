const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, from, subject, text, html = null) => {
    const msg = {
        to, 
        from, //process.env.FROM_EMAIL,
        subject,
        text,
        ...(html ? { html } : {}) //include html if it is provided
    };

    await sgMail.send(msg);
};

module.exports = sendEmail;