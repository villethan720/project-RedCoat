import React, { useState } from 'react';
import Logo from './Assets/redcoatLogo.png';
import { Link} from 'react-router-dom';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

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
            const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CONTACT), {
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
            const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CONTACT), {
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

            <section className="py-16 px-6 md:px-20 bg-black">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left side - Text content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl font-bold mb-6 text-red-600">Send us your thoughts!</h2>
                        <p className="text-2xl font-brand text-white">
                        We’d Love to Hear From You!
                        We're always open to conversation and eager to connect. Whether you have questions, concerns, or 
                        general feedback, we welcome it all. Please don’t hesitate to reach out—someone from our team will 
                        get back to you as soon as possible.Typical response time is within 7–10 business days.
                        </p>
                    </div>

                    {/* Right side - General Inquiry Form */}
                    <div className="lg:w-1/2">
                        {contactStatus && <p className="mb-6 text-white font-semibold text-center">{contactStatus}</p>}

                        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label htmlFor="name" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Full Name <span className="text-red-600">*</span></label>
                        <input type="text" name="name" placeholder="Ex: John Doe" value={contactForm.name} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <label htmlFor="email" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Email Address <span className="text-red-600">*</span></label>
                        <input type="email" name="email" placeholder="Ex: JohnDoe123@gmail.com" value={contactForm.email} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <label htmlFor="phone" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Phone Number</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="(123) 456-7890" 
                            value={contactForm.phone} 
                            onChange={handleContactChange} 
                            pattern="\(\d{3}\) \d{3}-\d{4}"
                            maxLength="14"
                            className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" 
                        />
                        <label htmlFor="message" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Message <span className="text-red-600">*</span></label>
                        <textarea name="message" placeholder="Talk to us!" rows="6" value={contactForm.message} onChange={handleContactChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                        <button type="submit" className="bg-red-600 hover:bg-blue-600 transition text-white py-3 px-6 rounded">Send Message</button>
                    </form>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 md:px-20 bg-red-600 text-center">
                <h2 className="text-3xl font-semibold mb-6 text-white p-4">Learn more about our Team Members</h2>
                <Link to="/team" className="bg-black hover:text-red-600 px-4 py-2 rounded transition">Meet the Team!</Link>
            </section>

            {/* Sponsor Form */}
            <section className="py-16 px-6 md:px-20 bg-black font-brand">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left side of content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl font-bold mb-6 text-red-600">Interested in Becoming a Sponsor or Representative?</h2>
                        <p className="text-2xl font-brand text-white">
                        We’d love to learn more about you! Please provide your name, email address, and phone number, along with a bit about yourself.
                        Tell us who you are, what you're passionate about, and the goals you're working toward. We’d also love to hear how you think 
                        we can help you connect with others. Feel free to share as much as you’re comfortable with. We’re excited to connect and look 
                        forward to starting a conversation!
                        Typical response time is 7–10 business days.
                        </p>
                    </div>

                    <div className="lg:w-1/2">
                        {sponsorStatus && <p className="mb-6 text-white font-semibold">{sponsorStatus}</p>}

                        <form onSubmit={handleSponsorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label htmlFor="name" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" name="name" placeholder="Ex: John Doe" value={sponsorForm.name} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                            <label htmlFor="email" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" name="email" placeholder="Ex: JohnDoe123@gmail.com" value={sponsorForm.email} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                            <label htmlFor="phone" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Phone Number <span className="text-red-500">*</span></label>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="(123)456-7890" 
                                value={sponsorForm.phone} 
                                onChange={handleSponsorChange} 
                                pattern="\(\d{3}\) \d{3}-\d{4}"
                                maxLength="14"
                                className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" 
                                required 
                            />
                            <label htmlFor="message" className="text-white bg-black text-base rounded px-2 py-1 block w-full max-w-xs mb-1">Message <span className="text-red-500">*</span></label>
                            <textarea name="message" placeholder="Tell us about you!" rows="6" value={sponsorForm.message} onChange={handleSponsorChange} className="p-3 rounded bg-gray-800 placeholder-gray-400 col-span-2" required />
                            <button type="submit" className="bg-red-600 hover:bg-blue-600 transition text-white py-3 px-6 rounded col-span-2 text-lg font-semibold">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
