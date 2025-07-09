const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('./paymentController');

// Create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Confirm payment
router.post('/confirm-payment', confirmPayment);

module.exports = router; 