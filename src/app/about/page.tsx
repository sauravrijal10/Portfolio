"use client";

import { useState, type CSSProperties } from 'react';
import styles from './page.module.css';
import { useReveal } from '@/hooks/useReveal';
import Window from '@/components/Window';

function ExperienceItem({ title, company, date, points, index }: Readonly<{ title: string, company: string, date: string, points: string[], index: number }>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <fieldset className={styles.groupBox} style={{ '--i': index } as CSSProperties}>
      <legend className={styles.legend}>{date}</legend>
      <div className={styles.jobHeader}>
        <div>
          <h3 className={styles.jobTitle}>{title}</h3>
          <span className={styles.company}>{company}</span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="btnSecondary"
          aria-expanded={expanded}
        >
          {expanded ? '[−] Less' : '[+] More'}
        </button>
      </div>

      {expanded && (
        <ul className={styles.bulletList}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}

const competencyGroups = [
  {
    title: 'Languages & Frameworks',
    skills: ['Python', 'Django', 'Java', 'Spring Boot'],
  },
  {
    title: 'Architecture & APIs',
    skills: ['Microservices', 'gRPC', 'REST APIs'],
  },
  {
    title: 'Infrastructure & Tooling',
    skills: ['PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'Git'],
  },
];

export default function About() {
  const { ref: timelineRef, visible: timelineVisible } = useReveal<HTMLDivElement>();
  const { ref: competencyRef, visible: competencyVisible } = useReveal<HTMLTableSectionElement>();

  return (
    <div className={styles.container}>
      <h1 className="pageTitle animate-fade-in">All About Me!</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        I am a software engineer with expertise in building scalable APIs, microservices, web applications, and cloud-native systems.
        I thrive on solving complex problems through clean architecture and DevOps best practices.
      </p>

      <div className={styles.content}>
        <Window title="My Work History" icon="💼" className="animate-fade-in delay-200">
          <div
            ref={timelineRef}
            className={`${styles.timeline} reveal-stagger ${timelineVisible ? 'reveal-visible' : ''}`}
          >
            <ExperienceItem
              index={0}
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
              index={1}
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
              index={2}
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
              index={3}
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
        </Window>

        <Window title="My Skills" icon="⭐" inactive>
          <table className={styles.competencyTable}>
            <tbody
              ref={competencyRef}
              className={`reveal-stagger ${competencyVisible ? 'reveal-visible' : ''}`}
            >
              {competencyGroups.map((group, i) => (
                <tr key={group.title} style={{ '--i': i } as CSSProperties}>
                  <th scope="row">{group.title}</th>
                  <td>
                    <div className={styles.skillsGrid}>
                      {group.skills.map((skill) => (
                        <span key={skill} className="badge">{skill}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Window>
      </div>
    </div>
  );
}
