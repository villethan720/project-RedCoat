import React from 'react';
import Logo from '../components/Assets/redcoatLogo.png';
import { Link } from 'react-router-dom';

const ClothingOrder = () => {

    return (
        <div className="bg-black text-white">
            {/* Hero section */}
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})`}}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-center px-6">
                    <h1 className="text-5xl font-bold mb-4">Track Your Clothing Orders 🎈</h1>
                    <div className="space-x-4 px-8 py-4 text-center">
                        <Link to="/admin-dashboard" className="bg-red-600 px-6 py-3 rounded text-white">Back to Dashboard</Link>
                        <Link to="/inventory" className="bg-red-600 px-6 py-3 rounded text-white">Inventory</Link>
                        <Link to="/update-catalog" className="bg-red-600 px-6 py-3 rounded text-white">Update Catalog</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ClothingOrder;