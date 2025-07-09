import { Link } from 'react-router-dom';
import logo from '../components/Assets/redcoatLogo.png';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../components/CartContext';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-md' : 'bg-black'
    }`}>
      <div className="mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-20 bg-red-600">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Red Coat Logo"
            className="h-[150px] w-auto object-contain cursor-pointer mt-10"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10 text-white font-medium text-lg font-brand">
          <Link to="/product" className="hover:text-black px-4 py-2 rounded transition">Shop</Link>
          <Link to="/mission" className="hover:text-black px-4 py-2 rounded transition">Our Mission</Link>
          <Link to="/team" className="hover:text-black px-4 py-2 rounded transition">Our Team</Link>
          <Link to="/contact" className="hover:text-black px-4 py-2 rounded transition">Contact Us</Link>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-white text-2xl hover:text-black transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold font-brand">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
