import React, { useEffect, useState} from 'react';
import { getAllClothing } from '../api/clothing';
import Logo from '../components/Assets/redcoatLogo.png';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [ clothing, setClothing] = useState([]);
    const [loading, setLoading] = useState(true); //loading clothing from db
    const [filteredResults, setFilteredResults] = useState([]); //for applied filters
    const [searchText, setSearchText] = useState([]); //search bar
    const [category, setCategory] = useState(''); //category
    const [size, setSize] = useState(''); //size
    const [status, setStatus] = useState('');

    //pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage)

    //call api to get clothing
    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const data = await getAllClothing();
                setClothing(data);
                setFilteredResults(data);
            } catch (error) {
                console.error('Failed to load inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClothing();
    }, []);

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
            
            const stockKeys = item.stock_by_size ? Object.keys(item.stock_by_size) : [];
            const matchesSize = size ? stockKeys.some(s => s.toLowerCase() === size.toLowerCase()) : true;

            const matchesStatus = 
                status === 'active' ? !item.is_deleted :
                status === 'inactive' ? item.is_deleted :
                true;

            return matchesSearch && matchesCategory && matchesSize && matchesStatus;
        });
        setFilteredResults(results);
        setCurrentPage(1)
    };

    if (loading) return <p className="text-white p-6 text-center">Loading...</p>

    return (
        <div className="min-h-screen bg-black text-white pb-16">
            <section className="relative bg-center h-[110vh]" style={{backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
                    <h2 className="text-5xl font-bold mb-4">Red Coat Inventory</h2>
                    <div className="space-x-4">
                        <Link to="/admin-dashboard" className="bg-red-600 px-6 py-3 rounded text-white">Back to Dashboard</Link>
                        <Link to="/update-catalog" className="bg-red-600 px-6 py-3 rounded text-white">Update Catalog</Link>
                        <Link to="clothing-order" className="bg-red-600 px-6 py-3 rounded text-white">Clothing Orders</Link>
                    </div>
                </div>

            </section>

            {/* filter bar */}
            <div className="sticky top-0 z-10 bg-red-600 border border-red-600 p-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/6 focus:outline-none"
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
                    className="px-4 py-2 rounded-md bg-gray-800 text-white w-full md:w-1/6 focus:outline-none"
                >
                    <option value="">All Sizes</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-4 py-2 rounded bg-gray-800 text-white w-full md:w-1/4"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button
                    type="button"
                    onClick={handleSearch}
                    className="px-4 py-2 rounded-md bg-black text-white w-full md:w-1/6 hover:bg-red-700 transition"
                >
                    Search
                </button>
            </div>

            {/* inventory */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-white mt-6 border-collapse">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Image Url</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Stock By Size</th>
                            <th className="p-2">Is Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id} className="border-b border-gray-400">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.price}</td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2">{item.image_url}</td>
                                <td className="p-2">{item.description}</td>
                                <td className="p-2">
                                    {Object.entries(item.stock_by_size || {}).map(
                                        ([size, qty]) => (
                                            <span key={size} className="inline-block mr-2">
                                                {size.toUpperCase()} ({qty})
                                            </span>
                                        )
                                    )}
                                </td>
                                <td className="p-2">{item.is_active}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center px-4 py-6 gap-4">
                    <button 
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                    >
                        First
                    </button>
                    <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-white text-lg">{currentPage} of {totalPages}</span>
                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    <button 
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    )

}

export default Inventory;