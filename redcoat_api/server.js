require('dotenv').config();

const express = require("express");
const cors = require('cors');
const { Pool } = require('./db');
const clothingRoutes = require('./src/clothing/routes') //db connection
const userRoutes = require('./src/auth/adminRoutes'); //admin verification
const sgMail = require('@sendgrid/mail'); //sending emails
const uploadRoutes = require('./src/imageUpload/routes')//uploading images
const emailRoutes = require('./src/contact/route');//sending email for contacting Us
const paymentRoutes = require('./src/payment/paymentRoutes'); //payment processing

const app = express();
const port = process.env.PORT;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(cors());
app.use(express.json());

app.use("/api/clothing", clothingRoutes);
app.use('/api', userRoutes)

app.use('/api', uploadRoutes);
app.use('/api/contact', emailRoutes);
app.use('/api', paymentRoutes); //payment routes

// Health check
app.get('/api/health', (req, res) => {
    res.send('API is up and running!');
  });
  
  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📬 API ready to receive requests`);
    console.log(`💳 Payment processing enabled`);
}); 