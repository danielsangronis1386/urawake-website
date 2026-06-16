import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';

function App() {
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

export default App;