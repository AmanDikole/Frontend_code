"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaCheckCircle, FaExclamationTriangle, FaMagic } from "react-icons/fa";

export default function ATSChecker() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // --- MOCK ATS ALGORITHM ---
  const calculateScore = () => {
    if (!resumeText || !jobDescription) return alert("Please fill both fields");
    
    setLoading(true);

    setTimeout(() => {
      // 1. Clean and tokenize Job Description (JD)
      const jdWords = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
      const commonStopWords = ["and", "the", "to", "of", "in", "for", "with", "a", "an", "is", "are", "on"];
      
      // Filter out stop words and get unique keywords from JD
      const uniqueJDKeywords = [...new Set(jdWords.filter(w => !commonStopWords.includes(w) && w.length > 3))];

      // 2. Check which keywords exist in Resume
      const resumeLower = resumeText.toLowerCase();
      const matched = uniqueJDKeywords.filter(keyword => resumeLower.includes(keyword));
      const missing = uniqueJDKeywords.filter(keyword => !resumeLower.includes(keyword));

      // 3. Calculate Score
      const matchPercentage = Math.round((matched.length / uniqueJDKeywords.length) * 100);

      setScore(matchPercentage);
      setMissingKeywords(missing.slice(0, 10)); // Show top 10 missing
      setLoading(false);
    }, 1500); // Fake delay for effect
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-6 pt-32 pb-20">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">ATS Resume Scanner</h1>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                Paste your resume and the job description below. Our AI will analyze how well your resume matches the job and give you a score.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* --- INPUTS --- */}
            <div className="space-y-6">
                <div>
                    <label className="block font-bold text-gray-700 mb-2">1. Paste Resume Text</label>
                    <textarea 
                        className="w-full h-48 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Copy and paste your resume content here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-2">2. Paste Job Description</label>
                    <textarea 
                        className="w-full h-48 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Copy and paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>
                <button 
                    onClick={calculateScore}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2 text-lg transition-all"
                >
                    {loading ? "Scanning..." : <><FaMagic /> Scan Resume</>}
                </button>
            </div>

            {/* --- RESULTS --- */}
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                {score !== null ? (
                    <div className="w-full animate-fade-in-up">
                        <h2 className="text-xl font-bold text-gray-600 mb-6">Match Score</h2>
                        
                        {/* Score Circle */}
                        <div className={`relative w-40 h-40 mx-auto flex items-center justify-center rounded-full border-8 ${score > 70 ? 'border-green-500 text-green-600' : score > 40 ? 'border-yellow-500 text-yellow-600' : 'border-red-500 text-red-600'}`}>
                            <span className="text-5xl font-extrabold">{score}%</span>
                        </div>
                        
                        <p className="mt-6 font-medium text-lg">
                            {score > 70 ? "Great Match! You are ready to apply." : "Your resume needs optimization."}
                        </p>

                        {/* Missing Keywords */}
                        {missingKeywords.length > 0 && (
                            <div className="mt-8 bg-red-50 p-4 rounded-lg w-full text-left border border-red-100">
                                <h3 className="font-bold text-red-700 flex items-center gap-2 mb-3">
                                    <FaExclamationTriangle /> Missing Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {missingKeywords.map((word, i) => (
                                        <span key={i} className="bg-white border border-red-200 text-red-600 px-2 py-1 text-sm rounded-md shadow-sm">
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-gray-400">
                        <FaCheckCircle className="text-6xl mx-auto mb-4 opacity-20" />
                        <p>Results will appear here after scanning.</p>
                    </div>
                )}
            </div>

        </div>

      </div>
    </div>
  );
}