"use client";

import { type CSSProperties } from 'react';
import styles from './page.module.css';
import { useReveal } from '@/hooks/useReveal';
import Window from '@/components/Window';

const toFileName = (title: string) =>
  `${title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}.exe`;

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
      <h1 className="pageTitle animate-fade-in">My Projects</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        Check out some cool stuff I&apos;ve designed and built: software systems, APIs and web applications!
      </p>

      <div
        ref={gridRef}
        className={`${styles.projectGrid} reveal-stagger ${gridVisible ? 'reveal-visible' : ''}`}
      >
        {projects.map((project, i) => (
          <Window
            key={project.title}
            title={toFileName(project.title)}
            icon={project.linkType === 'live' ? '🌐' : '💾'}
            className={styles.projectCard}
            bodyClassName={styles.cardBody}
            style={{ '--i': i } as CSSProperties}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDesc}>{project.description}</p>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btnPrimary">
                {project.linkType === 'live' ? 'View Live »' : 'View Source »'}
              </a>
            </div>
          </Window>
        ))}
      </div>
    </div>
  );
}
