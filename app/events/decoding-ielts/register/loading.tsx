import styles from './registration.module.css';

export default function Loading() {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.loadingBox}>
        <img src="/images/brand/finant-mark.png" alt="" />
        <div className={styles.loadingLine} />
        <p>Opening registration</p>
      </div>
    </div>
  );
}
