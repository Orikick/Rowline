import { contactDetails } from '../../../data/navigation';
import Icon from '../../ui/Icon/Icon';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import ContactForm from './ContactForm';
import styles from './Contact.module.scss';

const details = [
  { icon: 'mail', label: 'Email', value: contactDetails.email, href: `mailto:${contactDetails.email}` },
  { icon: 'clock', label: 'Hours', value: contactDetails.hours },
  { icon: 'reply', label: 'Response time', value: contactDetails.response },
];

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" tone="alt">
      <div className={styles.layout}>
        <Reveal className={styles.intro}>
          <SectionHeading
            id="contact-title"
            title="See Rowline with your own projects"
            intro="Book a 30-minute demo. We’ll import one of your real projects and show you how your week would look on the board."
          />
          <dl className={styles.details}>
            {details.map((detail) => (
              <div key={detail.label} className={styles.detail}>
                <dt className={styles.term}>
                  <Icon name={detail.icon} size={18} />
                  {detail.label}
                </dt>
                <dd className={styles.value}>
                  {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className={styles.formCard} delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
