"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import toast from "react-hot-toast";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaBuilding, FaPaperPlane, FaAlignLeft } from "react-icons/fa";

export default function PostJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "Full-Time",
    salaryMin: "",
    salaryMax: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in.");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobData,
          postedBy: user.id, // Link job to the logged-in recruiter
          salaryMin: Number(jobData.salaryMin),
          salaryMax: Number(jobData.salaryMax)
        }),
      });

      if (!response.ok) throw new Error("Failed to post job");

      toast.success("Job Posted Successfully!");
      router.push("/profile"); // Go back to dashboard

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100">
      <Navbar />

      <div className="flex-grow pt-24 pb-12 px-4 flex justify-center animate-fade-in-up">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          
          {/* --- Header with Mesh Gradient --- */}
          <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
            {/* Animated Glow Effects */}
            <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-50 animate-pulse"></div>
            <div className="absolute bottom-[-50%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-50 animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <FaPaperPlane className="text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
              </div>
              <p className="text-slate-400 pl-1">Create a listing to find your next star employee.</p>
            </div>
          </div>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            {/* Section 1: Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Job Title</label>
                <div className="relative group">
                    <FaBriefcase className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input name="title" required placeholder="e.g. Senior React Developer" onChange={handleChange} 
                      className="w-full pl-12 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-700" 
                    />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Company Name</label>
                <div className="relative group">
                    <FaBuilding className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input name="companyName" required placeholder="e.g. TechCorp Inc." onChange={handleChange} 
                      className="w-full pl-12 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-700" 
                    />
                </div>
              </div>
            </div>

            {/* Section 2: Logistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Location</label>
                <div className="relative group">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input name="location" required placeholder="e.g. Remote / New York" onChange={handleChange} 
                      className="w-full pl-12 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-700" 
                    />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Job Type</label>
                <div className="relative">
                  <select name="jobType" onChange={handleChange} className="w-full p-3.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-4 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
              </div>
            </div>

            {/* Section 3: Money */}
            <div>
                 <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Annual Salary Range</label>
                 <div className="flex gap-4 items-center">
                    <div className="relative flex-1 group">
                        <FaMoneyBillWave className="absolute left-4 top-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                        <input name="salaryMin" type="number" placeholder="Min (e.g. 50k)" onChange={handleChange} 
                          className="w-full pl-12 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-slate-700" 
                        />
                    </div>
                    <span className="text-slate-300 font-light text-2xl">/</span>
                    <div className="relative flex-1 group">
                        <FaMoneyBillWave className="absolute left-4 top-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                        <input name="salaryMax" type="number" placeholder="Max (e.g. 80k)" onChange={handleChange} 
                          className="w-full pl-12 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-slate-700" 
                        />
                    </div>
                 </div>
            </div>

            {/* Section 4: Description */}
            <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 ml-1">Job Description</label>
                <div className="relative group">
                    <FaAlignLeft className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <textarea 
                      name="description" 
                      required 
                      rows={6} 
                      placeholder="Describe the role, responsibilities, and requirements..." 
                      onChange={handleChange} 
                      className="w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 resize-none"
                    ></textarea>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transform hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
                {loading ? "Posting..." : <><FaPaperPlane /> Publish Job Listing</>}
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}