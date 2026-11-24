import { cx } from '../../../utils/cx';
import Icon from '../Icon/Icon';
import styles from './StatusMessage.module.scss';

/**
 * Empty and error states.
 * tone: 'empty' | 'error'. Errors are announced to screen readers immediately.
 * `action` is an optional node, usually a Button ("Try again", "Contact us").
 */
export default function StatusMessage({ tone = 'empty', title, children, action, className }) {
  const isError = tone === 'error';

  return (
    <div
      className={cx(styles.message, isError && styles.error, className)}
      role={isError ? 'alert' : 'status'}
    >
      <span className={styles.icon}>
        <Icon name={isError ? 'alert' : 'inbox'} size={22} />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {children && <p className={styles.body}>{children}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}
