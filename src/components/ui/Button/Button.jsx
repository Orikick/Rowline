import { Link } from 'react-router';
import { cx } from '../../../utils/cx';
import styles from './Button.module.scss';

/**
 * Button that renders the right element for the job:
 * - `to`   → router <Link> (in-app navigation)
 * - `href` → <a> (anchors and external links)
 * - otherwise a <button>
 *
 * variant: 'primary' | 'secondary' | 'inverse'
 * size:    'md' | 'sm'
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  to,
  href,
  type = 'button',
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    size === 'sm' && styles.small,
    full && styles.full,
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
