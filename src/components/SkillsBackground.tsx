import type { CSSProperties } from "react";
import styles from "./SkillsBackground.module.css";

const keywords = [
  "Python", "Django", "Java", "Spring Boot", "Microservices", "gRPC",
  "REST APIs", "PostgreSQL", "AWS", "Docker", "CI/CD", "Git",
  "System Design", "Clean Code", "API Design", "Scalability", "Unit Testing",
  "Design Patterns", "Code Review", "Agile", "GitHub Actions", "Jenkins",
  "Observability", "Caching", "Message Queues", "Debugging", "Payments",
  "Next.js", "React", "DevOps",
];

// Each word gets its own grid cell (6x5 on desktop, 2x6 on mobile) with a
// deterministic jitter, so labels never collide. No Math.random: server and
// client markup must match.
const COLS = 6;
const ROWS = 5;

const items = keywords.map((label, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS) % ROWS;
  const mobileCol = i % 2;
  const mobileRow = Math.floor(i / 2);
  return {
    label,
    x: col * (100 / COLS) + 1 + ((i * 7) % 5),
    y: row * (100 / ROWS) + 3 + ((i * 11) % 7),
    xMobile: mobileCol * 46 + 4 + ((i * 7) % 4),
    yMobile: 6 + mobileRow * 14 + ((i * 11) % 4),
    duration: 16 + ((i * 7) % 11),
    delay: -((i * 5) % 19),
    size: 0.78 + (i % 4) * 0.14,
    sway: (i % 2 === 0 ? 1 : -1) * (14 + (i % 5) * 6),
  };
});

export default function SkillsBackground() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.grid}></div>
      <div className={`${styles.orb} ${styles.orbViolet}`}></div>
      <div className={`${styles.orb} ${styles.orbCyan}`}></div>
      {items.map((item) => (
        <span
          key={item.label}
          className={styles.word}
          style={
            {
              "--x": `${item.x}%`,
              "--y": `${item.y}%`,
              "--xm": `${item.xMobile}%`,
              "--ym": `${item.yMobile}%`,
              fontSize: `${item.size}rem`,
              "--duration": `${item.duration}s`,
              "--delay": `${item.delay}s`,
              "--sway": `${item.sway}px`,
            } as CSSProperties
          }
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
