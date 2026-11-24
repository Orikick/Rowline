import { useEffect } from 'react';
import Button from '../components/ui/Button/Button';
import Container from '../components/ui/Container/Container';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  useDocumentTitle('Page not found | Rowline');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page has drifted out of its lane</h1>
      <p className={styles.body}>
        The link may be out of date, or the address may have a typo. Head back to the home page to
        find what you need.
      </p>
      <div className={styles.actions}>
        <Button to="/">Back to the home page</Button>
        <Button to="/#contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
