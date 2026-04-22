import Link from 'next/link';
import styles from './page.module.css';

const projects = [
  {
  title: 'Loan & Borrow Tracker',
  description: 'A personal finance tracking system to manage loans and borrowings, built with Next.js and Firebase with real-time updates and user authentication.',
  tags: ['Next.js', 'Firebase', 'React', 'Tailwind CSS'],
  link: 'https://lendocs.vercel.app/'
  },
  {
    title: 'Civic Issue Report System',
    description: 'A civic issue reporting system built using Python Django and CNN image recognition for automated issue categorization.',
    tags: ['Python', 'Django', 'CNN', 'Machine Learning'],
    link: 'https://github.com/sauravrijal10/PythonFinalYear'
  },
];

export default function Projects() {
  return (
    <div className={styles.container}>
      <h1 className="pageTitle animate-fade-in">Selected Work</h1>
      <p className="pageSubtitle animate-fade-in delay-100">
        A curated selection of backend systems, APIs, and cloud infrastructure projects I&apos;ve designed and built.
      </p>

      <div className={`${styles.projectGrid} animate-fade-in delay-200`}>
        {projects.map((project, index) => (
          <div key={index} className={`${styles.projectCard} card`}>
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
              <Link href={project.link} className={styles.viewLink}>View Project &rarr;</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
