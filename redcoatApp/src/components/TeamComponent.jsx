import React, {useState} from 'react';
import EthanBio1 from './Assets/EthanBio1.JPG';
import GregJrBio from './Assets/GregJrBio.jpeg';
import Logo from './Assets/redcoatLogo.png';

//List of team members for their bios
const team = [
    {
        name: 'Greg Pai Jr.',
        title: 'Founder, Red Coat | Sports Management Veteran',
        image: GregJrBio,
        intro: `Originally from New Jersey, Greg is focused on building authentic connections. He’s passionate about supporting the community and helping connect Red Coat clients with brands of all sizes.`,
        bio: 'Greg Pai is a seasoned sports management professional with a strong track record in building successful brand partnerships. After years of working with top organizations, he founded Red Coat, a sponsorship agency focused on bold and effective brand connections. Outside of professional work, he has been featured on "Local Love" (Pittsburgh Season),now streaming on Very Local. This experience was a step outside of his comfort zone and showcased his openness to new experiences and connections. At heart, Greg is passionate about building relationships with clients, partners, and audiences. He believes the most valuable results comes from trust, collaboration, and a willingness to be authentic',
        email: 'gregpai@gmail.com',
    },
    {
        name:'Greg Pai Sr.',
        title: 'Strategic Advisor',
        image: Logo,
        intro: 'From the Bronx, Greg Sr. is a highly accomplished individual who has decided to provide his abilities to Red Coat. He has a bright, high energy attitude that is backed up with years of experience.',
        bio: `Greg Pai Sr. is a seasoned executive with a distinguished career working alongside high-profile individuals and organizations. His notable accomplishments include serving as manager to Eddie Murphy, holding the position of Executive Vice President at Speer Communications, and playing a key role in the launch of the Game Show Network. At Red Coat, Greg serves as our Strategic Advisor, offering guidance and mentorship to help shape and grow the company. Beyond his professional achievements, he is deeply passionate about photography, music, and community service.`,
        email: 'GregSr@gmail.com',
    },
    {
        name: 'Ethan Villa',
        title: 'Creative Coordinator',
        image: EthanBio1,
        intro: 'Hailing from Central Texas, Ethan is a young and ambitious creative contributing his talents to Red Coat. He is the mind behind our logo and website design and continues to bring fresh, innovative ideas to the team.',
        bio: `Ethan Villa is a recent graduate from Point Park University that is eager to share his talents with the world. He provides new ideas that benefits the team and our sponsors. His main passion is improving the technology for Red Coat so that our users can have a user friendly experience when learning more about Red Coat. Along with improving Red Coat's technology, He provides different ideas for clothing and visual aspects of Red Coat. His role is fluid and he has taken the reigns completely.`,
        email: 'villaethan720@gmail.com'
    },
    {
      name: 'Ed Thompson',
      title: 'Red Coat Photographer',
      image: Logo,
      intro: `A Pittsburgh native, Ed Thompson is well known within the Steelers community. He’s excited to share his talents with Red Coat by providing high-quality imagery for our clients while continuing to grow his portfolio.`,
      bio: 'Ed Thompson is a veteran in the photography world. He currently works as a multimedia photojournalist for pghsteelersnow where he joins the Steelers for summer camps and home game. He can be found on the sidelines taking photos of the athletes. He is an easy-going individual who want to share his art with others.',
      email: 'example@aol.com'
    }
];

function Team() {
  //useState to tell if bio is expanded or not
  const [expandedIndex, setExpandedIndex] = useState(null);

  //handles expanding bio or collapsing it
  const toggleBio = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  //modal state for images
  const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="bg-black text-white min-h-screen">
        {/* Page Header */}
        <section className="relative bg-center h-[110vh]" style={{ backgroundImage: `url(${Logo})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center text-white text-center px-6">
            <h1 className="text-5xl font-bold font-brand">Meet The Red Coat Team 🎈</h1>
          </div>
        </section>
  
        {/* Team Members, map out list*/}
        <section className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-900 p-6 rounded-2xl shadow-lg gap-8"
            >
              {/* Uniform Image Container */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-red-600 bg-gray-800 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    onClick={() => setSelectedImage(member.image)}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback for missing images */}
                  <div className="hidden w-full h-full items-center justify-center text-gray-400 text-center p-4">
                    <div>
                      <div className="text-4xl mb-2">👤</div>
                      <div className="text-sm font-modern">No Image</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member fields */}
              <div className="text-left flex-1">
                <h2 className="text-2xl font-bold text-red-600 font-brand">{member.name}</h2>
                <p className="text-sm text-gray-400 mb-2 font-modern">{member.title}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-red-600 underline hover:text-red-200 text-sm block mb-2 font-modern"
                >
                  {member.email}
                </a>
                <p className="text-sm font-semibold text-gray-400 mb-2 font-modern">{member.intro}</p>

                <div className="mb-2">
                  <button 
                    onClick={() => toggleBio(index)}
                    className="text-sm text-red-600 underline hover:text-red-200 focus:outline-none cursor-pointer font-brand"
                  >
                    {expandedIndex === index ? 'Hide Bio' : 'Learn More'}
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedIndex === index ? 'max-h-[500px] mt-2' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-400 leading-7 font-modern">{member.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <img 
                src={selectedImage} 
                alt="Full Size" 
                className="max-w-full max-h-full rounded-xl object-contain" 
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default Team;

