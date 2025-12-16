import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <div className="about-left">
          <div className="portrait-placeholder">
            <span>PORTRAIT</span>
          </div>
        </div>
        <div className="about-right">
          <h2>ABOUT</h2>
          <p className="about-description">
            I'm Daniel Sangronis, a web developer focused on building clean, functional interfaces and simple digital system for small bussiness. I care about clarity, structure, and creating tools that solve real problems.
          </p>
          <ul className="skills-list">
            <li>JavaScript</li>
            <li>React</li>
            <li>Python</li>
            <li>Django</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>REST APIs</li>
            <li>Git</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
