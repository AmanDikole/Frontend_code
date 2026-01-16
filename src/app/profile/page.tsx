"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaUserTie, FaBuilding, FaBriefcase, FaSignOutAlt, FaPlusCircle, FaFileAlt } from "react-icons/fa";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // 1. Protect the Route
  // If no user is found after a short delay, redirect to login
  useEffect(() => {
    // We wait a tiny bit to allow localstorage to load in AuthContext
    const timer = setTimeout(() => {
        if (!user) {
            router.push("/login");
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [user, router]);

  // Prevent hydration errors or flashing if user isn't loaded yet
  if (!user) return null; 

  const isRecruiter = user.role === "recruiter";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* --- Header Section --- */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-6 z-10">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl text-white shadow-lg ${isRecruiter ? 'bg-slate-900' : 'bg-green-600'}`}>
                {isRecruiter ? <FaBuilding /> : <FaUserTie />}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Hello, {user.fullName}
                </h1>
                <p className="text-slate-500 capitalize flex items-center gap-2 mt-1">
                  {isRecruiter ? "Recruiter Account" : "Candidate Account"} • <span className="text-blue-600">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 z-10">
               <button 
                onClick={logout}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2"
               >
                 <FaSignOutAlt /> Logout
               </button>
            </div>
          </div>

          {/* --- Stats Grid (Mock Data for now) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {isRecruiter ? (
                <>
                    <StatCard label="Active Jobs" value="12" color="blue" icon={<FaBriefcase />} />
                    <StatCard label="Total Applicants" value="48" color="purple" icon={<FaUserTie />} />
                    <StatCard label="Interviews Scheduled" value="5" color="emerald" icon={<FaFileAlt />} />
                </>
             ) : (
                <>
                    <StatCard label="Jobs Applied" value="8" color="blue" icon={<FaBriefcase />} />
                    <StatCard label="Profile Views" value="24" color="purple" icon={<FaUserTie />} />
                    <StatCard label="Resume Downloads" value="3" color="emerald" icon={<FaFileAlt />} />
                </>
             )}
          </div>

          {/* --- Action Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Action Panel */}
            <div className="md:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    {isRecruiter ? "Recruitment Actions" : "Suggested Jobs"}
                </h2>
                
                {isRecruiter ? (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                            <FaPlusCircle />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Post a New Job Opportunity</h3>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">Create a detailed job listing to attract the best talent for your company.</p>
                        <Link href="/post-job" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                            Create Job Listing
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Mock Job List for Candidate */}
                        {[1, 2, 3].map((i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-100 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm">🚀</div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Frontend Developer</h4>
                                        <p className="text-sm text-slate-500">TechCorp Inc. • Remote</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 font-bold text-sm hover:underline">View Details</button>
                             </div>
                        ))}
                        <Link href="/jobs" className="block text-center text-blue-600 font-bold mt-4 hover:underline">
                            Browse All Jobs
                        </Link>
                    </div>
                )}
            </div>

            {/* Side Panel */}
            <div className="bg-gradient-to-br from-slate-800 to-black text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-4">
                        {isRecruiter ? "Upgrade to Premium" : "Complete Profile"}
                    </h2>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        {isRecruiter 
                            ? "Get access to verified candidates and featured job listings." 
                            : "Upload your resume and complete your skills to rank higher."}
                    </p>
                    <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white py-3 rounded-xl font-bold transition-all">
                        {isRecruiter ? "View Plans" : "Edit Profile"}
                    </button>
                </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

// Simple Sub-component for Stats
function StatCard({ label, value, color, icon }: any) {
    const colorClasses: any = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        emerald: "bg-emerald-50 text-emerald-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
            </div>
        </div>
    )
}