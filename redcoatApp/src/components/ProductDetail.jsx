import React, { useEffect, useState } from 'react';
import { useParams /*, useNavigate */ } from 'react-router-dom';
import { getClothing } from '../api/clothing';
import { useCart } from './CartContext';
import Logo from './Assets/redcoatLogo.png';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { cartItems, updateCart } = useCart();
  //const navigate = useNavigate();

  useEffect(() => {
    //get clothing from db
    const fetchItem = async () => {
      const allItems = await getClothing();
      const found = allItems.find(p => p.id.toString() === id);
      if(!found) return;

      setProduct(found);

      //auto select ONE_SIZE if that is what is stocked
      const entries = Object.entries(found.stock_by_size || {}).filter(([_, qty]) => Number(qty) > 0);
      if (entries.length === 1 && entries[0][0] === 'ONE_SIZE') {
        setSelectedSize('ONE_SIZE');
      }
    };

    fetchItem();
  }, [id]);

  //logic for adding clothing item to cart
  const addToCart = (product, selectedSize) => {
    const existing = cartItems.find(
      item => item.id === product.id && item.size === selectedSize
    );

    let newCart;

    //Add clothing to cart and increment cart count VIA useCart
    if (existing) {
      newCart = cartItems.map(item => 
        item.id === product.id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1}
          : item
      );
    } else {
      //add new item to cart
      newCart = [...cartItems, { ...product, size: selectedSize, quantity}];
    }

    updateCart(newCart);
    alert('Item added to cart!');
  }

  //show loading
  if (!product) return <p className="text-white p-6 text-center font-modern">Loading...</p>;

  //check what stock sizes are
  const inStockSizes = Object.entries(product.stock_by_size || {}).filter(([_, qty]) => Number(qty) > 0);
  
  //check if clothing is one size fits all
  const isOneSizeOnly = inStockSizes.length === 1 && inStockSizes[0][0] === 'ONE_SIZE';

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <section
        className="relative bg-center h-[110vh]"
        style={{ backgroundImage: `url(${Logo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
          <h2 className="text-5xl font-bold font-brand">{product.name}</h2>
        </div>
      </section>

      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <p className="mb-2 font-modern"><strong className="font-brand">Category:</strong> {product.category}</p>
        <p className="mb-2 font-modern"><strong className="font-brand">Description:</strong> {product.description || 'No description available.'}</p>
        <p className="mb-2 font-modern"><strong className="font-brand">Price:</strong> ${product.price}</p>

        <div className="mb-4">
          <label className="block text-white mb-2 font-modern">Select Size:</label>
          {isOneSizeOnly ? (
            <p className="text-red-600 mb-2 font-semibold font-modern">
              Size: One Size Fits All ({product.stock_by_size.ONE_SIZE} in stock)
            </p>
          ) : (
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setQuantity(1);
              }}
              className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/3 font-modern"
            >
              <option value="">Choose a size</option>
              {inStockSizes.map(([size, qty]) => (
                <option key={size} value={size}>
                  {size.toUpperCase()} ({qty} in stock)
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-modern">Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock_by_size?.[selectedSize] || 1}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(
              parseInt(e.target.value),
              product.stock_by_size?.[selectedSize] || 1
            ))}
            className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/3 font-modern"
          />
        </div>

        <button
          onClick={() => {
            //Check for size selection
            if (!selectedSize) return alert('Please select a size');
            addToCart(product, selectedSize);
          }}
          className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-brand"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
