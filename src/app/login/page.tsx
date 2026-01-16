"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Optional: Use this if you want context updates

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Use Context if available, otherwise we use local logic below
  // const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call Java Backend
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid Email or Password");
      }

      // 2. Get User Data
      const userData = await response.json();

      // 3. Save & Redirect
      // If you are using the AuthContext we built earlier, use: login(userData);
      // Otherwise, keep this manual logic:
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast.success(`Welcome back, ${userData.fullName}!`);
      router.push("/profile"); 

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-blue-100">
      <Navbar />

      {/* --- Main Content with Gradient Background --- */}
      <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        
        {/* Background Decor (Blobs) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden border border-white/50 flex flex-col md:flex-row z-10 animate-fade-in-up">
          
          {/* Left Side: Visual/Branding */}
          <div className="md:w-1/2 bg-gradient-to-br from-slate-800 to-black p-10 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="z-10">
              <h2 className="text-3xl font-bold mb-2">JobPortal</h2>
              <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
            </div>

            <div className="z-10 my-10">
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Find your <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Dream Job
                </span> <br/>
                Today.
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect with thousands of top-tier companies and start your career journey with confidence.
              </p>
            </div>

            <div className="z-10 text-xs text-slate-500">
              © 2026 JobPortal Inc.
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back!</h2>
              <p className="text-sm text-slate-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all text-slate-700"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all text-slate-700"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-black hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 group"
              >
                {loading ? (
                    <span className="animate-pulse">Logging in...</span>
                ) : (
                    <>
                        <FaSignInAlt className="group-hover:translate-x-1 transition-transform" /> 
                        Sign In
                    </>
                )}
              </button>
            </form>

            <div className="mt-8 relative flex py-5 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase">New Here?</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="text-center">
                <Link 
                    href="/register" 
                    className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                    Create an Account <FaArrowRight size={12} />
                </Link>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}