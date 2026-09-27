"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", path: "/", icon: "🏠", file: "INDEX.HTM" },
  { name: "About", path: "/about", icon: "📇", file: "ABOUT.HTM" },
  { name: "Projects", path: "/projects", icon: "📁", file: "PROJECTS.HTM" },
  { name: "Contact", path: "/contact", icon: "✉️", file: "CONTACT.HTM" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const current = navLinks.find((link) => link.path === pathname);

  return (
    <header className={`${styles.header} raised`}>
      <div className={styles.inner}>
        <div className={styles.toolbar}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon} aria-hidden="true">S</span>
            Saurav Rijal&apos;s Home Page
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${styles.navButton} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
            <button className={styles.navButton} onClick={toggleTheme} aria-label="Toggle day and night theme">
              <span aria-hidden="true">{theme === "dark" ? "🌙" : "☀️"}</span>
              {theme === "dark" ? "Night" : "Day"}
            </button>
          </nav>
        </div>

        <div className={styles.addressRow}>
          <span className={styles.addressLabel}>Location:</span>
          <span className={`${styles.address} sunken`}>
            file:///C:/HOMEPAGE/{current?.file ?? "404.HTM"}
          </span>
        </div>
      </div>
    </header>
  );
}
