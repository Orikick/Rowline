import styles from './SkipLink.module.scss';

/** First focusable element on the page: lets keyboard users jump past the header. */
export default function SkipLink({ targetId = 'main' }) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      Skip to main content
    </a>
  );
}
