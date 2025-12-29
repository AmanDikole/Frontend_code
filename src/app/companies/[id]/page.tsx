"use client";

import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import StarRating from "../../Components/StarRating";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaThumbsUp, 
  FaUserCircle, 
  FaBriefcase 
} from "react-icons/fa";

// --- Mock Data for Detail Page ---
const companyData = {
  1: {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    rating: 4.5,
    reviews: 1240,
    recommend: 90,
    ceoApproval: 95,
    desc: "Google is an American multinational technology company specializing in Internet-related services and products.",
    userReviews: [
      {
        id: 1,
        title: "Great place to work!",
        rating: 5,
        role: "Senior Engineer",
        date: "2 weeks ago",
        pros: "Amazing free food, smart colleagues, great benefits.",
        cons: "Work-life balance can be tricky sometimes.",
        helpful: 12
      },
      {
        id: 2,
        title: "Good but competitive",
        rating: 4,
        role: "Product Manager",
        date: "1 month ago",
        pros: "You learn a lot very quickly. High impact work.",
        cons: "Very competitive environment, promotion process is slow.",
        helpful: 5
      }
    ]
  },
  // In a real app, you would fetch based on ID. 
  // For now, we fallback to Google data for any ID to prevent crashes.
};

export default function CompanyReviewPage() {
  const params = useParams();
  const id = Number(params.id);
  
  // Use data for ID 1 (Google) as fallback for demo purposes
  const company = companyData[1]; 

  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* --- Header --- */}
      <div className="relative h-64 bg-slate-900">
        <div className="absolute -bottom-10 left-6 md:left-20 flex items-end gap-6">
          <div className="w-32 h-32 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
          </div>
          <div className="mb-4">
             <h1 className="text-3xl md:text-4xl font-bold text-white">{company.name}</h1>
             <div className="flex items-center gap-2 text-white/80 mt-1">
               <StarRating rating={company.rating} />
               <span className="font-bold">{company.rating}</span>
               <span>• {company.reviews} Reviews</span>
             </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 font-medium transition-colors ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Reviews
          </button>
          <button 
             onClick={() => setActiveTab("jobs")}
             className={`pb-4 font-medium transition-colors ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Jobs
          </button>
          <button 
             onClick={() => setActiveTab("salaries")}
             className={`pb-4 font-medium transition-colors ${activeTab === 'salaries' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Salaries
          </button>
        </div>

        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Left: Stats */}
            <div className="col-span-1 space-y-6">
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{company.rating}</div>
                  <StarRating rating={company.rating} />
                  <p className="text-sm text-gray-500 mt-2">Overall Rating</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                    <div className="text-xl font-bold text-green-600">{company.recommend}%</div>
                    <div className="text-xs text-gray-600 mt-1">Recommend to a Friend</div>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                    <div className="text-xl font-bold text-blue-600">{company.ceoApproval}%</div>
                    <div className="text-xs text-gray-600 mt-1">Approve of CEO</div>
                 </div>
               </div>

               <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
                 Write a Review
               </button>
            </div>

            {/* Right: Review List */}
            <div className="col-span-1 md:col-span-2 space-y-6">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Employee Reviews</h3>
               
               {company.userReviews.map((review) => (
                 <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h4 className="font-bold text-lg text-gray-800">"{review.title}"</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <StarRating rating={review.rating} />
                             <span className="text-sm text-gray-500">| {review.role}</span>
                          </div>
                       </div>
                       <span className="text-xs text-gray-400">{review.date}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                       <div className="flex gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-600"><span className="font-bold">Pros:</span> {review.pros}</p>
                       </div>
                       <div className="flex gap-2">
                          <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-600"><span className="font-bold">Cons:</span> {review.cons}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                       <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
                          <FaThumbsUp /> Helpful ({review.helpful})
                       </button>
                       <button className="text-sm text-gray-500 hover:text-blue-600 transition">
                          Share
                       </button>
                    </div>
                 </div>
               ))}
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}