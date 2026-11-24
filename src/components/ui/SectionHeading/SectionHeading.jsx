import { cx } from '../../../utils/cx';
import styles from './SectionHeading.module.scss';

/** Section title (h2) with an optional introduction. */
export default function SectionHeading({ id, title, intro, className }) {
  return (
    <div className={cx(styles.heading, className)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
