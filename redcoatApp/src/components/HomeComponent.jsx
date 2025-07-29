import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Slider from 'react-slick';
import Logo from './Assets/redcoatLogo.png';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

function Home() {
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get(buildApiUrl(API_CONFIG.ENDPOINTS.CLOTHING));
        setClothingItems(response.data);
      } catch (error) {
        console.error('Error fetching clothing:', error);
      }
    };

    fetchClothing();
  }, []);

  // Slider config for carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section
        className="relative bg-center h-[110vh]"
        style={{ backgroundImage: `url(${Logo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-white text-center px-6">
          <h1 className="text-5xl font-bold mb-4">It's Red Coat 🎈</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-red-600 text-5xl font-bold mb-4 font-brand">What's Red Coat?</h2>
          <p className="text-white text-2xl leading-relaxed font-brand">
            Red Coat is a sponsorship agency that bridges the gap between our sponsors and 
            brands. We represent entertainers from all backgrounds and empower them to express
            themselves. We're a community that values authentic, meaningful relationships. We
            support our clients’ passions and help them grow their networks by connecting them with
            brands that align with their ideals and style. We're redefining how sponsorship agencies engage
            with their communities — building something unified and authentic.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 md:px-20 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-red-600 mb-4 font-brand">The Story Behind Our Logo</h2>
          <p className="text-white text-2xl leading-relaxed font-brand">
            The red coat symbolizes warmth, confidence, and the courage to be yourself. Just like how a
            red coat stands out in a crowd, we encourage you to embrace your uniqueness. The balloon represents
            freedom — a visual metaphor for rising above and pursuing your passions.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-6 md:px-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-black mb-4 font-brand">What Do We Do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-black mb-2 font-brand">Quality Connections</h3>
              <p className="text-white text-xl font-brand">Support our sponsors through a genuine partnerships.</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-black mb-2 font-brand">Support the Community</h3>
              <p className="text-white text-xl font-brand">We donate a portion of profits to homeless foundations.</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-black mb-2 font-brand">Connect the Dots</h3>
              <p className="text-white text-xl font-brand">
                We help sponsors build networks by connecting them with like-minded brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 md:px-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-3xl mb-4 text-red-600 font-brand">What's the process?</h2>
          <p className="text-white text-lg mb-8 font-modern">
            From day one, every step reflects our commitment to quality and authenticity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Design', 'Create', 'Connect', 'Deliver'].map((step, index) => (
              <div className="text-center" key={index}>
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold font-brand">{index + 1}</span>
                </div>
                <h3 className="text-white font-semibold font-brand">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 font-brand">New Releases</h2>
          {Array.isArray(clothingItems) && clothingItems.length > 0 && (
            <Slider {...sliderSettings}>
              {clothingItems.slice(0, 6).map((item) => (
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
