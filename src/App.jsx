import { useState, useRef } from 'react'
import './App.css'
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import MenuOverlay from "./components/MenuOverlay";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for scrolling
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (section) => {
    let ref = null;
    switch (section) {
      case 'work':
      case 'projects':
        ref = projectsRef;
        break;
      case 'services':
        ref = servicesRef;
        break;
      case 'about':
        ref = aboutRef;
        break;
      default:
        return;
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      <div ref={heroRef}>
        <HeroSection onOpenMenu={() => setIsMenuOpen(true)} />
      </div>

      <div ref={servicesRef}>
        <ServicesSection />
      </div>

      <div ref={projectsRef}>
        <ProjectSection />
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>
    </>
  );
}

export default App;