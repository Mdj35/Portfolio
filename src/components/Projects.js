// Projects.js
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: 'Project 1', description: 'Cool 3D project.', link: '#' },
  { title: 'Project 2', description: 'React interactive site.', link: '#' },
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="project-cards">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noreferrer">
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
