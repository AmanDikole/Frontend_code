import React from "react";
import Link from "next/link";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter,
  FaPaperPlane
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* -------- Column 1: Brand & Contact -------- */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Job<span className="text-blue-500">Portal</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bridging the gap between talent and opportunity. Find your dream job or the perfect candidate today.
            </p>
            
            <div className="pt-4 space-y-2">
              <p className="flex items-center gap-3 text-sm group cursor-pointer hover:text-white transition">
                <span className="p-2 bg-gray-800 rounded-full group-hover:bg-blue-600 transition">
                   <FaPhoneAlt size={12} />
                </span> 
                +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-3 text-sm group cursor-pointer hover:text-white transition">
                <span className="p-2 bg-gray-800 rounded-full group-hover:bg-blue-600 transition">
                   <FaEnvelope size={12} />
                </span>
                support@jobportal.com
              </p>
            </div>
          </div>

          {/* -------- Column 2: Quick Links (Candidates) -------- */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">For Candidates</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/jobs" className="hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Candidate Dashboard</Link></li>
              <li><Link href="/resume-tips" className="hover:text-blue-400 transition-colors">Resume Tips</Link></li>
              <li><Link href="/jobs?type=remote" className="hover:text-blue-400 transition-colors">Remote Jobs</Link></li>
            </ul>
          </div>

          {/* -------- Column 3: Quick Links (Recruiters) -------- */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">For Recruiters</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/post-job" className="hover:text-blue-400 transition-colors">Post a Job</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/search-resumes" className="hover:text-blue-400 transition-colors">Search Resumes</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Partner Support</Link></li>
            </ul>
          </div>

          {/* -------- Column 4: Newsletter -------- */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Job Alerts</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest jobs delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-700"
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* -------- Bottom Section: Divider & Copyright -------- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} JobPortal Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          
          {/* Legal Links */}
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}