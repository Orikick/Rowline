import { useState } from 'react';
import { fetchPlans } from '../../../data/api';
import { billingOptions } from '../../../data/pricing';
import { useAsyncData } from '../../../hooks/useAsyncData';
import BillingToggle from '../../ui/BillingToggle/BillingToggle';
import Button from '../../ui/Button/Button';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import Skeleton from '../../ui/Skeleton/Skeleton';
import StatusMessage from '../../ui/StatusMessage/StatusMessage';
import PricingCard from './PricingCard';
import styles from './Pricing.module.scss';

function PricingSkeleton() {
  return (
    <>
      <p className="visually-hidden" role="status">
        Loading plans…
      </p>
      <div className={styles.grid} aria-hidden="true">
        {[0, 1, 2].map((key) => (
          <div key={key} className={styles.skeletonCard}>
            <Skeleton width="40%" height="1.5rem" />
            <Skeleton width="80%" />
            <Skeleton width="55%" height="3rem" />
            <Skeleton height="3rem" />
            <Skeleton width="90%" />
            <Skeleton width="70%" />
            <Skeleton width="80%" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const { status, data: plans, retry } = useAsyncData(fetchPlans);

  return (
    <Section id="pricing" labelledBy="pricing-title">
      <div className={styles.header}>
        <SectionHeading
          id="pricing-title"
          title="Pay per member, not per project"
          intro="Every plan includes unlimited tasks and comments. Upgrade or downgrade whenever your team changes."
          className={styles.heading}
        />
        <BillingToggle
          legend="Billing period"
          options={billingOptions}
          value={billing}
          onChange={setBilling}
        />
      </div>

      <p className="visually-hidden" aria-live="polite">
        {billing === 'yearly' ? 'Showing yearly prices.' : 'Showing monthly prices.'}
      </p>

      {status === 'loading' && <PricingSkeleton />}

      {status === 'error' && (
        <StatusMessage
          tone="error"
          title="Plans didn’t load"
          action={
            <Button variant="secondary" size="sm" onClick={retry}>
              Try again
            </Button>
          }
        >
          Check your connection and try again. If it keeps happening, email
          hello@rowline.example and we’ll send you the price list.
        </StatusMessage>
      )}

      {status === 'empty' && (
        <StatusMessage
          title="No plans to show right now"
          action={
            <Button href="#contact" variant="secondary" size="sm">
              Ask for a quote
            </Button>
          }
        >
          We’re updating our plans. Send us your team size and we’ll reply with a quote.
        </StatusMessage>
      )}

      {status === 'success' && (
        <ul className={styles.grid} role="list">
          {plans.map((plan, index) => (
            <Reveal as="li" key={plan.id} className={styles.item} delay={index * 0.08}>
              <PricingCard plan={plan} billing={billing} />
            </Reveal>
          ))}
        </ul>
      )}

      <p className={styles.footnote}>
        Prices in US dollars, excluding VAT. Nonprofits and schools get 50% off: mention it in
        the form below.
      </p>
    </Section>
  );
}
