import { cx } from '../../../utils/cx';
import Icon from '../../ui/Icon/Icon';
import FeatureVisual from './FeatureVisual';
import styles from './FeatureBlock.module.scss';

/** One feature: copy on one side, illustration on the other. */
export default function FeatureBlock({ feature, reverse = false }) {
  return (
    <article className={cx(styles.block, reverse && styles.reverse)}>
      <div className={styles.copy}>
        <h3 className={styles.title}>{feature.title}</h3>
        <p className={styles.body}>{feature.body}</p>
        <ul className={styles.points} role="list">
          {feature.points.map((point) => (
            <li key={point} className={styles.point}>
              <Icon name="check" size={18} className={styles.check} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.visual}>
        <FeatureVisual variant={feature.visual} />
      </div>
    </article>
  );
}
