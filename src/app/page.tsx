import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <p className={`${styles.tagline} animate-fade-in`}>BUILDING SCALABLE SOLUTIONS.</p>
        <h1 className={`pageTitle ${styles.heroTitle} animate-fade-in delay-100`}>
          I&apos;m a <span className={styles.accent}>Backend</span> Developer
        </h1>
        <p className={`pageSubtitle animate-fade-in delay-200`}>
          I design and build robust, scalable backend systems and cloud infrastructure — from REST APIs and microservices to CI/CD pipelines and cloud deployments.
        </p>
        <div className={`${styles.ctaContainer} animate-fade-in delay-300`}>
          <Link href="/projects" className="btnPrimary">View My Work</Link>
          <a href="/Saurav-Resume.pdf" download="Saurav_Resume.pdf" className="btnSecondary">Download CV</a>
        </div>
      </section>

      <section className={`${styles.techStack} animate-fade-in delay-400`}>
        <p className={styles.techTitle}>Technologies I work with</p>
        <div className={styles.techGrid}>
          {['Python', 'Django', 'Java', 'Spring Boot', 'Next.js', 'React', 'Docker', 'AWS', 'DevOps'].map(tech => (
            <span key={tech} className="badge">{tech}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
