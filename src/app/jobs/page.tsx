"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import { 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaClock, 
  FaSearch, 
  FaBuilding,
  FaArrowRight,
  FaBriefcase
} from "react-icons/fa";

// --- Types ---
interface Job {
  id: number;
  title: string;
  companyName: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: string;
  description: string;
  postedAt: string;
}

// --- Helper: Format Date (e.g., "2 days ago") ---
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  return "Today";
};

// --- Helper: Get Badge Color ---
const getJobTypeColor = (type: string) => {
  switch (type) {
    case "Full Time": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Part Time": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Contract": return "bg-orange-100 text-orange-700 border-orange-200";
    case "Internship": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
      })
      .then((data) => {
        // Sort by newest first
        const sorted = data.sort((a: Job, b: Job) => 
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
        setJobs(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />

      {/* --- Hero Search Section --- */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-36 pb-24 px-6 overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Find Your Next <span className="text-blue-300">Dream Job</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            Browse thousands of job openings from top companies.
          </p>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex bg-white rounded-xl shadow-2xl p-2">
              <div className="flex-grow flex items-center pl-4">
                <FaSearch className="text-gray-400 text-xl" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company..." 
                  className="w-full px-4 py-3 text-gray-700 focus:outline-none text-lg placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Job Listings --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 mb-20 relative z-20 flex-grow w-full">
        
        {loading ? (
          // --- Skeleton Loading State ---
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Company Logo (Generated from Initials) */}
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200 shrink-0 shadow-inner">
                   <span className="text-2xl font-bold text-gray-600">
                     {job.companyName.charAt(0).toUpperCase()}
                   </span>
                </div>

                {/* Job Content */}
                <div className="flex-grow space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                          <FaBuilding className="text-gray-400 text-sm"/> {job.companyName}
                        </p>
                    </div>
                    {/* Posted Date */}
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 whitespace-nowrap">
                       {timeAgo(job.postedAt)}
                    </span>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${getJobTypeColor(job.jobType)}`}>
                      <FaBriefcase /> {job.jobType}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-600 text-xs font-semibold flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400"/> {job.location}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-600 text-xs font-semibold flex items-center gap-1">
                      <FaMoneyBillWave className="text-green-500"/> ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-2 md:mt-0 flex items-center self-center">
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="px-6 py-3 rounded-lg font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                  >
                    View Details <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- Empty State ---
          <div className="text-center py-24 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-gray-400 text-3xl"/>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
            <p className="text-gray-500 mt-2">We couldn't find any jobs matching "{searchTerm}".</p>
            <button 
                onClick={() => setSearchTerm("")}
                className="mt-6 text-blue-600 font-semibold hover:underline"
            >
                Clear Search
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}