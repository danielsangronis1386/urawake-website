import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";


function App() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      
    </>
  );
}

export default App;