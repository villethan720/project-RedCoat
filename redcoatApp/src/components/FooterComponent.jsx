import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-black text-white border-t border-red-600 font-brand">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand & Mission */}
                <div>
                    <h2 className="text-2xl font-bold text-red-600 mb-3 font-brand">Red Coat</h2>
                    <p className="text-gray-400 font-modern">
                        Make authentic connections 🎈
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-red-500 mb-3 font-brand">Quick Links</h3>
                    <ul className="space-y-2 font-modern">
                        <li><a href="/" className="hover:text-red-400 transition-colors">Home</a></li>
                        <li><a href="/product" className="hover:text-red-400 transition-colors">Shop</a></li>
                        <li><a href="/mission" className="hover:text-red-400 transition-colors">Our Mission</a></li>
                        <li><a href="/team" className="hover:text-red-400 transition-colors">Our Team</a></li>
                        <li><a href="/contact" className="hover:text-red-400 transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold text-red-500 mb-3 font-brand">Connect With Us</h3>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://instagram.com/redjackets4?igsh=eDlmb2F0ODBzc2hh"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-red-200 transition-colors"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a
                            href="mailto:support@redcoat.com"
                            aria-label="Email"
                            className="hover:text-red-200 transition-colors"
                        >
                            <FaEnvelope className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm py-4 border-t border-red-600 font-modern">
                © {new Date().getFullYear()} Red Coat. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
