import styles from "./coming-soon.module.css";

function Mark({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d={path} />
    </svg>
  );
}

export function BrandIcon({ path, duo = false }: { path: string; duo?: boolean }) {
  if (!duo) return <Mark path={path} className={styles.glyph} />;

  return (
    <span className={styles.duo} aria-hidden="true">
      <Mark path={path} className={styles.duoCyan} />
      <Mark path={path} className={styles.duoMagenta} />
      <Mark path={path} className={styles.duoMain} />
    </span>
  );
}
