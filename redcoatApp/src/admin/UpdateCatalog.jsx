import React, { useState, useEffect } from 'react';
import {
  getClothing,
  addClothing,
  updateClothing,
  softDeleteClothing,
  restoreClothing
} from '../api/clothing'; //import functions for backend use
import ImageDropZone from '../components/ImageDropZone';
import { Link } from 'react-router-dom';

function UpdateCatalog() {
  const [clothingList, setClothingList] = useState([]);
  const [newClothing, setNewClothing] = useState({ //blank form for adding new clothing
    name: '',
    price: '',
    category: '',
    image_url: '',
    description: '',
    is_active: 'true'
  });
  const [editClothing, setEditClothing] = useState(null);
  //filter results for editing clothing
  const [filteredResults, setFilteredResults] = useState([]);

  //toggle for collapsing/expanding forms 
  const [showAddSection, setShowAddSection] = useState(false);
  const [showModifySection, setShowModifySection] = useState(false);

  //set stock by size
  const [stockBySize, setStockBySize] = useState({ S: '', M: '', L: '', XL: '', ONE_SIZE: '' });

  //search input for editing clothing
  const [searchText, setSearchText] = useState('');
  const [searchId, setSearchId] = useState('');


  //pagination for edit clothing
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);


  // Fetch existing clothing
  const fetchClothing = async () => {
    try {
      const data = await getClothing();
      setClothingList(data); //store clothing in state
      setFilteredResults(data);
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
  }

  //handling search
  const handleSearch = () => {
    //filtering logic
    const results = clothingList.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesId = searchId ? item.id?.toString().includes(searchId) : true;

      return matchesSearch && matchesId;
    });
    setFilteredResults(results);
    setCurrentPage(1);
  };


  //handling new edits to update form
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target; //gets user input
    if (isEdit) {
      setEditClothing(prev => ({ ...prev, [name]: value }));
    } else {
      setNewClothing(prev => ({ ...prev, [name]: value }));
    }
  };

  //handle adding new clothing
  const handleAdd = async () => {
    //check all required fields are filled out
    if (!newClothing.name || !newClothing.price || !newClothing.category) {
      alert('Please fill in all required fields');
      return;
    }

    if (!newClothing.image_url) {
      alert('Please upload an image');
      return;
    }

    try {
      //save most recent clothing form 
      const finalClothing = {
        ...newClothing,
        image_url: newClothing.image_url.trim(),
        is_active: newClothing.is_active === 'true' || newClothing.is_active === true,
        stock_by_size: JSON.stringify(stockBySize)
      };

      await addClothing(finalClothing); //call api function
      alert('Clothing Added');
      setNewClothing({ //reset clothing
        name: '',
        price: '',
        category: '',
        image_url: '',
        description: '',
        is_active: 'true',
      });
      setStockBySize({ S: '', M: '', L: '', XL: '' , ONE_SIZE: ''}); //reset sizes 
      fetchClothing();
    } catch (error) {
      console.error('Failed to add clothing:', error);
    }
  };

  //handles updating clothing using new form
  const handleUpdate = async (id) => {
    try {
      if (!id) {
        console.error('❌ No ID passed to handleUpdate');
        return;
      }
  
      console.log('🔧 Updating ID:', id);
      console.log('📦 Current editClothing:', editClothing);
  
      const stock = typeof editClothing.stock_by_size === 'string'
        ? JSON.parse(editClothing.stock_by_size)
        : editClothing.stock_by_size;
  
      const finalClothing = {
        ...editClothing,
        is_active: editClothing.is_active === 'true' || editClothing.is_active === true,
        stock_by_size: JSON.stringify(stock)
      };
  
      await updateClothing(id, finalClothing);
      setEditClothing(null);
      fetchClothing();
    } catch (error) {
      console.error('Failed to update clothing:', error.response?.data || error.message);
    }
  };
  
  
  //delete(isActive false) clothing
  const handleSoftDelete = async (id) => {
    try {
      await softDeleteClothing(id);
      fetchClothing();
    } catch (error) {
      console.error('Failed to delete clothing:', error);
    }
  };

  //isActive true for clothing
  const handleRestore = async (id) => {
    try {
      await restoreClothing(id);
      fetchClothing();
    } catch (error) {
      console.error('Failed to restore clothing:', error);
    }
  };

  //handle refreshing filter
  const handleRefresh = () => {
    setSearchText('');
    setSearchId('');
    fetchClothing(); //re-fetch for full list
  };

  return (
    <div className="bg-black p-6 text-white min-h-screen">
      <section
        className="relative h-screen bg-cover bg-center mb-6"
        style={{ backgroundImage: "url('/picture.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
          <h2 className="text-5xl font-bold">Update the Red Coat Catalog</h2>
          <p className="text-2xl text-gray-400 font-semibold">
            Add, update, delete, or restore clothing for the page!
          </p>
          <div className="space-x-4 px-8 py-4 text-center">
            <Link to="/admin-dashboard" className="bg-red-600 px-6 py-3 rounded text-white">Back to Dashboard</Link>
            <Link to="/update-catalog" className="bg-red-600 px-6 py-3 rounded text-white">Update Catalog</Link>
            <Link to="clothing-order" className="bg-red-600 px-6 py-3 rounded text-white">Clothing Orders</Link>
          </div>
        </div>
      </section>

      {/* Toggle buttons */}
      <div className="py-24 bg-red-600 flex flex-col md:flex-row md:px-5 gap-x-4 justify-center items-center">
        <button
          onClick={() => setShowAddSection(!showAddSection)}
          className="bg-black px-4 py-2 rounded"
        >
          {showAddSection ? 'Hide Add Clothing' : 'Add New Clothing'}
        </button>

        <button
          onClick={() => setShowModifySection(!showModifySection)}
          className="bg-black px-4 py-2 rounded"
        >
          {showModifySection ? 'Hide Modify Clothing' : 'Modify Existing Clothing'}
        </button>
      </div>

      {/* Add Clothing Section */}
      {showAddSection && (
        <div className="mt-4 bg-gray-900 p-4 rounded space-y-2">
          <h2 className="text-xl font-bold mb-2">+ Add New Clothing</h2>
          {/* Create form for each field in newClothing */}
          {Object.entries(newClothing).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
            {key === 'is_active' ? (
                <select
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    className="block w-full p-2 bg-gray-800 text-white rounded"
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                ) : (
                <input
                    type="text"
                    name={key}
                    placeholder={key}
                    value={value}
                    onChange={handleInputChange}
                    className="block w-full p-2 bg-gray-800 text-white rounded"
                />
            )}
          </div>
          ))}

          <h3 className="text-lg font-semibold mt-4 mb-2">Stock by Size</h3>
          {/* Map stock_by_size for quantities */}
          {['S', 'M', 'L', 'XL', 'ONE_SIZE'].map(size => (
            <div key={size} className="flex items-center gap-2 mb-2">
              <label className="w-12">{size}</label>
              <input
                type="number"
                min="0"
                name={size}
                value={stockBySize[size] ?? ''} //added fallback for undefined
                onChange={(e) =>
                  setStockBySize(prev => ({ ...prev, [size]: e.target.value }))
                }
                className="flex-1 p-2 bg-gray-800 text-white rounded"
                placeholder={`Quantity for ${size}`}
              />
            </div>
          ))}
          <h3 className="text-lg font-semibold mt-4 mb-2">Image Upload</h3>
          <ImageDropZone
            onUpload={(url) =>
              setNewClothing((prev) => ({ ...prev, image_url: url ?? ''}))
            }
          />

          {newClothing.image_url ? (
            <div className="mt-2">
              <img
                src={newClothing.image_url}
                alt="Preview"
                className="h-40 object-cover rounded"
              />
            </div>
          ) : null}

          <button onClick={handleAdd} className="bg-green-700 px-4 py-2 rounded">Submit</button>
        </div>
      )}

      {/* Modify Clothing Section */}
      {showModifySection && (
        <>
          <div className="mb-4 space-y-3 text-center justify-center items-center">
            <input
              type="text"
              placeholder="Search clothing"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-2 w-1/3 px-4 bg-gray-800 text-white rounded border border-white"
            />
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="p-2 w-1/3 px-4 bg-gray-800 text-white rounded border border-white"
            />
            <button onClick={handleSearch} className="bg-red-600 px-4 py-2 rounded mt-2 border border-black">
              Search
            </button>
            <button onClick={handleRefresh} className="bg-red-600 px-4 py-2 rounded mt-2 border border-black">
              Refresh
            </button>
          </div>

          <ul className="space-y-4 mt-6">
            {currentItems 
              .sort((a, b) => (a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1))
              .map(item => (
                <li key={item.id} className="bg-gray-800 p-4 rounded">
                  {editClothing && editClothing.id === item.id ? (
                    <>
                      {Object.keys(item)
                        .filter(key => !['_id', '__v', 'stock_by_size'].includes(key))
                        .map(key => (
                          <div key={key} className="mb-2">
                            <label className="block text-sm font-semibold text-white mb-1 captialize">
                              {key.replace('_', ' ')}
                            </label>
                            {key === 'is_active' ? (
                              <select 
                                name={key}
                                value={editClothing[key] === true ? 'true' : 'false'}
                                onChange={(e) => handleInputChange(e, true)}
                                className="w-full p-2 bg-gray-500 text-white rounded"
                              >
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            ) : (
                              <input
                                type="text"
                                name={key}
                                value={editClothing[key]}
                                onChange={(e) => handleInputChange(e, true)}
                                className="w-full p-2 bg-gray-400 text-white rounded"
                                placeholder={key}
                              />
                            )}
                          </div>
                        ))}

                        <h3 className="text-lg font-semibold mt-4 mb-2">Stock by Size</h3>
                        {['S', 'M', 'L', 'XL', 'ONE_SIZE'].map(size => (
                          <div key={size} className="flex items-center gap-2 mb-2">
                            <label className="w-18">{size}</label>
                            <input
                              type="number"
                              min="0"
                              value={editClothing.stock_by_size[size] || ''}
                              onChange={(e) => {
                                const updatedStock = {
                                  ...editClothing.stock_by_size,
                                  [size]: e.target.value,
                                };
                                setEditClothing(prev => ({
                                  ...prev,
                                  stock_by_size: updatedStock
                                }));
                              }}
                              className="flex-1 p-2 bg-gray-400 tect-white rounded"
                              placeholder={`Quantity for ${size}`}
                            />
                          </div>
                        ))}

                        <div className="mt-4 space-x-2">
                          <button 
                            onClick={() => handleUpdate(editClothing.id)}
                            className="bg-gray-400 px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditClothing(null)}
                            className="bg-gray-400 px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                    </>
                  ) : (
                    <>
                      <p><strong>{item.name}</strong> - ${item.price}</p>
                      <p>{item.description}</p>
                      <div className="space-x-2 mt-2">
                        <button 
                          onClick={() => 
                            setEditClothing({
                              ...item,
                              id: item.id || item._id,
                              stock_by_size: typeof item.stock_by_size === 'string'
                                ? JSON.parse(item.stock_by_size)
                                : item.stock_by_szize || { S: '', M: '', L: '', XL: '', ONE_SIZE: '' }
                            })
                          }
                          className="bg-red-600 px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleSoftDelete(item.id)}
                          className="bg-red-600 px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                        {item.deleted && (
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="bg-red-600 px-3 py-1 rounded"
                          >
                            Restore
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>

          {filteredResults.length > 0 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1 ? 'bg-red-600' : 'bg-gray-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 gray-400 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UpdateCatalog;