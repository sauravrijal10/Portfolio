import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.44-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.8 1.17 1.82 1.17 3.08 0 4.43-2.7 5.4-5.27 5.68.42.36.78 1.08.78 2.18v3.23c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.75h8.96V23.5H.5V8.75Zm14.5-.28c2.9 0 5.5 1.87 5.5 5.9v9.13h-4.24v-8.4c0-2.01-.72-3.38-2.53-3.38-1.38 0-2.2.93-2.56 1.83-.13.32-.16.77-.16 1.22v8.73h-4.24s.06-14.2 0-15.73h4.24v2.23c.56-.87 1.57-2.1 3.99-2.1Z" />
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <path d="M23 5.4c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.96-2.48 8.9 8.9 0 0 1-2.83 1.08 4.46 4.46 0 0 0-7.6 4.07A12.65 12.65 0 0 1 2.9 4.13a4.46 4.46 0 0 0 1.38 5.95 4.4 4.4 0 0 1-2.02-.56v.06a4.46 4.46 0 0 0 3.58 4.37 4.5 4.5 0 0 1-2.01.08 4.47 4.47 0 0 0 4.17 3.1A8.95 8.95 0 0 1 1 19.13a12.6 12.6 0 0 0 6.84 2c8.2 0 12.7-6.8 12.7-12.7 0-.19 0-.39-.02-.58A9.06 9.06 0 0 0 23 5.4Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoInfo}>
            <span className={styles.logo}>Saurav Rijal</span>
            <p className={styles.desc}>Building scalable software, from APIs and microservices to cloud infrastructure, with modern DevOps practices.</p>
            <div className={styles.socialLinks}>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={styles.socialIcon}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            <h3>Quick Links</h3>
            {quickLinks.map((link) => (
              <Link key={link.path} href={link.path}>{link.name}</Link>
            ))}
          </div>

          <div className={styles.links}>
            <h3>Get in Touch</h3>
            <a href="mailto:sauravrijal1011@gmail.com">sauravrijal1011@gmail.com</a>
            <Link href="/contact">Contact Form</Link>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} Saurav Rijal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
