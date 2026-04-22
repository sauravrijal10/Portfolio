import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoInfo}>
            <span className={styles.logo}>Saurav Rijal</span>
            <p className={styles.desc}>Building scalable backend systems and cloud infrastructure with modern DevOps practices.</p>
          </div>
          <div className={styles.links}>
            <h3>Socials</h3>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
