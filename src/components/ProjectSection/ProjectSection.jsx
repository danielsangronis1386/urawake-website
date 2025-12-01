import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
//CLIENTFLOW IMAGES 
import img1 from "../../assets/clientflow/img1.png";
import img2 from "../../assets/clientflow/img2.png";
import img3 from "../../assets/clientflow/img3.png";
//FITNESS TRACKER IMAGES
import ft1 from "../../assets/fitnesstracker/img1.png";
import ft2 from "../../assets/fitnesstracker/img2.png";
import ft3 from "../../assets/fitnesstracker/img3.webp";
//ROLLINGLOG IMAGES 
import rl1 from "../../assets/rollinglog/img1.webp";
import rl2 from "../../assets/rollinglog/img2.webp";
import rl3 from "../../assets/rollinglog/img3.webp";



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
             images={[ft1, ft2, ft3]}
            />
        
          {/* PROJECT 3 RollingLog Catalog */}
         <ProjectCard
            title="RollingLog"
            subtitle="Rolling Paper Catalog App"
            description="A web catalog for browsing rolling papers, comparing brands, and exploring product details with a client UI"
             images={[rl1, rl2, rl3]}
            />

         </section>


    );
}

export default ProjectSection