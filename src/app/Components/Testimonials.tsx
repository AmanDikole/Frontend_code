import React from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    company: "Hired at Amazon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "I was struggling to find remote work until I found this portal. The filtering options are amazing, and I landed a job within 2 weeks!",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Recruiter",
    company: "TechSolutions Inc.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "As a recruiter, the quality of candidates here is far better than other platforms. The AI matching saves me hours of screening time.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Graphic Designer",
    company: "Freelancer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The interface is so clean and easy to use. I love the 'Featured Jobs' section—it helped me find high-paying clients quickly.",
  },
];

const companies = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Trusted Companies Banner --- */}
        <div className="mb-20 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">Trusted by 5,000+ Companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Using simple img tags for external SVG logos for demo. In production, use local assets or Next Image */}
            {companies.map((logo, index) => (
              <img key={index} src={logo} alt="Company Logo" className="h-8 md:h-10 object-contain" />
            ))}
          </div>
        </div>

        {/* --- Testimonials Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Here is what job seekers and recruiters have to say about their experience.
          </p>
        </div>

        {/* --- Reviews Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-blue-200 text-4xl absolute top-6 left-6" />
              
              <div className="relative z-10 pt-6">
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{review.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <img 
                        src={review.image} 
                        alt={review.name} 
                        className="rounded-full object-cover w-full h-full border-2 border-white shadow-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <p className="text-xs text-blue-600 font-medium">{review.company}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-yellow-400 mt-4 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}