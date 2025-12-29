import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-500 mt-2">
            Have questions about posting a job or applying? We're here to help.
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* ===== Left: Contact Info (Dark/Blue Panel) ===== */}
          <div className="md:w-5/12 bg-blue-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400 rounded-full opacity-30 blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Fill up the form and our Team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Email</p>
                    <p className="font-medium">support@jobportal.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Address</p>
                    <p className="font-medium">123 IT Park, Hinjewadi Phase 1, Pune, Maharashtra.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="relative z-10 mt-12">
              <p className="text-sm text-blue-200 mb-4">Follow us:</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* ===== Right: Form Section ===== */}
          <div className="md:w-7/12 p-10 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Subject</label>
                <input
                  type="text"
                  placeholder="Job Inquiry / Support"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}