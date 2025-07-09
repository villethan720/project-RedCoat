import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    //update cart both local state and local storage
    const updateCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(newCart);
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); //set cart counter

    return (
        <CartContext.Provider value={{ cartItems, updateCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);