import React from "react";
import Link from "next/link"; 

export default function Hero() {
  return (
    <section
      // 1. Changed min-h-[85vh] to min-h-screen (Full height)
      // 2. Added pt-32 (Padding Top) so content starts BELOW the navbar
      className="relative text-white min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-12 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpeg')" }} 
    >
      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* 🔹 Animated Background Effects */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute w-[150%] h-[150%] -left-1/4 -top-1/4 animate-wave bg-[radial-gradient(circle,rgba(0,229,255,0.2)_0%,transparent_60%)]" />
        <div className="absolute w-[150%] h-[150%] -right-1/4 -bottom-1/4 animate-wave-slow bg-[radial-gradient(circle,rgba(255,0,150,0.2)_0%,transparent_60%)]" />
      </div>

      {/* 🔹 Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          Find Your{" "}
          <span className="relative inline-block mx-2">
            {/* Staggered Background Layers for "DREAM" */}
            <span className="absolute inset-0 -rotate-2 bg-green-500 rounded-lg -z-10 shadow-lg" />
            <span className="absolute inset-0 rotate-2 bg-blue-600 rounded-lg -z-20 shadow-lg animate-pulse" />
            <span className="relative block px-4 py-1 z-10">DREAM</span>
          </span>{" "}
          <br className="hidden md:block" />
          Job With Your Interest
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Connect with 2k+ daily active users and start your career journey today.
        </p>

        {/* 🔹 Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/jobs" 
              className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all transform"
            >
              Browse Jobs
            </Link>
            <Link 
              href="/register" 
              className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md font-bold text-lg rounded-full shadow-lg hover:bg-white hover:text-blue-900 hover:scale-105 transition-all transform"
            >
              Upload Resume
            </Link>
        </div>

        {/* 🔹 Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center animate-fade-in-up">
            <span className="text-3xl font-bold text-white">10k+</span>
            <span className="text-sm text-gray-300 uppercase tracking-wide">Students</span>
          </div>
          <div className="flex flex-col items-center animate-fade-in-up delay-100">
            <span className="text-3xl font-bold text-white">500+</span>
            <span className="text-sm text-gray-300 uppercase tracking-wide">Recruiters</span>
          </div>
          <div className="flex flex-col items-center animate-fade-in-up delay-200">
            <span className="text-3xl font-bold text-white">AI</span>
            <span className="text-sm text-gray-300 uppercase tracking-wide">Powered Matching</span>
          </div>
        </div>
      </div>
    </section>
  );
}