import Icon from '../Icon/Icon';
import styles from './ThemeToggle.module.scss';

/** Switches between the light and dark theme. The label names the action. */
export default function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} theme`;

  return (
    <button type="button" className={styles.toggle} onClick={onToggle} aria-label={label} title={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
