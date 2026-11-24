import { useId } from 'react';
import { cx } from '../../../utils/cx';
import Icon from '../Icon/Icon';
import styles from './FormField.module.scss';

/**
 * Label + control + error message, wired together for assistive tech.
 *
 * as:           'input' | 'textarea' | 'select'
 * registration: the object returned by React Hook Form's register()
 * error:        message string; when set the control is marked invalid
 * hint:         optional helper text shown under the label
 */
export default function FormField({
  as: Control = 'input',
  label,
  hint,
  error,
  registration,
  className,
  children,
  ...rest
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = cx(hint && hintId, error && errorId) || undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {hint && (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      )}
      <Control
        id={id}
        className={cx(styles.control, Control === 'textarea' && styles.textarea, error && styles.invalid)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...registration}
        {...rest}
      >
        {children}
      </Control>
      {error && (
        <p className={styles.error} id={errorId} role="alert">
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
