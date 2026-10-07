import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import ProjectPage from './components/ProjectPage/ProjectPage';
import CaseStudyPage from './components/CaseStudyPage/CaseStudyPage';
import ProposalPage from './components/ProposalPage/ProposalPage';
import InvoicePage from './components/InvoicePage/InvoicePage';
import WhyUsPage from './components/WhyUsPage/WhyUsPage';
import TeamPage from './components/TeamPage/TeamPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer';
import { usePageMeta } from './lib/seo';
import { routeMeta } from './lib/routeMeta';

const SECTION_URLS = {
  hero:     '/',
  projects: '/#projects',
  services: '/#services',
  contact:  '/#contact',
};

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // Client-side navigation keeps the previous page's scroll offset,
      // so landing home from another route would drop you mid-page.
      window.scrollTo(0, 0);
    }
  }, []);

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
      { threshold: 0, rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-fade">
      <Navbar />
      <section id="hero"><HeroSection /></section>
      <section id="projects"><ProjectSection /></section>
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// Every route's head tags come from one place, so the prerendered HTML and the
// post-hydration DOM can't drift apart.
function RouteMeta() {
  const { pathname } = useLocation();
  usePageMeta(routeMeta(pathname));
  return null;
}

function App() {
  return (
    <>
    <RouteMeta />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="/proposals/:slug" element={<ProposalPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/why-us" element={<WhyUsPage />} />
      <Route path="/invoices/:slug" element={<InvoicePage />} />
      {/* Renders a real 404 page. Vercel serves the prerendered 404.html with a
          404 status for unmatched paths, so crawlers get the right signal too. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;