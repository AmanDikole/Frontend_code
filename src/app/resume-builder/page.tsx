"use client";

import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaDownload, FaPlus, FaTrash, FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function ResumeBuilder() {
  // --- STATE ---
  const [resume, setResume] = useState({
    fullName: "John Doe",
    role: "Software Engineer",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    summary: "Passionate developer with 5 years of experience building scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    experience: [
      { id: 1, role: "Senior Developer", company: "Tech Corp", year: "2021 - Present", desc: "Led a team of 5 developers. Architected the main SaaS platform using Next.js." }
    ],
    education: [
      { id: 1, degree: "B.S. Computer Science", school: "University of Tech", year: "2017 - 2021" }
    ]
  });

  // --- HANDLERS ---

  // 1. Simple Text Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  // 2. Skills Array
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume({ ...resume, skills: e.target.value.split(",") });
  };

  // 3. Experience Handlers
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newExp = [...resume.experience];
    // @ts-ignore
    newExp[index][e.target.name] = e.target.value;
    setResume({ ...resume, experience: newExp });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { id: Date.now(), role: "Job Title", company: "Company Name", year: "Year", desc: "Description of responsibilities..." }]
    });
  };

  const removeExperience = (index: number) => {
    const newExp = resume.experience.filter((_, i) => i !== index);
    setResume({ ...resume, experience: newExp });
  };

  // 4. Education Handlers
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEdu = [...resume.education];
    // @ts-ignore
    newEdu[index][e.target.name] = e.target.value;
    setResume({ ...resume, education: newEdu });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { id: Date.now(), degree: "Degree", school: "School / University", year: "Year" }]
    });
  };

  const removeEducation = (index: number) => {
    const newEdu = resume.education.filter((_, i) => i !== index);
    setResume({ ...resume, education: newEdu });
  };

  // 5. Print Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hide Navbar during print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* === LEFT: EDITOR FORM (Hidden when printing) === */}
        <div className="bg-white p-8 rounded-xl shadow-lg h-fit print:hidden">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>
             <button 
                onClick={handlePrint}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
            >
                <FaDownload /> Print PDF
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
                <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input name="fullName" value={resume.fullName} onChange={handleChange} className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none" placeholder="Full Name" />
                    <input name="role" value={resume.role} onChange={handleChange} className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none" placeholder="Job Title" />
                    <input name="email" value={resume.email} onChange={handleChange} className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none" placeholder="Email" />
                    <input name="phone" value={resume.phone} onChange={handleChange} className="border p-2 rounded focus:ring-2 ring-blue-500 outline-none" placeholder="Phone" />
                </div>
                <input name="location" value={resume.location} onChange={handleChange} className="border p-2 rounded w-full mt-4 focus:ring-2 ring-blue-500 outline-none" placeholder="Location" />
            </div>
            
            {/* Summary */}
            <div>
                <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">Summary</h3>
                <textarea name="summary" value={resume.summary} onChange={handleChange} className="border p-2 rounded w-full h-24 focus:ring-2 ring-blue-500 outline-none" placeholder="Professional Summary" />
            </div>

            {/* Skills */}
            <div>
                <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">Skills (Comma separated)</h3>
                <input value={resume.skills.join(",")} onChange={handleSkillChange} className="border p-2 rounded w-full focus:ring-2 ring-blue-500 outline-none" placeholder="React, Node.js, etc." />
            </div>

            {/* Experience Section */}
            <div>
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2"><FaBriefcase/> Experience</h3>
                    <button onClick={addExperience} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><FaPlus/> Add</button>
                </div>
                {resume.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-gray-50 p-4 rounded-lg mb-4 relative group">
                        <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><FaTrash size={12}/></button>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <input name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} className="border p-2 rounded text-sm" placeholder="Role" />
                            <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="border p-2 rounded text-sm" placeholder="Company" />
                            <input name="year" value={exp.year} onChange={(e) => handleExperienceChange(index, e)} className="border p-2 rounded text-sm col-span-2" placeholder="Year" />
                        </div>
                        <textarea name="desc" value={exp.desc} onChange={(e) => handleExperienceChange(index, e)} className="border p-2 rounded w-full text-sm h-16" placeholder="Job Description" />
                    </div>
                ))}
            </div>

            {/* Education Section */}
            <div>
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2"><FaGraduationCap/> Education</h3>
                    <button onClick={addEducation} className="text-blue-600 text-sm flex items-center gap-1 hover:underline"><FaPlus/> Add</button>
                </div>
                {resume.education.map((edu, index) => (
                    <div key={edu.id} className="bg-gray-50 p-4 rounded-lg mb-4 relative group">
                        <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><FaTrash size={12}/></button>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className="border p-2 rounded text-sm" placeholder="Degree" />
                            <input name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} className="border p-2 rounded text-sm" placeholder="School" />
                            <input name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} className="border p-2 rounded text-sm col-span-2" placeholder="Year" />
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>

        {/* === RIGHT: LIVE PREVIEW (A4 Paper Style) === */}
        {/* 'print:w-full' ensures it takes full width when printing */}
        <div className="flex justify-center print:block print:w-full print:absolute print:top-0 print:left-0">
            <div 
                className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[20mm] text-gray-800 print:shadow-none print:w-full"
                style={{ fontFamily: 'Arial, sans-serif' }}
            >
                {/* Header */}
                <header className="border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-wider">{resume.fullName}</h1>
                    <p className="text-xl text-gray-600 mt-1">{resume.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm mt-3 text-gray-500">
                        <span>{resume.email}</span> • <span>{resume.phone}</span> • <span>{resume.location}</span>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-blue-800">Summary</h3>
                    <p className="text-sm leading-relaxed">{resume.summary}</p>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-blue-800">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, i) => (
                            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-bold rounded-md border border-gray-200">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-blue-800">Experience</h3>
                    {resume.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-gray-900">{exp.role}</h4>
                                <span className="text-xs text-gray-500 font-medium">{exp.year}</span>
                            </div>
                            <p className="text-sm italic text-gray-700 mb-1">{exp.company}</p>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section>
                    <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-blue-800">Education</h3>
                    {resume.education.map((edu) => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                <span className="text-xs text-gray-500 font-medium">{edu.year}</span>
                            </div>
                            <p className="text-sm text-gray-600">{edu.school}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>

      </div>

      {/* Hide Footer during print */}
      <div className="print:hidden">
        <Footer />
      </div>

    </div>
  );
}