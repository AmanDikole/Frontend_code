import React from "react";
import Link from "next/link";
import {
  FaCode,
  FaPaintBrush,
  FaRobot,
  FaShoppingBag,
  FaPenNib,
  FaUserTie,
  FaUniversity,
  FaLock,
  FaChalkboardTeacher,
  FaUtensils,
  FaHandsHelping,
  FaCar,
  FaHome,
  FaUserShield,
  FaTags, // Changed from FaMale
} from "react-icons/fa";

// Added a 'slug' to help with URL navigation
const categories = [
  { icon: <FaCode size={24} />, title: "Development & IT", slug: "development" },
  { icon: <FaPaintBrush size={24} />, title: "Design & Creative", slug: "design" },
  { icon: <FaRobot size={24} />, title: "AI Services", slug: "ai" },
  { icon: <FaShoppingBag size={24} />, title: "Sales & Marketing", slug: "marketing" },
  { icon: <FaPenNib size={24} />, title: "Writing", slug: "writing" }, // Shortened title
  { icon: <FaUserTie size={24} />, title: "Admin & Support", slug: "admin" },
  { icon: <FaUniversity size={24} />, title: "Finance", slug: "finance" },
  { icon: <FaLock size={24} />, title: "Security", slug: "security" },
  { icon: <FaChalkboardTeacher size={24} />, title: "Teaching", slug: "teaching" },
  { icon: <FaUtensils size={24} />, title: "Cooking", slug: "cooking" },
  { icon: <FaHandsHelping size={24} />, title: "Care Taker", slug: "caretaker" },
  { icon: <FaCar size={24} />, title: "Driver", slug: "driver" },
  { icon: <FaHome size={24} />, title: "House Helper", slug: "house-helper" },
  { icon: <FaUserShield size={24} />, title: "Supervisor", slug: "supervisor" },
  { icon: <FaTags size={24} />, title: "Retail & Sales", slug: "retail" },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Browse by Category
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Find the job that’s perfect for you — about <span className="text-blue-600 font-bold">200+ new jobs</span> every day
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6">
        {categories.map((cat, index) => (
          <Link 
            href={`/jobs?category=${cat.slug}`} 
            key={index} 
            className="group" // 👈 Used for group-hover effects
          >
            <div
              className={`h-full bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center
              `}
            >
              {/* Icon Bubble */}
              <div 
                className={`mb-4 p-4 rounded-full bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300`}
              >
                {cat.icon}
              </div>
              
              <h3 className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                {cat.title}
              </h3>
              
              {/* Optional: 'Jobs available' count */}
              <p className="text-xs text-gray-400 mt-1">120+ Jobs</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* "View All" Button */}
      <div className="text-center mt-12">
        <Link 
            href="/jobs"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 transition-colors"
        >
            View All Categories
        </Link>
      </div>
    </section>
  );
}