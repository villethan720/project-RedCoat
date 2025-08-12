import React , { useEffect, useState }from 'react';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';
import ProductCard from '../components/ProductCard';
import Logo from './Assets/redcoatLogo.png';

const ClothingCatalog = () => {
    const showComingSoon = true; //change when api is updated

    const [clothing, setClothing] = useState([]);
    const [loading, setLoading] = useState(true);
    //variable for filtering
    const [filteredResults, setFilteredResults] = useState([]);

    //variable for search bar
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    // Fetch existing clothing
    const fetchClothing = async () => {
        try {
        const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CLOTHING),{
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        });

        const data = await res.json();
        setClothing(data); //store clothing in state
        setFilteredResults(data);

        setLoading(false);
        } catch (error) {
        console.error('Failed to load clothing:', error);
        }
    };

    useEffect(() => {
        fetchClothing();
    }, []);

    //pagination button handles
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleSearch = () => {
        //filtering logic
        const results = clothing.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = category ? item.category.toLowerCase() === category.toLowerCase() : true;

            //handle one size fits all to show only if it has value
            const stockBySize = item.stock_by_size || {};
            const inStockSizes = Object.entries(stockBySize)
                .filter(([_, qty]) => qty > 0)
                .map(([key]) => key.toLowerCase());

            const matchesSize = size ? inStockSizes.includes(size.toLowerCase()) : true;
            return matchesSearch && matchesCategory && matchesSize;
        });
        setFilteredResults(results);
        setCurrentPage(1);
    };

    //handling refresh
    const handleRefresh = () => {
        setSearchText('');
        setCategory('');
        setSize('');
        fetchClothing();
    }

    // 👉 Add this short-circuit return BEFORE your regular layout
    if (showComingSoon) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">🛍️ Shop Coming Soon!</h1>
                <p className="text-lg max-w-xl">
                    Stay tuned for a clothing drop soon🎈
                </p>
            </div>
        );
    }

    if(loading) return <p className="text-white p-6 text-center">Loading...</p>;

    return (
        <div className="min-h-screen bg-black text-white pb-16">
            {/* Hero Section */}
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-white text-center px-6">
                    <h2 className="text-5xl font-bold">Welcome to Our Shop 🎈</h2>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-0 z-10 bg-red-600 border border-red-600 p-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-600 font-modern"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/6 focus:outline-none font-modern"
                >
                    <option value="">All Categories</option>
                    <option value="hats">Hats</option>
                    <option value="beanies">Beanies</option>
                    <option value="shirts">Shirts</option>
                    <option value="jackets">Jackets</option>
                    <option value="hoodies">Hoodies</option>
                </select>

                <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/6 focus:outline-none font-modern"
                >
                    <option value="">All Sizes</option>
                    <option value="ONE_SIZE">One Size Fits All</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    
                </select>

                <button
                    type="button"
                    onClick={handleSearch}
                    className="px-4 py-2 rounded-md bg-black text-white w-full md:w-1/6 hover:bg-red-700 transition font-brand"
                >
                    Search
                </button>

                <button 
                    type="button" 
                    onClick={handleRefresh}
                    className="px-4 py-2 rounded-md bg-black text-white w-full md:w-1/6 hover:bg-gray-400 transition font-brand"
                >
                    Refresh
                </button>
            </div>

            {/* Product Grid */}
            <div className="px-4 py-10 flex justify-center">
                <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl justify-items-center">
                    {currentItems.map(item => (
                        <ProductCard key={item.id} {...item} />
                    ))}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center px-4 py-6 gap-4">
                    <button 
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50 font-brand"
                    >
                        First
                    </button>
                    <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 font-brand"
                    >
                        Previous
                    </button>
                    <span className="text-white text-lg font-modern">{currentPage} of {totalPages}</span>
                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 font-brand"
                    >
                        Next
                    </button>
                    <button 
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50 font-brand"
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    );
};
    
export default ClothingCatalog;