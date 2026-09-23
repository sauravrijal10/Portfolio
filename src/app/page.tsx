"use client";

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useReveal, usePrefersReducedMotion } from '@/hooks/useReveal';
import SkillsBackground from '@/components/SkillsBackground';

const techStack = ['Python', 'Django', 'Java', 'Spring Boot', 'Next.js', 'React', 'Docker', 'AWS', 'DevOps'];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '3', label: 'Companies' },
  { value: `${techStack.length}`, label: 'Core Technologies' },
];

const outputLines = [
  'Building microservices...',
  'Running tests (128/128 passed)',
  'Deployed to AWS',
];

const COMMAND = 'deploy --env production';

function TerminalCard() {
  const reducedMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reducedMotion ? COMMAND : '');
  const [shownLines, setShownLines] = useState(reducedMotion ? outputLines.length : 0);

  useEffect(() => {
    if (reducedMotion) return;

    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(typeTimer);
    }, 45);

    return () => clearInterval(typeTimer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || typed.length < COMMAND.length) return;

    const lineTimer = setInterval(() => {
      setShownLines((n) => {
        if (n >= outputLines.length) {
          clearInterval(lineTimer);
          return n;
        }
        return n + 1;
      });
    }, 450);

    return () => clearInterval(lineTimer);
  }, [typed, reducedMotion]);

  const commandDone = typed.length >= COMMAND.length;

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={styles.dot} data-color="red"></span>
        <span className={styles.dot} data-color="yellow"></span>
        <span className={styles.dot} data-color="green"></span>
      </div>
      <div className={styles.terminalBody}>
        <p className={styles.terminalLine}>
          <span className={styles.terminalPrompt}>$</span> {typed}
          {!commandDone && <span className={styles.typingCursor}></span>}
        </p>
        {outputLines.slice(0, shownLines).map((line) => (
          <p key={line} className={styles.terminalLine}>
            <span className={styles.terminalCheck}>✓</span> {line}
          </p>
        ))}
        {commandDone && shownLines >= outputLines.length && (
          <p className={`${styles.terminalLine} ${styles.terminalCursor}`}>
            <span className={styles.terminalPrompt}>$</span>
          </p>
        )}
      </div>
    </div>
  );
}

function StatItem({ value, label, visible }: { value: string; label: string; visible: boolean }) {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    const duration = 900;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, target, reducedMotion]);

  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Home() {
  const { ref: statsRef, visible: statsVisible } = useReveal<HTMLDivElement>();
  const { ref: techRef, visible: techVisible } = useReveal<HTMLDivElement>();

  return (
    <div className={styles.container}>
      <SkillsBackground />
      <section className={styles.hero}>
        <div className={`${styles.heroCopy} animate-fade-in`}>
          <p className="kicker">Building scalable solutions</p>
          <h1 className={`${styles.heroTitle} animate-fade-in delay-100`}>
            I&apos;m a <span className={styles.accent}>Software</span> Engineer
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-in delay-200`}>
            I design and build robust, scalable software — from REST APIs and microservices to web applications, CI/CD pipelines and cloud deployments.
          </p>
          <div className={`${styles.ctaContainer} animate-fade-in delay-300`}>
            <Link href="/projects" className="btnPrimary">View My Work</Link>
            <a href="/Saurav-Resume.pdf" download="Saurav_Resume.pdf" className="btnSecondary">Download CV</a>
          </div>

          <div ref={statsRef} className={`${styles.statsRow} animate-fade-in delay-400`}>
            {stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} visible={statsVisible} />
            ))}
          </div>
        </div>

        <div className={`${styles.heroVisual} animate-fade-in delay-200`} aria-hidden="true">
          <TerminalCard />
        </div>
      </section>

      <section className={styles.techStack}>
        <h2 className="sectionTitle">Technologies I work with</h2>
        <div
          ref={techRef}
          className={`${styles.techGrid} reveal-stagger ${techVisible ? 'reveal-visible' : ''}`}
        >
          {techStack.map((tech, i) => (
            <span key={tech} className="badge" style={{ '--i': i } as CSSProperties}>{tech}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
