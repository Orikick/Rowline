import { useId, useState } from 'react';
import { cx } from '../../../utils/cx';
import Icon from '../Icon/Icon';
import styles from './Accordion.module.scss';

/**
 * Accessible accordion (WAI-ARIA disclosure pattern).
 * Each header is a real <button> inside a heading, so it works with
 * Enter, Space and screen reader heading navigation. Several panels can be open.
 *
 * items: [{ id, title, content }]
 */
export default function Accordion({ items, headingLevel = 3 }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(() => new Set());
  const Heading = `h${headingLevel}`;

  const toggle = (id) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className={cx(styles.item, isOpen && styles.open)}>
            <Heading className={styles.heading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <Icon name="chevron" className={styles.chevron} />
              </button>
            </Heading>
            <div id={panelId} className={styles.panel} role="region" aria-labelledby={triggerId}>
              <div className={styles.panelInner}>
                <p className={styles.content}>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
