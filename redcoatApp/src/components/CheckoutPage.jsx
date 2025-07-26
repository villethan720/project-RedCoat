import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../utils/stripe';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false); //state for success modal when payment is successful

    //payment information need to add shipping and address features
    const [purchaserForm, setPurchaserForm] = useState({
      purchaserEmail: '',
      shippingAddress: '',
    })


  const handleSubmit = async (event) => {

  }
  // Checkpoint to track modal state changes
  useEffect(() => {
    console.log('🎭 Checkpoint 14: CheckoutPage showSuccessModal changed to:', showSuccessModal);
  }, [showSuccessModal]);

  // Redirect if cart is empty (but not when showing success modal)
  useEffect(() => {
    if (cartItems.length === 0 && !showSuccessModal) {
      console.log('🔄 Checkpoint 19: Cart is empty and no modal, redirecting to product');
      navigate('/product');
    }
  }, [cartItems, navigate, showSuccessModal]);

  if (cartItems.length === 0 && !showSuccessModal) {
    return null;
  }

  const handleSuccess = (paymentIntent) => {
    setShowSuccessModal(true);
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
    // You can add additional error handling here
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigate('/product');
  };

    //for changes on purchaser form with email and address
    const handlePurchaserChange = (e) => {
      const { purchaserEmail, value } = e.target;
  
    }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
          <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-4 text-center border-2 border-red-600">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-4 font-brand">Payment Successful!</h2>
            <p className="text-gray-300 mb-6 font-modern">
              Thank you for your purchase! You will receive a confirmation email shortly.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors font-brand"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 font-brand">Checkout</h1>
          <p className="text-gray-300 font-modern">Complete your Red Coat purchase</p>
        </div>

        {/* purchaser information */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2 font-modern">
            Email Address
          </label>
          <input type="email" name="purachaserEmail" placeholder="Enter your email address" value={purchaserForm.purchaserEmail} onChange={handlePurchaserChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required/>
        </div>
      </form>

        <Elements stripe={stripePromise}>
          <CheckoutForm 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage; 