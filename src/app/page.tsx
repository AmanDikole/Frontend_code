import Image from "next/image";
import Link from "next/link";

// ✅ match exact file names in src/app/Components
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import CategorySection from "./Components/CategorySection";
import HowItWorks from "./Components/HowItWorks";
import Footer from "./Components/Footer";  // <-- capital F
import FeaturedJobs from "./Components/FeaturedJobs";
import Testimonials from "./Components/Testimonials";
import ContactUs from "./Components/ContactUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedJobs />
      <CategorySection />
      <HowItWorks />
      <Testimonials/>
      <ContactUs/>
      <Footer />

    </main>
  );
}
