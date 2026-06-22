import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import ProjectPage from './components/ProjectPage/ProjectPage';
import CaseStudyPage from './components/CaseStudyPage/CaseStudyPage';
import Footer from './components/Footer/Footer';

const SECTION_URLS = {
  hero:     '/',
  projects: '/projects',
  services: '/services',
  about:    '/about',
  contact:  '/contact',
};

function HomePage() {
  useEffect(() => {
    const sections = [
      document.getElementById('hero'),
      document.getElementById('projects'),
      document.getElementById('services'),
      document.getElementById('about'),
      document.getElementById('contact'),
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const url = SECTION_URLS[entry.target.id] ?? '/';
            window.history.replaceState(null, '', url);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <section id="hero"><HeroSection /></section>
      <section id="projects"><ProjectSection /></section>
      <ServicesSection />
      <section id="about"><AboutSection /></section>
      <ContactSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
    </Routes>
  );
}

export default App;