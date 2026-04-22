"use client";

import { useState } from 'react';
import styles from './page.module.css';

function ExperienceItem({ title, company, date, points }: { title: string, company: string, date: string, points: string[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDot}></div>
      <div className={`${styles.timelineContent} card`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3>{title}</h3>
            <span className={styles.company}>{company}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className={styles.viewMoreBtn}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            {expanded ? 'View Less ▲' : 'View More ▼'}
          </button>
        </div>
        
        {expanded && (
          <ul className={styles.bulletList} style={{ marginTop: '1rem' }}>
            {points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className="pageTitle animate-fade-in">About Me</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        I am a backend-focused developer with expertise in building scalable APIs, microservices, and cloud-native applications.
        I thrive on solving complex problems through clean architecture and DevOps best practices.
      </p>

      <div className={styles.content}>
        <section className="animate-fade-in delay-200">
          <h2 className="sectionTitle">Experience</h2>

          <div className={styles.timeline}>
            <ExperienceItem 
              title="Software Engineer"
              company="Navya Advisors Limited — Lazimpat, Kathmandu"
              date="Jan 2026 - Present"
              points={[
                "Designed and implemented Microservices-based architecture for scalable backend services.",
                "Implemented high-performance service communication using gRPC between internal services.",
                "Integrated multiple Nepalese payment gateways including Khalti, eSewa, and ConnectIPS for secure online transactions.",
                "Developed secure payment workflows including payment verification, callback handling, and transaction status management."
              ]}
            />
            
            <ExperienceItem 
              title="Backend Engineer"
              company="Speedhome — Kuala Lumpur, Malaysia"
              date="July 2024 - April 2025"
              points={[
                "Resolved critical bugs and implemented performance improvements through deep log analysis and issue tracking.",
                "Created detailed investigation reports for production issues, ensuring quick resolution and better system reliability.",
                "Analyzed application logs (New Relic) to detect anomalies, optimize processes, and reduce downtime.",
                "Worked with AWS services such as S3, SNS, and SQS to improve system integration and reliability.",
                "Led a feature module end-to-end from planning to deployment, collaborating across teams and delivering ahead of schedule.",
                "Contributed to backend development using Java 8 (Spring Boot) and wrote unit/integration tests.",
                "Participated in code reviews, feature planning, and sprint meetings."
              ]}
            />

            <ExperienceItem 
              title="Backend Engineer"
              company="Digi Dolphins — Kaushaltar, Bhaktapur"
              date="Jan 2024 - July 2024"
              points={[
                "Designed and developed scalable web applications using Python and Django.",
                "Built and optimized RESTful APIs with clean, reusable, and testable code, integrating seamlessly with PostgreSQL.",
                "Implemented CI/CD pipelines using GitHub Actions and Jenkins to automate testing and deployment workflows.",
                "Diagnosed and resolved application issues using logging, debugging, and robust exception handling practices.",
                "Collaborated cross-functionally to deliver features on time and authored clear technical documentation for APIs and services."
              ]}
            />

            <ExperienceItem 
              title="Backend Intern"
              company="Digi Dolphins — Kaushaltar, Bhaktapur"
              date="Oct 2023 - Jan 2024"
              points={[
                "Assisted in developing features for Django applications under the guidance of senior developers.",
                "Participated actively in Agile processes such as sprint planning and daily standups.",
                "Practiced version control with Git: branching, merging, and creating pull requests with code reviews.",
                "Modified and enhanced existing Viewsets, Models, and Serializers to meet business requirements.",
                "Continued learning by exploring Django middleware and modern libraries to improve coding skills."
              ]}
            />
          </div>
        </section>

        <section className="animate-fade-in delay-300">
          <h2 className="sectionTitle">Core Competencies</h2>
          <div className={styles.skillsGrid}>
            {['Python', 'Django', 'Java', 'Spring Boot', 'gRPC', 'Microservices', 'REST APIs', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'Git'].map((skill) => (
              <span key={skill} className="badge">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
