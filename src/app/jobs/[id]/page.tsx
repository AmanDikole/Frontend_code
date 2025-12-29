"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar"; 
import Footer from "../../Components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast"; // Ensure you have this installed
import { 
  FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, 
  FaClock, FaArrowLeft, FaCheckCircle, FaTimes 
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
  requirements: string;
  postedAt: string;
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  
  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // Fetch Job
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/jobs/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Job not found");
          return res.json();
        })
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  // --- Handle Form Submit ---
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    const toastId = toast.loading("Submitting application...");

    try {
      const applicationData = {
        jobId: id,
        applicantName,
        applicantEmail,
        coverLetter
      };

      const res = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData)
      });

      if (!res.ok) throw new Error("Failed to apply");

      toast.success("Application Sent!", { id: toastId });
      setIsModalOpen(false); // Close modal
      setApplicantName(""); // Reset form
      setApplicantEmail("");
      setCoverLetter("");

    } catch (error) {
      toast.error("Error submitting application", { id: toastId });
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!job) return <div className="p-20 text-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <Navbar />

      {/* --- Header --- */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/jobs" className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-3xl font-bold text-blue-600 border border-blue-100">
              {job.companyName.charAt(0)}
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium">
                <span className="flex items-center gap-2"><FaBuilding className="text-gray-400"/> {job.companyName}</span>
                <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400"/> {job.location}</span>
              </div>
            </div>
            
            {/* APPLY BUTTON - Opens Modal */}
            <div className="mt-4 md:mt-0">
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all text-lg"
               >
                 Apply Now
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Job Description (Same as before) --- */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
             <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
           </div>
        </div>
      </div>

      <Footer />

      {/* --- APPLY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="bg-blue-600 p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Apply for {job.title}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="john@example.com"
                  value={applicantEmail}
                  onChange={e => setApplicantEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Letter (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Why are you a good fit?"
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isApplying}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
                >
                  {isApplying ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}