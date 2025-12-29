"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaGraduationCap, 
  FaDownload, 
  FaEnvelope,
  FaFilter
} from "react-icons/fa";

// --- Mock Candidate Data ---
const candidatesData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Frontend Developer",
    location: "Austin, TX",
    experience: "5 Years",
    education: "B.S. Computer Science",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    available: true,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Full Stack Engineer",
    location: "San Francisco, CA",
    experience: "3 Years",
    education: "M.S. Software Engineering",
    skills: ["Node.js", "MongoDB", "React", "AWS"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UI/UX Designer",
    location: "New York, NY",
    experience: "4 Years",
    education: "B.A. Graphic Design",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    available: false, // Not immediately available
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "DevOps Engineer",
    location: "Remote",
    experience: "7 Years",
    education: "Certified AWS Architect",
    skills: ["Docker", "Kubernetes", "CI/CD", "Python"],
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Product Manager",
    location: "Chicago, IL",
    experience: "6 Years",
    education: "MBA",
    skills: ["Agile", "Jira", "Strategy", "User Research"],
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    available: true,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Mobile Developer",
    location: "London, UK",
    experience: "2 Years",
    education: "Bootcamp Graduate",
    skills: ["Flutter", "Dart", "Firebase", "iOS"],
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    available: true,
  },
];

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Filter Logic
  const filteredCandidates = candidatesData.filter((c) =>
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    c.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* --- Page Header & Search --- */}
      <div className="bg-slate-900 pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
                <span className="text-blue-400 font-bold uppercase text-sm tracking-wider">For Recruiters</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                    Find the Perfect Candidate
                </h1>
                <p className="text-gray-400 mt-2 max-w-xl">
                    Search through our database of verified professionals. Filter by skills, location, and experience to build your dream team.
                </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6 text-white">
                <div className="text-center">
                    <span className="block text-2xl font-bold">10k+</span>
                    <span className="text-xs text-gray-400 uppercase">Profiles</span>
                </div>
                <div className="text-center">
                    <span className="block text-2xl font-bold text-green-400">850</span>
                    <span className="text-xs text-gray-400 uppercase">Added Today</span>
                </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-md">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or skill (e.g. React)..."
                className="w-full p-3 bg-transparent outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-md">
              <FaMapMarkerAlt className="text-gray-400" />
              <input
                type="text"
                placeholder="Location (e.g. New York)..."
                className="w-full p-3 bg-transparent outline-none text-gray-700"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 w-full">
        
        {/* --- Sidebar (Filters) --- */}
        <aside className="hidden md:block w-1/4 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaFilter className="text-blue-500" /> Filter Candidates
            </h3>
            
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                <div className="space-y-2">
                    {['Entry Level', 'Mid Level (2-5 yrs)', 'Senior (5+ yrs)', 'Lead / Manager'].map((level) => (
                        <label key={level} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-600">{level}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">Immediate Joiner</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">Open to Relocate</span>
                </label>
            </div>

          </div>
        </aside>

        {/* --- Candidates Grid --- */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Showing <span className="text-blue-600">{filteredCandidates.length}</span> Candidates
            </h2>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-600 bg-white focus:outline-none text-sm">
              <option>Sort by: Relevance</option>
              <option>Sort by: Experience (High to Low)</option>
              <option>Sort by: Newest Joined</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all p-6 flex flex-col items-center text-center relative group"
                >
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img 
                        src={candidate.avatar} 
                        alt={candidate.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform" 
                    />
                    {candidate.available && (
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Available to hire"></span>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{candidate.role}</p>
                  
                  <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt /> {candidate.location}</span>
                    <span className="flex items-center gap-1"><FaBriefcase /> {candidate.experience}</span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {skill}
                        </span>
                    ))}
                    {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+ {candidate.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 w-full mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors">
                        <FaDownload size={12} /> Resume
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        <FaEnvelope size={12} /> Contact
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <p className="text-gray-500 text-lg">No candidates found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setLocationFilter(""); }}
                  className="mt-2 text-blue-600 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}