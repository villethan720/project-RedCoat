import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'general', 'sponsor'
    const [stats, setStats] = useState({});
    const { token } = useAuth();

    useEffect(() => {
        fetchContacts();
        fetchStats();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(contacts.filter(contact => contact.form_type === filter));
        }
    }, [contacts, filter]);

    const fetchContacts = async () => {
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, '/all'), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }

            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError('Failed to load contacts');
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, '/stats/overview'), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact submission?')) {
            return;
        }

        try {
            const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, `/${id}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setContacts(contacts.filter(contact => contact.id !== id));
                fetchStats(); // Refresh stats
            } else {
                throw new Error('Failed to delete contact');
            }
        } catch (err) {
            setError('Failed to delete contact');
            console.error('Error deleting contact:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return (
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading contacts...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-6 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Management</h1>
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Total Contacts</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">General Inquiries</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.general || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Sponsor Inquiries</h3>
                            <p className="text-3xl font-bold text-purple-600">{stats.sponsor || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
                            <p className="text-3xl font-bold text-orange-600">
                                {stats.recent ? stats.recent.reduce((sum, item) => sum + parseInt(item.count), 0) : 0}
                            </p>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <label className="text-sm font-medium text-gray-700">Filter by type:</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Contacts</option>
                                <option value="general">General Inquiries</option>
                                <option value="sponsor">Sponsor Inquiries</option>
                            </select>
                            <span className="text-sm text-gray-600">
                                Showing {filteredContacts.length} of {contacts.length} contacts
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Contacts List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Contact Submissions</h2>
                    </div>
                    
                    {filteredContacts.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No contacts found for the selected filter.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredContacts.map((contact) => (
                                <div key={contact.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {contact.name}
                                                </h3>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    contact.form_type === 'general' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {contact.form_type}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        <strong>Email:</strong> {contact.email}
                                                    </p>
                                                    {contact.phone && (
                                                        <p className="text-sm text-gray-600">
                                                            <strong>Phone:</strong> {contact.phone}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        <strong>Submitted:</strong> {formatDate(contact.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                    {contact.message}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="ml-4">
                                            <button
                                                onClick={() => deleteContact(contact.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactManagement; 