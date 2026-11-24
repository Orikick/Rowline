import { logos } from '../../../data/logos';
import Container from '../../ui/Container/Container';
import styles from './LogoCloud.module.scss';

/** Simple geometric marks for the fictional customer wordmarks. */
const marks = {
  chevrons: <path d="M3 6l5 6-5 6M11 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />,
  ring: <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="3" />,
  triangle: <path d="M12 3.5 21 20H3z" fill="currentColor" />,
  spark: <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor" />,
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="currentColor" />,
  bars: <path d="M4 20V10M10 20V4M16 20v-8M22 20V7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
};

export default function LogoCloud() {
  return (
    <section className={styles.section} aria-labelledby="customers-title">
      <Container className={styles.inner}>
        <h2 id="customers-title" className={styles.title}>
          More than 2,400 teams plan their week in Rowline
        </h2>
        <ul className={styles.list} role="list">
          {logos.map((logo) => (
            <li key={logo.id} className={styles.logo}>
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                {marks[logo.mark]}
              </svg>
              <span>{logo.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
