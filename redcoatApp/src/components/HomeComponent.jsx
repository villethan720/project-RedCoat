import React, {useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Logo from './Assets/redcoatLogo.png';

function Home(){
    const [clothingItems, setClothingItems] = useState([]);

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/clothing');
                setClothingItems(response.data);
            } catch(error) {
                console.error('Error fetching clothing', error);
            }
        };

        fetchClothing();
    }, []);

    //Carousel logic using Slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, //shows 3 clothing
        slidesToScroll: 1,
        responsive: [
            {breakpoint: 1024,
                settings: {
                    slidesToShow: 2, 
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-white text-center px-6">
                    <h1 className="text-5xl font-bold mb-4 font-bold">It's Red Coat 🎈 </h1>
                    <p className="text-xl mb-8 font-modern">Make authentic connections</p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 md:px-20 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-red-600 text-3xl font-bold mb-4 font-brand">What's Red Coat?</h2>
                    <p className="text-gray-300 text-lg leading-relaxed font-modern">
                        Red Coat is more than just clothing. We're a community that believes in authentic connections 
                        and meaningful relationships. Our products are designed to help you express your true self 
                        while building genuine connections with others.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-6 md:px-24 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-red-600 mb-4 font-brand">The Story Behind Our Logo</h2>
                    <p className="text-white text-lg leading-relaxed font-modern">
                        The red coat represents warmth, confidence, and the courage to be yourself. 
                        Just like a red coat stands out in a crowd, we encourage you to embrace your uniqueness 
                        and make authentic connections that last a lifetime.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-16 px-6 md:px-20 bg-red-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold white mb-4 font-brand">What Do We Do?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2 font-brand">Quality Connections</h3>
                            <p className="text-gray-200 font-modern">Support our Sponsors and make a genuine partnership</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2 font-brand">Support the Community</h3>
                            <p className="text-gray-200 font-modern">Donate part of our profits to homeless foundations.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2 font-brand">Connect the Dots</h3>
                            <p className="text-gray-200 font-modern">We want to connect our Sponsors with brands that will expand their network.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-bold text-3xl mb-4 text-red-600 font-brand">What's the process?</h2>
                    <p className="text-white text-lg mb-8 font-modern">
                        From design to delivery, we ensure every step reflects our commitment to quality and authenticity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold font-brand">1</span>
                            </div>
                            <h3 className="text-white font-semibold font-brand">Design</h3>
                        </div>
                        <div className="text-center">
                            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold font-brand">2</span>
                            </div>
                            <h3 className="text-white font-semibold font-brand">Create</h3>
                        </div>
                        <div className="text-center">
                            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold font-brand">3</span>
                            </div>
                            <h3 className="text-white font-semibold font-brand">Connect</h3>
                        </div>
                        <div className="text-center">
                            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold font-brand">4</span>
                            </div>
                            <h3 className="text-white font-semibold font-brand">Deliver</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Link */}
            <section className="py-16 px-6 md:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-white text-3xl font-bold mb-4 font-brand">Learn more about our Mission</h2>
                    <Link to="/mission" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition font-brand">
                        Our Mission
                    </Link>
                </div>
            </section>

            {/* New Releases Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8 font-brand">New Releases</h2>
                    {clothingItems.length > 0 && (
                        <Slider {...sliderSettings}>
                            {clothingItems.slice(0, 6).map(item => (
                                <div key={item.id} className="px-2">
                                    <ProductCard {...item} />
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;