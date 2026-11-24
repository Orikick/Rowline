import { fetchFaqs } from '../../../data/api';
import { contactDetails } from '../../../data/navigation';
import { useAsyncData } from '../../../hooks/useAsyncData';
import Accordion from '../../ui/Accordion/Accordion';
import Button from '../../ui/Button/Button';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import Skeleton from '../../ui/Skeleton/Skeleton';
import StatusMessage from '../../ui/StatusMessage/StatusMessage';
import styles from './Faq.module.scss';

function FaqSkeleton() {
  return (
    <>
      <p className="visually-hidden" role="status">
        Loading questions…
      </p>
      <div className={styles.skeleton} aria-hidden="true">
        {['80%', '65%', '75%', '55%', '70%'].map((width) => (
          <div key={width} className={styles.skeletonRow}>
            <Skeleton width={width} height="1.25rem" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function Faq() {
  const { status, data: faqs, retry } = useAsyncData(fetchFaqs);

  return (
    <Section id="faq" labelledBy="faq-title">
      <div className={styles.layout}>
        <Reveal className={styles.aside}>
          <SectionHeading
            id="faq-title"
            title="Questions teams ask before they switch"
            intro="Can’t find your answer here? Write to us and a person on the team will reply."
            className={styles.heading}
          />
          <a className={styles.mail} href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
          </a>
        </Reveal>

        <div className={styles.content}>
          {status === 'loading' && <FaqSkeleton />}

          {status === 'error' && (
            <StatusMessage
              tone="error"
              title="Questions didn’t load"
              action={
                <Button variant="secondary" size="sm" onClick={retry}>
                  Try again
                </Button>
              }
            >
              Check your connection and try again, or email us your question.
            </StatusMessage>
          )}

          {status === 'empty' && (
            <StatusMessage
              title="No questions here yet"
              action={
                <Button href="#contact" variant="secondary" size="sm">
                  Ask a question
                </Button>
              }
            >
              Send us your question with the form below and we’ll reply within one working day.
            </StatusMessage>
          )}

          {status === 'success' && <Accordion items={faqs} headingLevel={3} />}
        </div>
      </div>
    </Section>
  );
}
