"use client";

import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import { FaCheck, FaUserTie, FaRocket, FaHandshake, FaChartLine } from "react-icons/fa";

export default function RecruiterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-10 rounded-l-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Left: Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
              For Recruiters & Companies
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Hire the Top <span className="text-blue-500">1% Talent</span> <br /> In Record Time
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
              Post jobs, screen candidates with AI, and schedule interviews all in one dashboard. Join 5,000+ companies hiring today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-1">
                Post a Job for Free
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 backdrop-blur-sm transition-all">
                Request Demo
              </button>
            </div>
          </div>

          {/* Right: Dashboard Preview (Visual) */}
          <div className="flex-1 w-full relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* Mock Dashboard UI */}
               <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">JD</div>
                    <div>
                        <div className="font-bold text-sm">Senior Developer</div>
                        <div className="text-xs text-gray-400">Posted 2h ago</div>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1 rounded-full">Active</span>
               </div>
               
               <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                          <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full" alt="Candidate" />
                          <div className="text-sm">Sarah Jenkins</div>
                      </div>
                      <span className="text-xs bg-blue-600 px-2 py-1 rounded">98% Match</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                          <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full" alt="Candidate" />
                          <div className="text-sm">David Chen</div>
                      </div>
                      <span className="text-xs bg-blue-600 px-2 py-1 rounded">92% Match</span>
                  </div>
               </div>

               <div className="mt-6 pt-4 border-t border-white/10 text-center text-sm text-gray-400">
                  View 12 more candidates...
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <div className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white divide-x divide-blue-500/50">
          <div>
            <div className="text-3xl font-bold">10M+</div>
            <div className="text-blue-200 text-sm mt-1">Active Candidates</div>
          </div>
          <div>
            <div className="text-3xl font-bold">85%</div>
            <div className="text-blue-200 text-sm mt-1">Hiring Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24h</div>
            <div className="text-blue-200 text-sm mt-1">Avg. Time to Shortlist</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5000+</div>
            <div className="text-blue-200 text-sm mt-1">Trusted Companies</div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Recruiters Love Us</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our platform is built to save you time. We filter the noise so you can focus on interviewing the best candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FaRocket />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Hiring</h3>
              <p className="text-gray-500 leading-relaxed">
                Our algorithm promotes your job to relevant candidates immediately. Most companies get their first application in 30 minutes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Screening</h3>
              <p className="text-gray-500 leading-relaxed">
                Don't read 100 resumes. Our AI scores every applicant based on your requirements and highlights the top 10%.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Profiles</h3>
              <p className="text-gray-500 leading-relaxed">
                We verify candidate skills via tests and previous employment history so you can hire with total confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 mt-4">Start for free, upgrade as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Plan 1: Starter */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-600">Starter</h3>
              <div className="my-4">
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">Perfect for startups hiring their first employee.</p>
              <button className="w-full py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Get Started
              </button>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> 1 Active Job Post</p>
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> 10 Candidate Unlocks</p>
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> Basic Dashboard</p>
              </div>
            </div>

            {/* Plan 2: Pro (Featured) */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-2xl transform scale-105 relative border border-slate-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-blue-300">Growth</h3>
              <div className="my-4">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">For growing teams hiring regularly.</p>
              <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/50">
                Start Free Trial
              </button>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-sm text-gray-300"><FaCheck className="text-blue-500" /> 5 Active Job Posts</p>
                <p className="flex items-center gap-3 text-sm text-gray-300"><FaCheck className="text-blue-500" /> Unlimited Candidate Views</p>
                <p className="flex items-center gap-3 text-sm text-gray-300"><FaCheck className="text-blue-500" /> AI Candidate Scoring</p>
                <p className="flex items-center gap-3 text-sm text-gray-300"><FaCheck className="text-blue-500" /> Featured Job Badge</p>
              </div>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-semibold text-gray-600">Enterprise</h3>
              <div className="my-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">For agencies and large corporations.</p>
              <button className="w-full py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Contact Sales
              </button>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> Unlimited Job Posts</p>
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> Dedicated Account Manager</p>
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> ATS Integration</p>
                <p className="flex items-center gap-3 text-sm text-gray-600"><FaCheck className="text-green-500" /> Company Branding</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to hire your next star employee?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join 5,000+ companies building their teams on JobPortal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-job" className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
              Post a Job Now
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}