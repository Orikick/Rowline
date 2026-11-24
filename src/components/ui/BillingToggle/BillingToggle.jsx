import { useId } from 'react';
import { cx } from '../../../utils/cx';
import styles from './BillingToggle.module.scss';

/**
 * Segmented control built on native radio buttons, so arrow keys,
 * form semantics and screen reader announcements work without extra code.
 *
 * options: [{ value, label, note? }]
 */
export default function BillingToggle({ legend, options, value, onChange }) {
  const name = useId();

  return (
    <fieldset className={styles.group}>
      <legend className="visually-hidden">{legend}</legend>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label key={option.value} className={cx(styles.option, selected && styles.selected)}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
            {option.note && <span className={styles.note}>{option.note}</span>}
          </label>
        );
      })}
    </fieldset>
  );
}
