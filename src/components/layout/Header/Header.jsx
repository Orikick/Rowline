import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { navigation } from '../../../data/navigation';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { useTheme } from '../../../hooks/useTheme';
import { cx } from '../../../utils/cx';
import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import Icon from '../../ui/Icon/Icon';
import Logo from '../../ui/Logo/Logo';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import MobileMenu from '../MobileMenu/MobileMenu';
import NavLinks from '../NavLinks/NavLinks';
import styles from './Header.module.scss';

const MENU_ID = 'mobile-menu';
const SECTION_IDS = navigation.map((item) => item.id);
const NO_SECTIONS = [];

/** Elements inside `container` that can currently receive keyboard focus. */
function getFocusable(container) {
  return Array.from(container.querySelectorAll('a[href], button:not([disabled])')).filter(
    (element) => element.getClientRects().length > 0,
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const burgerRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 64em)');
  const activeId = useScrollSpy(onHome ? SECTION_IDS : NO_SECTIONS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useLockBodyScroll(menuOpen);

  // Hide the page behind the open menu from keyboard and screen reader users.
  useEffect(() => {
    const background = document.querySelectorAll('#main, footer');
    background.forEach((element) => {
      element.inert = menuOpen;
    });
    return () => background.forEach((element) => {
      element.inert = false;
    });
  }, [menuOpen]);

  // The burger menu only exists below the desktop breakpoint.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  // Close the menu after navigating to another page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Show a divider once the page has scrolled under the header.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // While the menu is open: Escape closes it and Tab stays inside the header.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable(headerRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (!headerRef.current.contains(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLogoClick = () => {
    closeMenu();
    if (onHome) window.scrollTo({ top: 0 });
  };

  const demoLink = onHome ? { href: '#contact' } : { to: '/#contact' };

  return (
    <header
      ref={headerRef}
      className={cx(styles.header, scrolled && styles.scrolled, menuOpen && styles.menuOpen)}
    >
      <Container className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Rowline home" onClick={handleLogoClick}>
          <Logo />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <NavLinks items={navigation} activeId={activeId} onHome={onHome} />
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <span className={styles.cta}>
            <Button {...demoLink} size="sm">
              Book a demo
            </Button>
          </span>
          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </Container>

      <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        items={navigation}
        activeId={activeId}
        onHome={onHome}
        onNavigate={closeMenu}
      />
    </header>
  );
}
