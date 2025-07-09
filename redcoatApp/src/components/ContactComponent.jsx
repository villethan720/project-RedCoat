import React, { useState } from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import Logo from './Assets/redcoatLogo.png';

function Contact() {
    //for general inquires
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    //potential sponsors/reps
    const [sponsorForm, setSponsorForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [contactStatus, setContactStatus] = useState('');
    const [sponsorStatus, setSponsorStatus] = useState('');

    // Phone number formatting function
    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters
        const phoneNumber = value.replace(/\D/g, '');
        
        // Format based on length
        if (phoneNumber.length <= 3) {
            return phoneNumber;
        } else if (phoneNumber.length <= 6) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        } else {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    };

    // Phone number validation function
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    //update changes being made for general
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phone') {
            // Format phone number as user types
            const formattedPhone = formatPhoneNumber(value);
            setContactForm(prev => ({ ...prev, [name]: formattedPhone }));
        } else {
            setContactForm(prev => ({ ...prev, [name]: value }));
        }
    };

    //update changes being made for sponsors
    const handleSponsorChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phone') {
            // Format phone number as user types
            const formattedPhone = formatPhoneNumber(value);
            setSponsorForm(prev => ({ ...prev, [name]: formattedPhone }));
        } else {
            setSponsorForm(prev => ({ ...prev, [name]: value }));
        }
    };

    //general submit action
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        //check required fields 
        if (!contactForm.name || !contactForm.email || !contactForm.message) {
            setContactStatus('Please fill out all required fields.');
            return;
        }

        // Validate phone number if provided
        if (contactForm.phone && !validatePhoneNumber(contactForm.phone)) {
            setContactStatus('Please enter a valid phone number in format (123) 456-7890.');
            return;
        }

        try {
            //get api endpoint for sendgrid
            const res = await fetch('http://localhost:3009/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...contactForm,
                    formType: 'general' // Add form type to route to general controller
                })
            });

            const data = await res.json();

            if (res.ok) {
                setContactStatus(data.success || 'Message sent!');
                setContactForm({ name: '', email: '', phone: '', message: '' });
            } else {
                setContactStatus(data.error || 'Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            setContactStatus('An error has occurred.');
        }
    };

    //submit action for sponsors
    const handleSponsorSubmit = async (e) => {
        e.preventDefault();
        //check required fields
        if (!sponsorForm.name || !sponsorForm.email || !sponsorForm.message) {
            setSponsorStatus('Please fill out all required fields.');
            return;
        }

        // Validate phone number if provided
        if (sponsorForm.phone && !validatePhoneNumber(sponsorForm.phone)) {
            setSponsorStatus('Please enter a valid phone number in format (123) 456-7890.');
            return;
        }

        try {
            //get api endpoint for sendgrid
            const res = await fetch('http://localhost:3009/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...sponsorForm,
                    formType: 'sponsor' // Add form type to route to sponsor controller
                })
            });

            const data = await res.json();

            if (res.ok) {
                setSponsorStatus(data.success || 'Message sent!');
                setSponsorForm({ name: '', email: '', phone: '', message: '' });
            } else {
                setSponsorStatus(data.error || 'Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            setSponsorStatus('An error has occurred.');
        }
    };

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-red-600 text-center px-6">
                    <h1 className="text-5xl font-bold mb-4 text-white">Contact Us 🎈</h1>
                </div>
            </section>

            {/* General Inquiry Form */}
            <section className="py-16 px-6 md:px-20 bg-red-600 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-white">Talk to us!</h2>
                    {contactStatus && <p className="mb-6 text-white font-semibold">{contactStatus}</p>}

                    <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" name="name" placeholder="Full Name" value={contactForm.name} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <input type="email" name="email" placeholder="Email Address" value={contactForm.email} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Phone Number (123) 456-7890" 
                            value={contactForm.phone} 
                            onChange={handleContactChange} 
                            pattern="\(\d{3}\) \d{3}-\d{4}"
                            maxLength="14"
                            className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" 
                        />
                        <textarea name="message" placeholder="Your Message" rows="6" value={contactForm.message} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <button type="submit" className="bg-black hover:bg-red-700 transition text-white py-3 px-6 rounded col-span-2 text-lg font-semibold">Send Message</button>
                    </form>
                </div>
            </section>

            {/* Socials */}
            <section className="bg-black text-white py-16 px-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Follow us on Social Media!</h2>
                <div className="flex justify-center gap-6 text-3xl">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a
                            href="mailto:support@redcoat.com"
                            aria-label="Email"
                            className="hover:text-red-200 transition-colors"
                        >
                            <FaEnvelope className="w-6 h-6" />
                        </a>
                </div>
            </section>

            {/* Sponsor Form */}
            <section className="py-16 px-6 md:px-20 bg-red-600 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Want to be a Sponsor/Representative?</h2>
                    {sponsorStatus && <p className="mb-6 text-white font-semibold">{sponsorStatus}</p>}

                    <form onSubmit={handleSponsorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" name="name" placeholder="Enter your name" value={sponsorForm.name} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <input type="email" name="email" placeholder="Enter your Email" value={sponsorForm.email} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Enter your Phone Number (123) 456-7890" 
                            value={sponsorForm.phone} 
                            onChange={handleSponsorChange} 
                            pattern="\(\d{3}\) \d{3}-\d{4}"
                            maxLength="14"
                            className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" 
                            required 
                        />
                        <textarea name="message" placeholder="Tell us about you!" rows="6" value={sponsorForm.message} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <button type="submit" className="bg-black hover:bg-red-600 transition text-white py-3 px-6 rounded col-span-2 text-lg font-semibold">Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Contact;
