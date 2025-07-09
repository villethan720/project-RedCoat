# Stripe Setup Guide for Red Coat

## Environment Variables to Add to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Frontend Environment Variables:

Add to your `redcoat/.env` file:
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## How to Get Your Stripe Keys:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in
3. Go to Developers → API Keys
4. Copy your publishable key and secret key
5. Replace the placeholder values above

## Test Card Numbers:

For testing, use these card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits 