import { cx } from '../../../utils/cx';
import styles from './Logo.module.scss';

/** Rowline wordmark. The mark is decorative; the word carries the name. */
export default function Logo({ className }) {
  return (
    <span className={cx(styles.logo, className)}>
      <svg className={styles.mark} width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect className={styles.tile} width="32" height="32" rx="8" />
        <rect className={styles.oar} x="7" y="8" width="14" height="4" rx="2" />
        <rect className={styles.buoy} x="11" y="14" width="14" height="4" rx="2" />
        <rect className={styles.oar} x="7" y="20" width="14" height="4" rx="2" />
      </svg>
      <span className={styles.word}>Rowline</span>
    </span>
  );
}
