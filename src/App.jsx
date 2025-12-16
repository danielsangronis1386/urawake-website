import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";

function App() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectSection />

    </>
  );
}

export default App;