import type { CSSProperties, ReactNode } from "react";
import styles from "./Window.module.css";

type WindowProps = Readonly<{
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
  inactive?: boolean;
}>;

export default function Window({ title, icon, children, className = "", bodyClassName = "", style, inactive }: WindowProps) {
  return (
    <div className={`${styles.window} raised ${className}`} style={style}>
      <div className={`${styles.titleBar} ${inactive ? styles.inactive : ""}`}>
        <span className={styles.title}>
          {icon && <span aria-hidden="true">{icon}</span>}
          {title}
        </span>
        <span className={styles.controls} aria-hidden="true">
          <span className={`${styles.control} raised`}>_</span>
          <span className={`${styles.control} raised`}>□</span>
          <span className={`${styles.control} raised`}>×</span>
        </span>
      </div>
      <div className={`${styles.body} ${bodyClassName}`}>{children}</div>
    </div>
  );
}
