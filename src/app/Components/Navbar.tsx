"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth(); // Get User Role

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages where the navbar starts transparent (White text)
  const isTransparentPage = pathname === "/" || pathname === "/recruiter";
  
  // Logic to determine if text should be dark or white
  const isDarkText = !isTransparentPage || scrolled || isOpen;
  
  const textColor = isDarkText ? "text-gray-800" : "text-white";
  const hoverColor = isDarkText ? "hover:text-blue-600" : "hover:text-blue-300";
  const logoColor = isDarkText ? "text-gray-900" : "text-white";
  
  // Reusable Nav Link Component
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isDarkText
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          
          {/* 🔹 Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 ${
                !isDarkText ? "bg-white text-blue-600" : "bg-blue-600 text-white"
            }`}>
              J
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}>
              Job<span className="text-blue-500">Portal</span>
            </span>
          </Link>

          {/* 🔹 SMART DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <NavLink href="/">Home</NavLink>

            {/* 👇 CHECK USER ROLE HERE 👇 */}
            {user?.role === 'recruiter' ? (
                // 🏢 RECRUITER LINKS
                <>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/candidates">Find Candidates</NavLink>
                    <div className={`h-4 w-px mx-2 ${!isDarkText ? "bg-white/30" : "bg-gray-300"}`}></div>
                    <Link 
                        href="/post-job" 
                        className={`text-sm font-bold transition-colors ${textColor} ${hoverColor}`}
                    >
                        + Post a Job
                    </Link>
                </>
            ) : (
                // 👨‍💼 CANDIDATE / GUEST LINKS
                <>
                    <NavLink href="/jobs">Find Jobs</NavLink>
                    <NavLink href="/companies">Companies</NavLink>
                    
                    {/* NEW TOOLS */}
                    <NavLink href="/resume-builder">Resume Builder</NavLink>
                    <NavLink href="/ats-checker">ATS Check</NavLink>

                    <div className={`h-4 w-px mx-2 ${!isDarkText ? "bg-white/30" : "bg-gray-300"}`}></div>
                    <Link 
                        href="/recruiter" 
                        className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}
                    >
                        Recruiter
                    </Link>
                </>
            )}
          </div>

          {/* 🔹 Right Buttons (Login/Logout) */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              // Logged In
              <div className="flex items-center gap-4">
                 <div className={`text-right ${textColor}`}>
                    <p className="text-sm font-bold leading-none">{user.name}</p>
                    <p className="text-[10px] opacity-80 uppercase tracking-wider">{user.role}</p>
                 </div>
                 <button 
                    onClick={logout}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors"
                 >
                    Logout
                 </button>
              </div>
            ) : (
              // Guest
              <>
                <Link
                  href="/login"
                  className={`text-sm font-bold transition-colors ${textColor} ${hoverColor}`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-6 py-2.5 text-sm font-bold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                      !isDarkText 
                      ? "bg-white text-blue-600 hover:bg-gray-100" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* 🔹 Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5 relative">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link href="/" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
          
          {user?.role === 'recruiter' ? (
             <>
                <Link href="/dashboard" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link href="/candidates" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Find Candidates</Link>
                <Link href="/post-job" className="text-blue-600 font-bold hover:text-blue-800" onClick={() => setIsOpen(false)}>+ Post a Job</Link>
             </>
          ) : (
             <>
                <Link href="/jobs" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Find Jobs</Link>
                <Link href="/companies" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Companies</Link>
                {/* Mobile Tools Links */}
                <Link href="/resume-builder" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Resume Builder</Link>
                <Link href="/ats-checker" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>ATS Checker</Link>
                
                <Link href="/recruiter" className="text-gray-800 font-medium hover:text-blue-600" onClick={() => setIsOpen(false)}>Recruiter</Link>
             </>
          )}
          
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
             {user ? (
                <button onClick={logout} className="w-full py-3 text-center text-red-600 font-bold border border-red-200 rounded-xl hover:bg-red-50">
                    Logout ({user.name})
                </button>
             ) : (
                <>
                    <Link href="/login" className="w-full py-3 text-center text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                        Log In
                    </Link>
                    <Link href="/register" className="w-full py-3 text-center bg-blue-600 text-white font-bold rounded-xl shadow-md" onClick={() => setIsOpen(false)}>
                        Sign Up Free
                    </Link>
                </>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}