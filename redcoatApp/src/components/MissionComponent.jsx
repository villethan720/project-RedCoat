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
            <section className="py-20 px-6 md:px-20 bg-black text-white text-center">
                <div className="max-w-7xl mx-auto space-y-5">
                    <h2 className="text-7xl font-brand text-red-600 mb-4">Mission Statement</h2>
                    <p className="text-5xl font-brand">
                    "Our mission is to transform the sponsorship experience by centering authenticity, innovation, and human connection. 
                    Red Coat creates long-term relationships that empower individuals and contribute to the communities that raised us."
                    </p>
                </div>
            </section>

            {/* Goals of Red Coat */}
            <section className="py-20 px-6 md:px-20 bg-black text-white">
            <div className="max-w-5xl mx-auto space-y-10">
                <div>
                <h2 className="text-5xl font-semibold text-red-600 mb-4">Our Goals</h2>
                <p className="text-2xl leading-8">
                Red Coat is a sponsorship agency dedicated to bridging the gap between entertainers and brands. 
                Our mission is to make the Red Coat name synonymous with trust and connection for both sponsors and representatives.

                Through meaningful partnerships, we aim to build a community rooted in unity, authenticity, and long-lasting relationships.
                At Red Coat, we believe that a connection with us is a connection for life—where genuine friendships grow and thrive.

                We’re also committed to giving back. A portion of our funds is donated to various homeless foundations, supporting the communities 
                that helped shape us. Additionally, we strive to uplift the causes our sponsors and representatives care most about.
                </p>
                </div>
            </div>
            </section>

            <section className="py-20 px-6 md:px-20 bg-black text-white">
                {/* Pillars red coat is based on */}
                <div className="max-w-5xl mx-auto space-y-10">
                    <h2 className="text-5xl font-smeibold text-red-600 mb-4">Our Pillars</h2>
                    <p className="text-2xl leading-8">
                    At Red Coat, our foundation is built on three core pillars: authenticity, meaningful connection, and innovation in sponsorship.

                    We believe in the power of being your authentic self—unapologetically and confidently. We encourage everyone in our community to 
                    embrace who they are and share their unique story.

                    We’re also passionate about building lasting relationships. Whether you're a sponsor, representative, or supporter, we aim to 
                    create bonds that go beyond business—rooted in trust, mutual respect, and shared goals.

                    Lastly, we’re here to redefine what it means to be a sponsorship agency. We challenge the traditional model by prioritizing people 
                    over profit and putting community, transparency, and long-term impact at the heart of everything we do.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-red-600 text-center">
                <h2 className="text-3xl font-bold mb-4 text-black">Feel free to contact us to learn more!</h2>
                <Link to="/contact" className="p-6 py-4 px-6 text-white bg-black rounded">Contact Us!</Link>
            </section>
        </div>
    )
}
export default Mission;