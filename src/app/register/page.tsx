"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient"; // Used @ alias for safety
import toast from "react-hot-toast"; 
import { FaUser, FaBuilding, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  
  // UI States
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validate Passwords
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match!");
    }

    try {
      // 2. Sign Up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            role: role, // Save if they are a Candidate or Recruiter
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;

      toast.success("Account created! Check your email to confirm.");
      router.push("/login");

    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <div className="flex flex-1 items-center justify-center px-4 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Left Panel: Branding & Info */}
          <div className={`hidden md:flex flex-col justify-center items-center p-10 ${role === 'candidate' ? 'bg-gradient-to-br from-green-600 to-emerald-700' : 'bg-gradient-to-br from-slate-800 to-slate-900'} text-white transition-all duration-500`}>
            <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
               <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                  {role === 'candidate' ? (
                    <FaUser size={80} className="text-white drop-shadow-lg" />
                  ) : (
                    <FaBuilding size={80} className="text-white drop-shadow-lg" />
                  )}
               </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 animate-fadeIn">
              {role === 'candidate' ? "Join as a Candidate" : "Join as a Recruiter"}
            </h2>
            <p className="text-center text-white/80 max-w-xs text-lg">
              {role === 'candidate' 
                ? "Create an account to browse thousands of jobs and get hired fast." 
                : "Create an account to post jobs and find the perfect talent."}
            </p>
          </div>

          {/* Right Panel: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-8 text-sm">It only takes a couple of minutes to get started.</p>

            {/* Role Selector */}
            <div className="bg-gray-100 p-1 rounded-lg flex mb-6">
              <button 
                onClick={() => setRole("candidate")} 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${role === "candidate" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <FaUser /> Candidate
              </button>
              <button 
                onClick={() => setRole("recruiter")} 
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${role === "recruiter" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <FaBuilding /> Recruiter
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  suppressHydrationWarning
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  suppressHydrationWarning
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
              
              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  suppressHydrationWarning
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  suppressHydrationWarning
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition-all transform active:scale-95 mt-4 ${
                      role === 'candidate' ? 'bg-green-600 hover:bg-green-700 shadow-green-500/30' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-500/30'
                  }`}
              >
                  {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}