import React from 'react';
import './ProjectSection.css';
import ProjectCard from '../ProjectCard/ProjectCard';

// Dummy data for now - usually this would come from a data file or props
const PROJECTS = [
   {
      id: 1,
      title: "CLIENTFLOW AI",
      subtitle: "Freelancer CRM prototype",
      description: "The all-in-one business software for freelancers. Whether you're just starting out or growing your business, Clientflow helps you win new clients, organize projects, get paid, and manage your finances.",
      images: ["placeholder", "placeholder", "placeholder"] // placeholders for now
   },
   {
      id: 2,
      title: "ROLLINGLOG",
      subtitle: "Rolling Paper Catalog App",
      description: "The ultimate step-by-step guide on how to roll with paper. A comprehensive catalog app for enthusiasts.",
      images: ["placeholder", "placeholder"]
   },
   {
      id: 3,
      title: "FITNESS TRACKER",
      subtitle: "Workout Log & Progress App",
      description: "Work hard to get better life. A creative fitness website tracking workouts, progress, and finding classes.",
      images: ["placeholder", "placeholder", "placeholder"]
   }
];

const ProjectSection = () => {
   return (
      <section className="project-section">
         <div className="project-section-header">
            <h2>PROJECTS</h2>
            <p>Selected work from my portfolio</p>
         </div>

         <div className="projects-grid">
            {PROJECTS.map(project => (
               <ProjectCard
                  key={project.id}
                  {...project}
               />
            ))}
         </div>
      </section>
   );
};

export default ProjectSection;