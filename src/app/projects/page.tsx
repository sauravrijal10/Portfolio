"use client";

import { type CSSProperties } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useReveal } from '@/hooks/useReveal';

const projects = [
  {
    title: 'Loan & Borrow Tracker',
    description: 'A personal finance tracking system to manage loans and borrowings, built with Next.js and Firebase with real-time updates and user authentication.',
    tags: ['Next.js', 'Firebase', 'React', 'Tailwind CSS'],
    link: 'https://lendocs.vercel.app/',
    linkType: 'live' as const,
  },
  {
    title: 'Civic Issue Report System',
    description: 'A civic issue reporting system built using Python Django and CNN image recognition for automated issue categorization.',
    tags: ['Python', 'Django', 'CNN', 'Machine Learning'],
    link: 'https://github.com/sauravrijal10/PythonFinalYear',
    linkType: 'source' as const,
  },
];

export default function Projects() {
  const { ref: gridRef, visible: gridVisible } = useReveal<HTMLDivElement>();

  return (
    <div className={styles.container}>
      <h1 className="pageTitle animate-fade-in">Selected Work</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        A curated selection of software systems, APIs, and web applications I&apos;ve designed and built.
      </p>

      <div
        ref={gridRef}
        className={`${styles.projectGrid} reveal-stagger ${gridVisible ? 'reveal-visible' : ''}`}
      >
        {projects.map((project, i) => (
          <div key={project.title} className={`${styles.projectCard} card`} style={{ '--i': i } as CSSProperties}>
            <div className={styles.cardAccent}></div>
            <div className={styles.cardHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {project.tags.map(tag => (
                   <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <Link href={project.link} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                {`${project.linkType === 'live' ? 'View Live' : 'View Source'} →`}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
