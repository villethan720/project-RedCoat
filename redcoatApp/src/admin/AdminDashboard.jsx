import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-16">
            {/* Backdrop title */}
            <section className="relative h-screen bg-cover bg-center mb-6" style={{backgroundImage: "url('/picture.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
                    <h2 className="text-5xl font-bold">Welcome Admin!</h2>
                    <p className="text-grey-400 font-semibold">Make a Difference!</p>
                </div>
            </section>

            {/* Section for updating clothing, inventory, and orders */}
            <section className="py-24 bg-red-600 flex flex-col md:flex-row md:px-5 gap-x-4 justify-center items-center"> 
                    <Link to="/update-catalog" className="bg-black px-6 py-3 rounded text-white">Update Catalog</Link>
                    <Link to="/inventory" className="bg-black px-6 py-3 rounded text-white">Inventory</Link>
                    <Link to="/clothing-order" className="bg-black px-6 py-3 rounded text-white">Clothing Orders</Link>
                    <Link to="/contact-management" className="bg-black px-6 py-3 rounded text-white">Contact Management</Link>
            </section>


            <section className="py-20 px-6 md:px-20 bg-black text-white">
                <div className="max-w-5xl mx-auto space-y-10">
                    <div>
                        <h2 className="text-3xl font-bold text-red-600 mb-4">What's Next?</h2>
                        <p className="text-xl leading-7 text-gray-300 mb-6">
                            Think outside the box! Break through the boundaries. Look to explore the unknown and 
                            stay creative. Encourage friendships and learn more about others. What do you have in store?
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;