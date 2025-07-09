import React from 'react';
import Logo from './Assets/redcoatLogo.png';
import { Link } from 'react-router-dom';

function Mission(){
    return(
        <div className="bg-black text-white">
            <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">Our Mission 🎈</h1>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 px-6 md:px-20 bg-black text-white">
            <div className="max-w-5xl mx-auto space-y-10">
                <div>
                <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Goals</h2>
                <p className="text-lg leading-8 text-gray-400">
                    Red Coat is a Sponsorship Agency that wants to work as the middle man between entertainers and the brand. We want our brand
                    to be recognizable to our sponsors and representatives. Through our connections, we hope to build a community that is based on trust, unity, and authenticity.
                    A connection with Red Coat is a connection for life and we want to ensure that friendship are built between everyone in our community. Along with this, we want to 
                    contribute back to the community by donating a portion of our funds to varies homeless foundations. These communities are what raised us and we want to ensure that
                    we support that different causes that our sponsors and representatives care deeply about. 
                </p>
                </div>
            </div>
            </section>

            <section className="py-20 px-6 md:px-20 bg-black text-white">
                {/* Reasons why  */}
                <div className="max-w-5xl mx-auto space-y-10">
                    <h2 className="text-3xl font-smeibold text-red-600 mb-4">Our Why</h2>
                    <p className="text-lg leading-8 text-gray-400">
                        Our pillars involve being your authentic self, building lasting connections, and redefining how sponsorship agencies operate.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-red-600 text-center">
                <h2 className="text-3xl font-bold mb-4 text-black">Explore our shop!</h2>
                <Link to="/product" className="p-6 py-4 px-6 text-white bg-black rounded">Shop Now</Link>
            </section>
        </div>
    )
}
export default Mission;