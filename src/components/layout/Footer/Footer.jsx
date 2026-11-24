import { Link, useLocation } from 'react-router';
import { contactDetails, footerColumns } from '../../../data/navigation';
import Container from '../../ui/Container/Container';
import Logo from '../../ui/Logo/Logo';
import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export default function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.blurb}>
              A shared task board for teams of 5 to 50. Plan the week, see who is working on what,
              and ship without status meetings.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.links} role="list">
                {column.links.map((link) => (
                  <li key={link.id}>
                    {onHome ? (
                      <a className={styles.link} href={`#${link.id}`}>
                        {link.label}
                      </a>
                    ) : (
                      <Link className={styles.link} to={`/#${link.id}`}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.contact}>
            <h2 className={styles.columnTitle}>Get in touch</h2>
            <ul className={styles.links} role="list">
              <li>
                <a className={styles.link} href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </li>
              <li className={styles.detail}>{contactDetails.hours}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Rowline Labs. All rights reserved.</p>
          <div className={styles.credits}>
            <p>
              Designed and developed by <span className={styles.author}>Orest Labiak</span>
            </p>
            <p>Rowline is a fictional product, built as a portfolio project. Photos from Unsplash.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
