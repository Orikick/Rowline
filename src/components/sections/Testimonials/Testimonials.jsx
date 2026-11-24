import { fetchTestimonials } from '../../../data/api';
import { useAsyncData } from '../../../hooks/useAsyncData';
import Button from '../../ui/Button/Button';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import Skeleton from '../../ui/Skeleton/Skeleton';
import StatusMessage from '../../ui/StatusMessage/StatusMessage';
import TestimonialCard from './TestimonialCard';
import styles from './Testimonials.module.scss';

function TestimonialsSkeleton() {
  return (
    <>
      <p className="visually-hidden" role="status">
        Loading customer stories…
      </p>
      <div className={styles.grid} aria-hidden="true">
        {[0, 1, 2].map((key) => (
          <div key={key} className={styles.skeletonCard}>
            <Skeleton height="1.25rem" />
            <Skeleton height="1.25rem" width="85%" />
            <Skeleton height="1.25rem" width="60%" />
            <div className={styles.skeletonPerson}>
              <Skeleton width="3rem" height="3rem" className={styles.skeletonAvatar} />
              <Skeleton width="9rem" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Testimonials() {
  const { status, data: testimonials, retry } = useAsyncData(fetchTestimonials);

  return (
    <Section id="testimonials" labelledBy="testimonials-title" tone="alt">
      <Reveal>
        <SectionHeading
          id="testimonials-title"
          title="Fewer meetings, fewer surprises"
          intro="Here is what changed for three teams in their first month on Rowline."
        />
      </Reveal>

      {status === 'loading' && <TestimonialsSkeleton />}

      {status === 'error' && (
        <StatusMessage
          tone="error"
          title="Customer stories didn’t load"
          action={
            <Button variant="secondary" size="sm" onClick={retry}>
              Try again
            </Button>
          }
        >
          Check your connection and try again.
        </StatusMessage>
      )}

      {status === 'empty' && (
        <StatusMessage title="No customer stories yet">
          We’re collecting stories from our newest teams. Book a demo and we’ll put you in touch
          with a customer in your industry.
        </StatusMessage>
      )}

      {status === 'success' && (
        <ul className={styles.grid} role="list">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.id}
              className={testimonial.featured ? styles.featuredItem : styles.item}
              delay={index * 0.08}
            >
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
