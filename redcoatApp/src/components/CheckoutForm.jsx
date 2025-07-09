import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from './CartContext';

const CheckoutForm = ({ onSuccess, onError }) => {
  const stripe = useStripe(); //stripe object for payment processing
  const elements = useElements(); //elements object for payment processing
  const { cartItems, updateCart } = useCart(); //cart items and update cart function
  
  const [loading, setLoading] = useState(false); //loading state for payment processing
  const [error, setError] = useState(null); //error state for payment processing

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0); //calculate total price of items in cart

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!stripe || !elements) {
      console.log('Stripe or Element is not ready');
      return;
    }

    setLoading(true);
    setError(null);

    try {
        //call backend to create payment intent
      const response = await fetch('http://localhost:3009/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: total,
        }),
      });

      const { clientSecret } = await response.json(); //get api response

      //wait for stripe to confirm payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Red Coat Customer',
          },
        },
      });

      //if payment error, set error and call onError, if success, clear cart and call onSuccess
      if (paymentError) {
        setError(paymentError.message);
        onError?.(paymentError.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Clear cart after successful payment
        updateCart([]);
        onSuccess?.(paymentIntent);
      } else {
        console.log('Payment intent status:', paymentIntent?.status); //checkpoint
      }
    } catch (err) {
      console.log('Caught error:', err);
      setError('An error occurred while processing your payment.');
      onError?.('Payment processing failed.');
    } finally {
      setLoading(false);
      console.log('Payment process finished, loading set to false');
    }
  };

  //card element options for stripe
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#f2f2f2',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 font-brand">Complete Your Purchase</h2>
      
      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 font-brand">Order Summary</h3>
        <div className="space-y-2">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-300">
              <span className="font-modern">{item.name} x {item.quantity}</span>
              <span className="font-modern">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-600 pt-2 mt-4">
            <div className="flex justify-between text-white font-bold">
              <span className="font-brand">Total:</span>
              <span className="font-brand">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2 font-modern">
            Card Details
          </label>
          <div className="bg-gray-700 p-3 rounded border border-gray-600">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-brand"
        >
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-400 text-center font-modern">
        Your payment is secured by Stripe. We never store your card details.
      </div>
    </div>
  );
};

export default CheckoutForm; 