import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
import img1 from "../../assets/clientflow/img1.png";
import img2 from "../../assets/clientflow/img2.png";
import img3 from "../../assets/clientflow/img3.png";

function ProjectSection (){
    return (
        <section className="project-section">

         <h2 className="project-section-title">PROJECTS</h2>
         <p className="project-section-subtitle">Selected work from my portafolio</p>

         {/* PROJECT 1 ClienrFlow AI */}
         <ProjectCard
            title="ClientFlow AI"
            subtitle="Freelancer CRM prototype"
            description="ClientFlow AI is a CRM concept designed to simplfy how freelancers track clients, conversations, and bookings"
            images={[img1, img2, img3]}
            />
         {/* PROJECT 2 Fitness Tracker */}
         <ProjectCard
            title="Fitness Tracker"
            subtitle="Workout Log & Progress App"
            description="A fitness tracking app designed to log workouts, follow progress, and viualize strenght improvements over time."
            />
        
          {/* PROJECT 3 RollingLog Catalog */}
         <ProjectCard
            title="RollingLog"
            subtitle="Rolling Paper Catalog App"
            description="A web catalog for browsing rolling papers, comparing brands, and exploring product details with a client UI"
            />

         </section>


    );
}

export default ProjectSection