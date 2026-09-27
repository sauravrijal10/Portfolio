"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useReveal, usePrefersReducedMotion } from '@/hooks/useReveal';
import Window from '@/components/Window';

const techStack = ['Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'PostgreSQL', 'Next.js', 'React', 'Docker', 'AWS', 'DevOps'];

// From Saurav-Resume.pdf
const quickFacts = [
  { icon: '📍', label: 'Based in', value: 'Kathmandu, Nepal' },
  { icon: '💼', label: 'Now', value: 'Software Engineer @ Navya Advisors Limited' },
  { icon: '🎓', label: 'Studying', value: 'BSc.CSIT, Tribhuvan University' },
  { icon: '🔧', label: 'Into', value: 'Microservices, AWS, System Architecture & more' },
  { icon: '📬', label: 'Status', value: 'Open to new challenges & collaborations!' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '3', label: 'Companies' },
  { value: `${techStack.length}`, label: 'Core Technologies' },
];

const marqueeText = `*** Welcome to my corner of the World Wide Web!!! *** ${techStack.join(' ★ ')} *** Thanks for stopping by, surfer! *** `;

const PROMPT = 'C:\\SAURAV>';

// From the Skills section (and tools named under Experience) of Saurav-Resume.pdf
const cvSkills = [
  { label: 'LANGUAGES', items: 'Python, Java, SQL' },
  { label: 'FRAMEWORKS', items: 'Django, DRF, Flask, Spring Boot' },
  { label: 'APIS', items: 'REST, gRPC, Microservices' },
  { label: 'DATABASE', items: 'PostgreSQL' },
  { label: 'CLOUD', items: 'AWS S3, EC2, SNS, SQS, Lambda' },
  { label: 'DEVOPS', items: 'Docker, GitHub Actions, Jenkins, CI/CD' },
  { label: 'TOOLS', items: 'Git/GitHub, New Relic, Agile/Scrum' },
  { label: 'PAYMENTS', items: 'Khalti, eSewa, ConnectIPS' },
  { label: 'SOFT', items: 'Team Collaboration, Adaptability, Problem Solving, Enthusiasm, Time Management' },
];

type Step = { command: string; lineFrames: number; output: ReactNode[] };

const script: Step[] = [
  {
    command: 'deploy --env production',
    lineFrames: 6,
    output: ['Building microservices...', 'Running tests (128/128 passed)', 'Deployed to AWS'].map((line) => (
      <span key={line}><span className={styles.terminalOk}>[OK]</span> {line}</span>
    )),
  },
  {
    command: 'type SKILLS.TXT',
    lineFrames: 3,
    output: cvSkills.map(({ label, items }) => (
      <span key={label} className={styles.skillRow}>
        <span className={styles.skillLabel}>{label}</span>
        <span>{items}</span>
      </span>
    )),
  },
];

// One frame = one typed character; PAUSE frames sit between a command and its output.
const FRAME_MS = 70;
const PAUSE = 4;
const stepFrames = (step: Step) => step.command.length + PAUSE + step.output.length * step.lineFrames + PAUSE;
const TOTAL_FRAMES = script.reduce((sum, step) => sum + stepFrames(step), 0);
const STEP_STARTS = script.map((_, i) => script.slice(0, i).reduce((sum, step) => sum + stepFrames(step), 0));

function TerminalCard() {
  const reducedMotion = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);
  const now = reducedMotion ? TOTAL_FRAMES : frame;

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setFrame((f) => {
        if (f + 1 >= TOTAL_FRAMES) clearInterval(timer);
        return Math.min(f + 1, TOTAL_FRAMES);
      });
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  // Every line is always rendered (hidden until reached) so the window never changes size.
  const steps = script.map((step, i) => {
    const elapsed = now - STEP_STARTS[i];
    const typed = Math.max(0, Math.min(elapsed, step.command.length));
    const outputElapsed = elapsed - step.command.length - PAUSE;
    const shown = outputElapsed < 0 ? 0 : Math.min(step.output.length, Math.floor(outputElapsed / step.lineFrames) + 1);
    return { step, started: elapsed >= 0, typing: elapsed >= 0 && typed < step.command.length, typed, shown };
  });
  const done = now >= TOTAL_FRAMES;
  const hidden = { visibility: 'hidden' } as const;

  return (
    <Window title="MS-DOS Prompt" icon="🖥️" className={styles.terminal} bodyClassName={styles.terminalBody}>
      <p className={styles.terminalLine}>SauravDOS Version 6.22</p>
      <p className={styles.terminalLine}>640K conventional memory OK</p>
      <p className={styles.terminalLine}>&nbsp;</p>
      {steps.map(({ step, started, typing, typed, shown }) => (
        <div key={step.command} className={styles.terminalStep}>
          <p className={styles.terminalLine} style={started ? undefined : hidden}>
            {PROMPT}{started ? step.command.slice(0, typed) : step.command}
            {typing && <span className={styles.cursor}>_</span>}
          </p>
          {step.output.map((line, i) => (
            <p key={i} className={styles.terminalLine} style={i < shown ? undefined : hidden}>
              {line}
            </p>
          ))}
        </div>
      ))}
      <p className={styles.terminalLine} style={done ? undefined : hidden}>
        {PROMPT}<span className={styles.cursor}>_</span>
      </p>
    </Window>
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
    <td className={styles.stat}>
      <span className={styles.statValue}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </td>
  );
}

export default function Home() {
  const { ref: statsRef, visible: statsVisible } = useReveal<HTMLTableElement>();
  const { ref: techRef, visible: techVisible } = useReveal<HTMLDivElement>();

  return (
    <div className={styles.container}>
      <div className={`${styles.marquee} sunken`} aria-label={marqueeText}>
        <div className={styles.marqueeTrack} aria-hidden="true">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <header className={`${styles.welcome} animate-fade-in`}>
        <h1 className="pageTitle">Welcome to my Home Page!</h1>
        <p className="pageSubtitle">
          ~ Saurav Rijal · Software Engineer ~ <span className="newTag blink">NEW!</span>
        </p>
      </header>

      <hr className="rainbowRule" />

      <section className={styles.hero}>
        <Window title="welcome.txt - Notepad" icon="📝" className={`${styles.heroCopy} animate-fade-in delay-100`} bodyClassName={styles.notepad}>
          <p className={styles.kicker}>Howdy, web surfer! 👋</p>
          <h2 className={styles.heroTitle}>
            Hi! I&apos;m a <span className={styles.accent}>Software</span> Engineer
          </h2>
          <p className={styles.heroSubtitle}>
            I design and build robust, scalable software — from REST APIs and microservices to web applications, CI/CD pipelines and cloud deployments.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/projects" className="btnPrimary">See My Projects »</Link>
            <a href="/Saurav-Resume.pdf" download="Saurav_Resume.pdf" className="btnSecondary">💾 Download Resume</a>
          </div>

          <table ref={statsRef} className={styles.statsTable}>
            <tbody>
              <tr>
                {stats.map((stat) => (
                  <StatItem key={stat.label} value={stat.value} label={stat.label} visible={statsVisible} />
                ))}
              </tr>
            </tbody>
          </table>

          <h3 className={styles.factsTitle}>Quick Facts</h3>
          <dl className={styles.facts}>
            {quickFacts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt><span aria-hidden="true">{fact.icon}</span> {fact.label}:</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Window>

        <div className={`${styles.heroVisual} animate-fade-in delay-200`}>
          <TerminalCard />
        </div>
      </section>

      <Window title="Cool Tech I Use" icon="🛠️" inactive className="animate-fade-in delay-300">
        <div
          ref={techRef}
          className={`${styles.techGrid} reveal-stagger ${techVisible ? 'reveal-visible' : ''}`}
        >
          {techStack.map((tech, i) => (
            <span key={tech} className="badge" style={{ '--i': i } as CSSProperties}>{tech}</span>
          ))}
        </div>
      </Window>
    </div>
  );
}
