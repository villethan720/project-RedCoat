import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Assets/redcoatLogo.png';

const Cart = () => {
    const { cartItems, updateCart } = useCart();
    const navigate = useNavigate();

    //removing clothing from cart logic
    const handleRemove = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        updateCart(updatedCart);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2); //add price of all items in cart

    return (
        <div className="bg-black text-white min-h-screen pb-20">
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
                    <h2 className="text-5xl font-bold font-brand">Order Summary 🎈</h2>
                    <p className="text-gray-300 font-semibold font-modern">Here is what is in your cart!</p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-8">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl mb-4 font-modern">Your cart is empty.</p>
                        <button 
                            onClick={() => navigate('/product')}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors font-brand"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-6">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                                    <div>
                                        <h3 className="text-xl font-semibold font-brand">{item.name}</h3>
                                        <p className="font-modern">Size: {item.size.toUpperCase()}</p>
                                        <p className="font-modern">Quantity: {item.quantity}</p>
                                        <p className="text-red-400 font-bold font-brand">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-brand"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 text-right">
                            <h2 className="text-2xl font-bold font-brand">Total: ${totalPrice}</h2>
                            <button
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors font-brand"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
