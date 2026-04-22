"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>S</span>
          SAURAV RIJAL
        </Link>
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}
