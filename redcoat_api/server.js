require('dotenv').config();

const express = require("express");
const cors = require('cors');
const pool = require('./db');
const clothingRoutes = require('./src/clothing/routes') //db connection
const userRoutes = require('./src/auth/adminRoutes'); //admin verification
const sgMail = require('@sendgrid/mail'); //sending emails
const uploadRoutes = require('./src/imageUpload/routes')//uploading images
const emailRoutes = require('./src/contact/route');//sending email for contacting Us
const contactAdminRoutes = require('./src/contact/adminRoutes'); //admin contact management
const paymentRoutes = require('./src/payment/paymentRoutes'); //payment processing
const helmet = require('helmet'); //added protection on app

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by'); //security

sgMail.setApiKey(process.env.SENDGRID_API_KEY); //for sending emails

//for production usage connecting to correct app
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(helmet()); //for added security

app.use("/api/v1/clothing", clothingRoutes);
app.use('/api', userRoutes)

app.use('/api', uploadRoutes);
app.use('/api/contact', emailRoutes);
app.use('/api/admin/contacts', contactAdminRoutes); //admin contact management routes
app.use('/api', paymentRoutes); //payment routes

//to prevent excess usage on api allows it to shut down after not being used 
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing PostgreSQL pool');
  pool.end(() => {
    console.log('PostgreSQL pool has ended');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT (Ctrl+C) detected: closing PostgreSQL pool');
  pool.end(() => {
    console.log('PostgreSQL pool has ended');
    process.exit(0);
  });
});

//initial landing for production api
app.get('/', (req, res) => {
  res.send('API is running. Welcome!');
});


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