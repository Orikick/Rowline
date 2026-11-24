import { useId } from 'react';
import { cx } from '../../../utils/cx';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import styles from './PricingCard.module.scss';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function priceNote(plan, billing) {
  const monthly = plan.price[billing];
  if (monthly === 0) return 'Free forever, no card needed';
  if (billing === 'yearly') return `Billed yearly, ${currency.format(monthly * 12)} per member`;
  return 'Billed monthly, cancel any time';
}

export default function PricingCard({ plan, billing }) {
  const titleId = useId();
  const monthly = plan.price[billing];
  const isFree = monthly === 0;

  return (
    <article className={cx(styles.card, plan.featured && styles.featured)} aria-labelledby={titleId}>
      <div className={styles.top}>
        <h3 id={titleId} className={styles.name}>
          {plan.name}
        </h3>
        {plan.featured && <p className={styles.badge}>Most teams pick this</p>}
      </div>
      <p className={styles.summary}>{plan.summary}</p>

      <p className={styles.price}>
        <span className={styles.amount}>{isFree ? '$0' : currency.format(monthly)}</span>
        <span className={styles.unit}>per member / month</span>
      </p>
      <p className={styles.note}>{priceNote(plan, billing)}</p>

      <Button
        href="#contact"
        variant={plan.featured ? 'inverse' : 'secondary'}
        full
        className={styles.cta}
        aria-label={`${plan.cta}: ${plan.name} plan`}
      >
        {plan.cta}
      </Button>

      <ul className={styles.features} role="list" aria-label={`What’s included in ${plan.name}`}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Icon name="check" size={18} className={styles.check} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
