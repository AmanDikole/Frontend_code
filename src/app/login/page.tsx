"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"; // 👈 Import the Context Hook
import { FaUser, FaBuilding, FaGoogle, FaEnvelope, FaMobileAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth(); // 👈 Get the login function from Context
  
  // UI States
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Network Request delay
    setTimeout(() => {
      // 👈 Call the Global Login function
      // This will update the Navbar and redirect you automatically
      login(role); 
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left: Illustration / Branding */}
          <div className={`hidden md:flex flex-col justify-center items-center p-10 ${role === 'candidate' ? 'bg-blue-600' : 'bg-slate-900'} text-white transition-colors duration-500`}>
            <div className="mb-8">
               {/* Replace with your image */}
               <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {role === 'candidate' ? (
                    <FaUser size={80} className="text-white" />
                  ) : (
                    <FaBuilding size={80} className="text-white" />
                  )}
               </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {role === 'candidate' ? "Welcome Back!" : "Hire Top Talent"}
            </h2>
            <p className="text-center text-blue-100 max-w-xs">
              {role === 'candidate' 
                ? "Login to track your applications and find your dream job." 
                : "Login to manage job postings and screen candidates."}
            </p>
          </div>

          {/* Right: Login Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
            <p className="text-gray-500 mb-8 text-sm">Welcome back! Please enter your details.</p>

            {/* --- Role Toggle --- */}
            <div className="bg-gray-100 p-1 rounded-lg flex mb-6">
              <button
                onClick={() => setRole("candidate")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${
                  role === "candidate" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaUser /> Candidate
              </button>
              <button
                onClick={() => setRole("recruiter")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${
                  role === "recruiter" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaBuilding /> Recruiter
              </button>
            </div>

            {/* --- Method Toggle (Email/Mobile) --- */}
            <div className="flex gap-6 mb-6 border-b border-gray-200">
              <button
                onClick={() => setLoginMethod("email")}
                className={`pb-2 text-sm font-medium transition-colors ${
                  loginMethod === "email"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Email & Password
              </button>
              <button
                onClick={() => setLoginMethod("mobile")}
                className={`pb-2 text-sm font-medium transition-colors ${
                  loginMethod === "mobile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mobile & OTP
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {loginMethod === "email" ? (
                <>
                  {/* Email Input */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  {/* Password Input */}
                  <div className="relative">
                    <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="text-right">
                    <a href="#" className="text-xs text-blue-600 hover:underline">Forgot Password?</a>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Input */}
                  <div className="relative">
                    <FaMobileAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  {/* OTP Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="flex-1 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                    <button type="button" className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium">
                      Get OTP
                    </button>
                  </div>
                </>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition-all transform active:scale-95 ${
                    role === 'candidate' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'
                }`}
              >
                {loading ? "Signing in..." : role === "candidate" ? "Login as Candidate" : "Login as Recruiter"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 text-xs uppercase">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                Register Free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}