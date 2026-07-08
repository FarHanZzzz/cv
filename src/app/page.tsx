import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Landing Hero Section */}
      <Hero />

      {/* About Section with Stats */}
      <About />

      {/* Education Timeline */}
      <Education />

      {/* Skills Pill Filters */}
      <Skills />

      {/* Projects Grid with detailed accordions */}
      <Projects />

      {/* Work & Leadership Roles */}
      <Experience />

      {/* Achievements Cards */}
      <Achievements />

      {/* Contact Form & Social Triggers */}
      <Contact />

      {/* Footer Credentials */}
      <Footer />
    </div>
  );
}
