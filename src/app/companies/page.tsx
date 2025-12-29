"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import StarRating from "../Components/StarRating";
import Link from "next/link";
import { FaSearch, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

// Mock Data
const companies = [
  {
    id: 1,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    rating: 4.5,
    reviews: 1240,
    location: "Mountain View, CA",
    industry: "Internet",
    description: "Google organizes the world's information and makes it universally accessible and useful.",
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    rating: 4.3,
    reviews: 950,
    location: "Redmond, WA",
    industry: "Technology",
    description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    rating: 3.8,
    reviews: 2100,
    location: "Seattle, WA",
    industry: "E-Commerce",
    description: "Amazon is guided by four principles: customer obsession, passion for invention, and operational excellence.",
  },
  {
    id: 4,
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
    rating: 4.7,
    reviews: 320,
    location: "Stockholm, Sweden",
    industry: "Music Streaming",
    description: "Spotify is a digital music service that gives you access to millions of songs.",
  },
];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Search */}
      <div className="bg-slate-900 text-white py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Find Great Places to Work
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Get access to millions of company reviews, salary reports, and interview questions.
        </p>
        
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text"
            placeholder="Search for a company..."
            className="w-full py-4 pl-12 pr-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Companies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-6">
              <div className="w-16 h-16 bg-white p-2 border border-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <img src={company.logo} alt={company.name} className="object-contain w-full h-full" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/companies/${company.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-600">
                      {company.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={company.rating} />
                      <span className="text-sm text-blue-600 font-semibold">{company.rating}</span>
                      <span className="text-xs text-gray-400">({company.reviews} Reviews)</span>
                    </div>
                  </div>
                  <Link href={`/companies/${company.id}`} className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                    View Details
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FaBuilding /> {company.industry}</span>
                  <span className="flex items-center gap-1"><FaMapMarkerAlt /> {company.location}</span>
                </div>
                
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {company.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}