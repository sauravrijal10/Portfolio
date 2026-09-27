import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const socials = [
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Twitter", href: "https://twitter.com" },
];

// Purely decorative: every good 90s homepage had one.
const HIT_COUNT = "004217";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="constructionStripe" aria-hidden="true"></div>

      <div className={styles.container}>
        <p className={styles.thanks}>Thanks for visiting! Come back soon! 👋</p>

        <nav className={styles.links}>
          {quickLinks.map((link, i) => (
            <span key={link.path}>
              {i > 0 && <span className={styles.sep}> | </span>}
              [<Link href={link.path}>{link.name}</Link>]
            </span>
          ))}
        </nav>

        <div className={styles.counter}>
          <span>You are visitor number</span>
          <span className={styles.digits} aria-label={`${parseInt(HIT_COUNT, 10)}`}>
            {HIT_COUNT.split("").map((digit, i) => (
              <span key={i} className={styles.digit}>{digit}</span>
            ))}
          </span>
        </div>

        <p className={styles.mail}>
          <span aria-hidden="true">📧</span> Mail me:{" "}
          <a href="mailto:sauravrijal1011@gmail.com">sauravrijal1011@gmail.com</a>
        </p>

        <p className={styles.socials}>
          {socials.map((social, i) => (
            <span key={social.name}>
              {i > 0 && " · "}
              <a href={social.href} target="_blank" rel="noopener noreferrer">{social.name}</a>
            </span>
          ))}
        </p>

        <p className={styles.fine}>
          Best viewed with Netscape Navigator 4.0 at 800×600
          <br />
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          <br />
          (c) {new Date().getFullYear()} Saurav Rijal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
