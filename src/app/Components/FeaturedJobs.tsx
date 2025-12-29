import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaBookmark } from "react-icons/fa";

// Dummy Data (Replace with API data later)
const jobs = [
  {
    id: 1,
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    title: "Senior UX Designer",
    location: "Mountain View, CA",
    type: "Full Time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    tags: ["Remote", "Design"],
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    title: "Full Stack Developer",
    location: "Redmond, WA",
    type: "Part Time",
    salary: "$90k - $110k",
    posted: "5 hours ago",
    tags: ["Hybrid", "React"],
  },
  {
    id: 3,
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    title: "Marketing Manager",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $100k",
    posted: "1 day ago",
    tags: ["Marketing", "Sales"],
  },
  {
    id: 4,
    company: "Netflix",
    logo: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png", // Simplified logo URL
    title: "DevOps Engineer",
    location: "Los Gatos, CA",
    type: "Full Time",
    salary: "$140k - $180k",
    posted: "3 days ago",
    tags: ["AWS", "Python"],
  },
  {
    id: 5,
    company: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
    title: "Product Manager",
    location: "Stockholm, Sweden",
    type: "Full Time",
    salary: "$110k - $135k",
    posted: "1 week ago",
    tags: ["Agile", "Music"],
  },
  {
    id: 6,
    company: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
    title: "Customer Success Lead",
    location: "Remote",
    type: "Remote",
    salary: "$70k - $90k",
    posted: "Just now",
    tags: ["Support", "English"],
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Featured Jobs
            </h2>
            <p className="text-gray-500 mt-2">
              Know your worth and find the job that qualify your life.
            </p>
          </div>
          <Link 
            href="/jobs"
            className="hidden md:inline-block text-blue-600 font-semibold hover:text-blue-700 hover:underline"
          >
            View All Jobs &rarr;
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col group relative"
            >
                {/* Bookmark Icon */}
                <button className="absolute top-6 right-6 text-gray-300 hover:text-blue-500 transition-colors">
                    <FaBookmark size={18} />
                </button>

                {/* Company Info */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                        {/* Using standard img tag for external URLs in demo, or use Next Image with config */}
                        <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                        {job.type}
                    </span>
                    {job.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Details (Location, Salary) */}
                <div className="mt-auto space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center text-gray-500 text-sm">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <FaMoneyBillWave className="mr-2 text-gray-400" />
                        {job.salary}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                        <FaClock className="mr-2" />
                        {job.posted}
                    </div>
                </div>

                {/* Apply Button */}
                <button className="w-full mt-6 bg-white border border-blue-600 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Apply Now
                </button>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
            <Link 
                href="/jobs"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
                View All Jobs
            </Link>
        </div>
      </div>
    </section>
  );
}