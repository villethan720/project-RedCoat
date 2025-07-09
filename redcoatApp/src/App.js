import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/HomeComponent';
import Product from './components/ProductComponent';
import Mission from './components/MissionComponent';
import Team from './components/TeamComponent';
import Contact from './components/ContactComponent';
import Footer from './components/FooterComponent';
import Cart from './components/CartComponent';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './components/CartContext';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UpdateCatalog from './admin/UpdateCatalog';
import Inventory from './admin/ClothingInventory';
import ClothingOrder from './admin/ClothingOrders';
import CheckoutForm from './components/CheckoutForm';


function App() {
    return(
        <CartProvider>
        <Router>
            <div className="flex flex-col min-h-screen bg-black text-white font-brand">
            <NavBar/>
        
            <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/product" element={<Product />}/>
                <Route path="/mission" element={<Mission />}/>
                <Route path="/team" element={<Team />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/checkout" element={<CheckoutPage />}/>
                <Route path="/product/:id" element={<ProductDetail />}/>
                <Route path="/checkout-form" element={<CheckoutForm />}/>
                <Route path="/admin-login" element={<AdminLogin />}/>
                <Route path="/admin-dashboard" element={
                    <AdminRoute>
                        <AdminDashboard/>
                    </AdminRoute>
                } />
                <Route path="/update-catalog" element={
                    <AdminRoute>
                        <UpdateCatalog/>
                    </AdminRoute>
                } />
                <Route path="/inventory" element={
                    <AdminRoute>
                        <Inventory/>
                    </AdminRoute>
                } />
                <Route path="/clothing-order" element={
                    <AdminRoute>
                        <ClothingOrder/>
                    </AdminRoute>
                } />
            </Routes>
            </main>

            <Footer />
            </div>
        </Router>
        </CartProvider>
    )
}

export default App;