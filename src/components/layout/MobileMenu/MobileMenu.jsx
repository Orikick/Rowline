import Button from '../../ui/Button/Button';
import NavLinks from '../NavLinks/NavLinks';
import styles from './MobileMenu.module.scss';

/**
 * Full-height navigation panel for small screens.
 * The Header owns the open state, the Escape key and the focus trap;
 * this component only renders the panel.
 */
export default function MobileMenu({ id, open, items, activeId, onHome, onNavigate }) {
  const demoLink = onHome ? { href: '#contact' } : { to: '/#contact' };

  return (
    <div id={id} className={styles.menu} hidden={!open}>
      <nav aria-label="Mobile">
        <NavLinks
          items={items}
          activeId={activeId}
          onHome={onHome}
          onNavigate={onNavigate}
          orientation="vertical"
        />
      </nav>
      <div className={styles.cta}>
        <Button {...demoLink} full onClick={onNavigate}>
          Book a demo
        </Button>
      </div>
    </div>
  );
}
