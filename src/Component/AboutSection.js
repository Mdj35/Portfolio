import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../prof.jpg';
import projects from './Projects'; // Add this import
import certificates from './Certificates'; // Add this import

const AboutSection = () => {
  const skills = [
    // Frontend
    'React', 
    'JavaScript (ES6+)', 
    'HTML & CSS',
    'Framer Motion',
    // Backend
    'Node.js',
    'Express',
    'MongoDB',
    'SQL',
    // Tools & Others
    'Git',
    'RESTful APIs',
    'Docker',
    'AWS'
  ];
  
  const stats = [
    { label: 'Projects', value: projects.length }, // Dynamic project count
    { label: 'Certificates', value: certificates.length }, // Dynamic certificate count
    { label: 'Years', value: 2 },
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #1a1f3c 0%, #162447 100%)',
        color: 'white',
      }}
    >
      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          #about {
            padding-top: 80px; /* Increased padding for header */
            min-height: auto;
          }
          
          #about > div {
            padding: 2rem 1rem !important;
          }

          #about .profile-image {
            width: 180px !important;
            height: 180px !important;
            margin: 0 auto 2rem !important;
          }

          #about .content-wrapper {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 1rem;
            gap: 1.5rem;
          }

          #about .details {
            width: 100% !important;
            min-width: unset !important;
            padding: 0;
          }

          #about .stats-aside {
            width: 100%;
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          #about .stat-card {
            flex: 1 1 120px;
            max-width: 140px;
            min-width: unset;
          }

          #about .skills-wrapper {
            justify-content: center;
            gap: 0.5rem;
          }

          #about .skills-wrapper span {
            font-size: 12px !important;
            padding: 6px 10px !important;
          }
        }

        /* Additional breakpoint for smaller phones */
        @media (max-width: 380px) {
          #about {
            padding-top: 70px;
          }

          #about .profile-image {
            width: 150px !important;
            height: 150px !important;
          }

          #about h2 {
            font-size: 22px !important;
          }

          #about h4 {
            font-size: 14px !important;
          }

          #about p {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }

          #about .stat-card {
            flex: 1 1 100%;
            max-width: 100%;
            margin: 0.25rem 0;
          }

          #about .skills-wrapper {
            gap: 0.35rem;
          }

          #about .skills-wrapper span {
            font-size: 11px !important;
            padding: 5px 8px !important;
          }
        }

        /* Fix for extra small devices */
        @media (max-width: 320px) {
          #about > div {
            padding: 1rem 0.5rem !important;
          }

          #about .content-wrapper {
            padding: 0 0.5rem;
          }

          #about .profile-image {
            width: 130px !important;
            height: 130px !important;
          }
        }
      `}</style>

      {/* Content wrapper adjustment */}
      <div style={{ 
        position: 'relative', 
        zIndex: 5, 
        padding: '15rem 2rem',
        width: '100%',
        maxWidth: '100vw',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <motion.div
          className="content-wrapper"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '2rem',
            maxWidth: 1200,
            margin: '0 auto',
            flexWrap: 'wrap',
            color: '#e2e8f0',
          }}
        >
          {/* Profile Image */}
          <motion.img
            className="profile-image"
            src={profileImage}
            alt="Vynce Ian Oani"
            style={{
              width: 300,
              height: 300,
              borderRadius: 16,
              objectFit: 'cover',
              border: '4px solid rgba(226, 232, 240, 0.92)',
              boxShadow: '0 14px 40px rgba(0,0,0,0.3)',
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Details */}
          <motion.div
            className="details"
            style={{ flex: '1 1 520px', minWidth: 320 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.h2
              style={{ fontSize: 32, margin: 0, fontWeight: 700 }}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Vynce Ian Oani
            </motion.h2>

            <motion.h4
              style={{ marginTop: 10, marginBottom: 16, fontWeight: 500, opacity: 0.95 }}
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.95 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Full-Stack Developer · Software Engineer
            </motion.h4>

            <motion.p
              style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 18, opacity: 0.95 }}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              I build complete web applications from front to back, combining modern UI/UX with robust server-side solutions. 
              Focused on scalable architecture, clean code, and optimal performance across the entire stack.
            </motion.p>

            {/* Links */}
            <motion.div
              style={{ display: 'flex', gap: 12, marginBottom: 18 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              <a
                href="https://github.com/Mdj35"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vynce-ian-oani-832080323/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
              >
                <FaLinkedin /> LinkedIn
              </a>
            </motion.div>

            {/* Skills */}
            <motion.div
              className="skills-wrapper"
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {skills.map((s) => (
                <span
                  key={s}
                  style={{
                    background: 'rgba(226, 232, 240, 0.08)',
                    padding: '8px 12px',
                    borderRadius: 10,
                    fontSize: 14,
                    color: '#8bb6f0',
                    border: '1px solid rgba(139, 182, 240, 0.2)',
                  }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.aside
            className="stats-aside"
            style={{
              flex: '0 0 220px',
              minWidth: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              alignItems: 'stretch',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="stat-card"
                style={{
                  background: 'rgba(226, 232, 240, 0.05)',
                  padding: '12px 14px',
                  borderRadius: 12,
                  textAlign: 'center',
                  border: '1px solid rgba(139, 182, 240, 0.15)',
                }}
              >
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 700,
                  color: '#8bb6f0'
                }}>
                  {s.value}+
                </div>
                <div style={{ 
                  fontSize: 13, 
                  color: '#a8c5f7'
                }}>
                  {s.label}
                </div>
              </div>
            ))}

            {/* Work With Me Button */}
            <a
              href="#contact"
              style={{
                marginTop: 6,
                padding: '12px 16px',
                width: '100%',
                borderRadius: 12,
                background: 'rgba(139, 182, 240, 0.15)',
                textAlign: 'center',
                color: '#8bb6f0',
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid rgba(139, 182, 240, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(139, 182, 240, 0.25)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(139, 182, 240, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Work With Me
            </a>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
