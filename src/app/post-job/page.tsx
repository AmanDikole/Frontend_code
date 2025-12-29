"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form"; 
import toast from "react-hot-toast"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { supabase } from "@/supabaseClient"; // Import Supabase Client
import * as z from "zod"; 
import { 
  FaBriefcase, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaClock, 
  FaListUl, 
  FaCheck
} from "react-icons/fa";

// --- 1. DEFINE VALIDATION SCHEMA (ZOD) ---
const jobSchema = z.object({
  title: z.string().min(3, "Job title is too short").max(100),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(["Full Time", "Part Time", "Contract", "Internship"]),
  // ✅ FIX: Use z.coerce.number() to handle string-to-number conversion safely
  salaryMin: z.coerce.number().min(1, "Salary must be a positive number"),
  salaryMax: z.coerce.number().min(1, "Salary must be a positive number"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.string().min(10, "Please list at least a few requirements"),
});

// Infer TypeScript type
type JobFormData = z.infer<typeof jobSchema>;

export default function PostJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 2. SETUP FORM HOOK ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobType: "Full Time",
      salaryMin: undefined, 
      salaryMax: undefined
    },
  });

  // --- 3. HANDLE SUBMISSION TO SPRING BOOT ---
  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    // 1. Check if user is logged in
    if (!user) {
        toast.error("You must be logged in to post a job.");
        return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Posting job...");

    try {
      // 2. Get the current session token (JWT)
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      // 3. Send request to Java Backend with Authorization Header
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 👈 SEND TOKEN TO JAVA
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle 401 Unauthorized specifically
        if (response.status === 401) {
             throw new Error("Unauthorized! Your session may have expired.");
        }
        throw new Error("Failed to post job to backend");
      }

      // 4. Success!
      toast.success("Job posted successfully!", { id: toastId });
      router.push("/dashboard"); // Or /jobs

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error connecting to server", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-500 mt-2">
            Find the best talent. Listings are saved to your Enterprise Database.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Section 1: Basic Info */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaBriefcase className="text-blue-600" /> Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Job Title */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input 
                  {...register("title")} 
                  placeholder="e.g. Senior Java Developer"
                  className={`w-full border rounded-lg p-3 outline-none focus:ring-2 transition-all ${errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3.5 text-gray-400" />
                  <input 
                    {...register("companyName")}
                    placeholder="Company Name"
                    className={`w-full border rounded-lg p-3 pl-10 outline-none focus:ring-2 ${errors.companyName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                  />
                </div>
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                  <input 
                    {...register("location")}
                    placeholder="e.g. New York, NY"
                    className={`w-full border rounded-lg p-3 pl-10 outline-none focus:ring-2 ${errors.location ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-3.5 text-gray-400" />
                  <select 
                    {...register("jobType")}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range (Annual $)</label>
                <div className="flex gap-2">
                    <div className="w-full">
                        <input 
                            {...register("salaryMin")}
                            placeholder="Min" 
                            type="number" // ✅ Ensure this is type="number"
                            className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errors.salaryMin ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                         {errors.salaryMin && <p className="text-red-500 text-xs mt-1">{errors.salaryMin.message}</p>}
                    </div>
                    <div className="w-full">
                        <input 
                            {...register("salaryMax")}
                            placeholder="Max" 
                            type="number" // ✅ Ensure this is type="number"
                            className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errors.salaryMax ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                        />
                         {errors.salaryMax && <p className="text-red-500 text-xs mt-1">{errors.salaryMax.message}</p>}
                    </div>
                </div>
              </div>

            </div>
          </div>

          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaListUl className="text-blue-600" /> Job Details
            </h2>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
                <textarea 
                    {...register("description")}
                    rows={6}
                    placeholder="Describe the role..."
                    className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errors.description ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                <textarea 
                    {...register("requirements")}
                    rows={3}
                    placeholder="e.g. Java, Spring Boot, SQL"
                    className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errors.requirements ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
                />
                {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Posting..." : <><FaCheck /> Post Job Now</>}
                </button>
            </div>

          </div>
        </form>

      </div>

      <Footer />
    </div>
  );
}