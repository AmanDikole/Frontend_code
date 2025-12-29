"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { 
  FaBriefcase, 
  FaUsers, 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaPlus,
  FaEye
} from "react-icons/fa";
import Link from "next/link";

// --- MOCK DATA ---
const recruiterStats = [
  { label: "Active Jobs", value: 12, icon: <FaBriefcase />, color: "bg-blue-500" },
  { label: "Total Applicants", value: 48, icon: <FaUsers />, color: "bg-green-500" },
  { label: "Interviews Scheduled", value: 6, icon: <FaClock />, color: "bg-purple-500" },
];

const candidateStats = [
  { label: "Jobs Applied", value: 15, icon: <FaFileAlt />, color: "bg-blue-500" },
  { label: "Interviews", value: 2, icon: <FaUsers />, color: "bg-purple-500" },
  { label: "Profile Views", value: 24, icon: <FaEye />, color: "bg-orange-500" },
];

const recentJobsRecruiter = [
  { id: 1, title: "Senior React Developer", applicants: 12, status: "Active", posted: "2 days ago" },
  { id: 2, title: "UX Designer", applicants: 5, status: "Active", posted: "5 days ago" },
  { id: 3, title: "Marketing Intern", applicants: 31, status: "Closed", posted: "1 week ago" },
];

const applicationsCandidate = [
  { id: 1, company: "Google", role: "Frontend Engineer", date: "Aug 24, 2025", status: "In Review" },
  { id: 2, company: "Microsoft", role: "Product Designer", date: "Aug 20, 2025", status: "Interview" },
  { id: 3, company: "Netflix", role: "DevOps Engineer", date: "Aug 15, 2025", status: "Rejected" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Protect Route: Redirect if not logged in
  useEffect(() => {
    // Small delay to allow AuthContext to load from localStorage
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("user");
      if (!user && !storedUser) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-28 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here is what’s happening with your {user?.role === "recruiter" ? "hiring pipeline" : "job search"} today.
            </p>
          </div>
          {user?.role === "recruiter" && (
            <Link href="/post-job" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2">
              <FaPlus /> Post New Job
            </Link>
          )}
        </div>

        {/* --- Render View Based on Role --- */}
        {user?.role === "recruiter" ? <RecruiterDashboard /> : <CandidateDashboard />}
      </main>

      <Footer />
    </div>
  );
}

// ----------------------------------------------------------------------
// 🏢 RECRUITER VIEW COMPONENT
// ----------------------------------------------------------------------
function RecruiterDashboard() {
  return (
    <div className="space-y-8">
      
      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recruiterStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Recent Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Job Postings</h2>
          <Link href="/dashboard/jobs" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Posted</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentJobsRecruiter.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                         <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://randomuser.me/api/portraits/men/${i+10}.jpg`} />
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                         +{job.applicants - 3}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{job.posted}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// 👨‍💼 CANDIDATE VIEW COMPONENT
// ----------------------------------------------------------------------
function CandidateDashboard() {
  return (
    <div className="space-y-8">
      
      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidateStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applicationsCandidate.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{app.company}</td>
                  <td className="px-6 py-4 text-gray-600">{app.role}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                      ${app.status === 'In Review' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${app.status === 'Interview' ? 'bg-blue-100 text-blue-700' : ''}
                      ${app.status === 'Rejected' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {app.status === 'Interview' && <FaCheckCircle />}
                      {app.status === 'Rejected' && <FaTimesCircle />}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}