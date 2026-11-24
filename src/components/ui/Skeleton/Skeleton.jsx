import { cx } from '../../../utils/cx';
import styles from './Skeleton.module.scss';

/**
 * Grey placeholder block shown while content loads.
 * Decorative: pair it with a visually hidden "Loading…" message.
 */
export default function Skeleton({ width = '100%', height = '1rem', className }) {
  return <span className={cx(styles.skeleton, className)} style={{ width, height }} aria-hidden="true" />;
}
