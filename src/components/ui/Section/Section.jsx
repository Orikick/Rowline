import { cx } from '../../../utils/cx';
import Container from '../Container/Container';
import styles from './Section.module.scss';

/**
 * Page section with consistent vertical spacing.
 * `labelledBy` should be the id of the section's heading.
 * tone: 'default' | 'alt' (tinted band)
 */
export default function Section({ id, labelledBy, tone = 'default', className, children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(styles.section, tone === 'alt' && styles.alt, className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
