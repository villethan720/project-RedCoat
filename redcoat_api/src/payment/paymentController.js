const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { items, total } = req.body;

        // Validate request
        if (!items || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Convert total to cents (Stripe expects amounts in cents)
        const amountInCents = Math.round(total * 100);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            metadata: {
                items: JSON.stringify(items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    size: item.size
                })))
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ 
            error: 'Failed to create payment intent',
            details: error.message 
        });
    }
};

const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body; //get payment intent id from request body
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId); //retrieve payment intent from stripe

        //if payment intent is successful, send confirmation email
        if (paymentIntent.status === 'succeeded') {
            // - Save order to database
            // - Update inventory
            // - Send confirmation email
            const msg = {
                to: process.env.TO_EMAIL,
                from: process.env.FROM_EMAIL,
                subject: 'Order Confirmation',
                text: `Order Details: ${paymentIntent.metadata.items}`,
                html: `<h2>New Order</h2><pre>${paymentIntent.metadata.items}</pre>`
            };
            await sgMail.send(msg);

            res.json({ 
                success: true, 
                message: 'Payment confirmed successfully',
                paymentIntent 
            });
        } else {
            res.status(400).json({ 
                error: 'Payment not successful',
                status: paymentIntent.status 
            });
        }

    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ 
            error: 'Failed to confirm payment',
            details: error.message 
        });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment
}; 