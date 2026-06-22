import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import ProjectPage from './components/ProjectPage/ProjectPage';
import CaseStudyPage from './components/CaseStudyPage/CaseStudyPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <section id="projects"><ProjectSection /></section>
      <ServicesSection />
      <section id="about"><AboutSection /></section>
      <ContactSection />
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