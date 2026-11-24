import { steps } from '../../../data/steps';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import styles from './HowItWorks.module.scss';

export default function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" tone="alt">
      <Reveal>
        <SectionHeading
          id="how-title"
          title="Up and running before lunch"
          intro="Most teams move their first project into Rowline in under an hour."
        />
      </Reveal>

      {/* An ordered list: the steps are a real sequence, so the numbers carry meaning. */}
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <Reveal as="li" key={step.id} className={styles.step} delay={index * 0.1}>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
