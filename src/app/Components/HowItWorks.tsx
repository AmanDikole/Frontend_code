import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserPlus, FaSearch, FaPaperPlane, FaGooglePlay, FaApple } from "react-icons/fa";
import ContactUs from "./ContactUs";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Account",
      desc: "Sign up specifically as a Job Seeker or a Recruiter to get started.",
      icon: <FaUserPlus className="text-white text-2xl" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-200",
    },
    {
      id: 2,
      title: "Search & Connect",
      desc: "Browse through thousands of tailored jobs or filtered candidates.",
      icon: <FaSearch className="text-white text-2xl" />,
      color: "bg-teal-500",
      shadow: "shadow-teal-200",
    },
    {
      id: 3,
      title: "Apply or Hire",
      desc: "One-click applications for seekers; Instant interviews for recruiters.",
      icon: <FaPaperPlane className="text-white text-2xl" />,
      color: "bg-indigo-500",
      shadow: "shadow-indigo-200",
    },
  ];

  return (
    <>
      {/* ---------- How It Works Section ---------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How It Works?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've simplified the hiring process. Get from <span className="text-blue-600 font-bold">point A</span> to <span className="text-indigo-600 font-bold">point B</span> in three simple steps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* 🔹 The Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 border-t-4 border-dashed border-gray-200 -z-10" />

            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                
                {/* Icon Circle */}
                <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-xl ${step.shadow} transform group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {step.icon}
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm">
                    {step.id}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed px-4">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Call to Action / App Download ---------- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center relative">
            
            {/* Left Content */}
            <div className="p-10 md:p-16 w-full md:w-1/2 text-center md:text-left z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Get the JobPortal App
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Search jobs on the go, chat with recruiters, and get real-time notifications. Available on iOS and Android.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition shadow-lg">
                  <FaApple size={24} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider">Download on the</div>
                    <div className="text-sm font-bold leading-none">App Store</div>
                  </div>
                </button>
                
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition shadow-lg">
                  <FaGooglePlay size={22} />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider">Get it on</div>
                    <div className="text-sm font-bold leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Image / Mockup */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
              
              {/* Replace this with your actual phone image if you have one */}
               <div className="relative z-10 w-[300px] h-[300px] md:h-[400px] flex items-center justify-center">
                  {/* Placeholder for Phone Image */}
                   <Image 
                    src="/qr.png" // Using your QR png as placeholder, ideally use a phone mockup here
                    alt="Mobile App"
                    width={250}
                    height={250}
                    className="object-contain drop-shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
                   />
               </div>
            </div>

          </div>
        </div>
      </section>

     
    </>
  );
}