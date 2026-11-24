import { Link } from 'react-router';
import { cx } from '../../../utils/cx';
import styles from './NavLinks.module.scss';

/**
 * Anchor navigation shared by the desktop header and the mobile menu.
 * On the home page links are plain in-page anchors; on any other page
 * they route back to the home page and its section.
 *
 * orientation: 'horizontal' | 'vertical'
 */
export default function NavLinks({ items, activeId, onHome, onNavigate, orientation = 'horizontal' }) {
  return (
    <ul className={cx(styles.list, orientation === 'vertical' && styles.vertical)} role="list">
      {items.map((item) => {
        const isActive = onHome && activeId === item.id;
        const linkProps = {
          className: cx(styles.link, isActive && styles.active),
          'aria-current': isActive ? 'location' : undefined,
          onClick: onNavigate,
        };

        return (
          <li key={item.id}>
            {onHome ? (
              <a href={`#${item.id}`} {...linkProps}>
                {item.label}
              </a>
            ) : (
              <Link to={`/#${item.id}`} {...linkProps}>
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
