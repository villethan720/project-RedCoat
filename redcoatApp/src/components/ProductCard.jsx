import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, category, image_url, description }) => {

    return (
        <Link to={`/product/${id}`} className="block">
            <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden w-80 h-96 flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-xl border border-gray-700">
                {/* Image Container - Fixed Height */}
                <div className="h-48 w-full overflow-hidden">
                    {image_url ? (
                        <img 
                            src={image_url} 
                            alt={name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                    )}
                </div>
                
                {/* Content Container - Fixed Height */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Title - Fixed Height with custom font */}
                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3rem] font-brand">{name}</h2>
                    
                    {/* Price and Category - Fixed Height */}
                    <div className="mb-2">
                        <p className="text-red-500 font-semibold text-lg font-brand">${parseFloat(price).toFixed(2)}</p>
                        <p className="text-gray-300 text-sm capitalize font-modern">{category}</p>
                    </div>
                    
                    {/* Description - Flexible but with max height */}
                    <p className="text-sm text-gray-300 line-clamp-3 flex-1 font-modern">{description || 'No description available'}</p>
                    
                    {/* View Details Button - Fixed at bottom */}
                    <div className="mt-3 pt-2 border-t border-gray-600">
                        <span className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors font-brand">
                            View Details →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

