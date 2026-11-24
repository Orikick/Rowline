import { features } from '../../../data/features';
import Reveal from '../../ui/Reveal/Reveal';
import Section from '../../ui/Section/Section';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import FeatureBlock from './FeatureBlock';
import styles from './Features.module.scss';

export default function Features() {
  return (
    <Section id="features" labelledBy="features-title">
      <Reveal>
        <SectionHeading
          id="features-title"
          title="Three views that cover the whole week"
          intro="Plan the work on a board, balance it in the workload view, and report on it with the Friday digest."
        />
      </Reveal>

      <div className={styles.list}>
        {features.map((feature, index) => (
          <Reveal key={feature.id}>
            <FeatureBlock feature={feature} reverse={index % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
