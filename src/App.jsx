import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from './components/AboutSection';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <section id="projects"><ProjectSection /></section>
      <section id="about"><AboutSection /></section>
      <section id="services" />
      <section id="contact" />
    </>
  );
}

export default App;