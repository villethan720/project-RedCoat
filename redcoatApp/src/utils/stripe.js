import { loadStripe } from '@stripe/stripe-js';

// Publishable key from Stripe Dashboard
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

export default stripePromise; 