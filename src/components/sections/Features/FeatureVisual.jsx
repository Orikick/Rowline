import { cx } from '../../../utils/cx';
import Icon from '../../ui/Icon/Icon';
import styles from './FeatureVisual.module.scss';

/*
 * Small product illustrations built from HTML and CSS.
 * They repeat what the copy next to them says, so they are hidden
 * from assistive technology with aria-hidden.
 */

const boardLanes = [
  { title: 'Backlog', cards: ['Client kickoff notes', 'Draft homepage copy'] },
  { title: 'Design review', limit: '3 of 3', cards: ['Pricing page', 'Email header', 'App icons'] },
  { title: 'Waiting on client', cards: ['Logo files'] },
];

function BoardVisual() {
  return (
    <div className={styles.board}>
      {boardLanes.map((lane) => (
        <div key={lane.title} className={styles.boardLane}>
          <p className={styles.boardLaneTitle}>
            <span>{lane.title}</span>
            {lane.limit && <span className={styles.limit}>{lane.limit}</span>}
          </p>
          {lane.cards.map((card) => (
            <p key={card} className={styles.boardCard}>
              {card}
            </p>
          ))}
        </div>
      ))}
      <p className={cx(styles.boardCard, styles.dragged)}>Onboarding flow</p>
    </div>
  );
}

const workload = [
  { name: 'Hannah', initials: 'HB', hours: 24 },
  { name: 'Daniel', initials: 'DM', hours: 38 },
  { name: 'Sofia', initials: 'SL', hours: 30 },
  { name: 'Amir', initials: 'AK', hours: 12 },
];
const CAPACITY = 32;

function WorkloadVisual() {
  return (
    <div className={styles.workload}>
      <p className={styles.panelTitle}>Workload, this week</p>
      {workload.map((person) => {
        const over = person.hours > CAPACITY;
        return (
          <div key={person.name} className={styles.person}>
            <span className={styles.initials}>{person.initials}</span>
            <span className={styles.personName}>{person.name}</span>
            <span className={styles.track}>
              <span
                className={cx(styles.fill, over && styles.over)}
                style={{ width: `${Math.min(100, (person.hours / CAPACITY) * 100)}%` }}
              />
            </span>
            <span className={cx(styles.hours, over && styles.hoursOver)}>
              {person.hours} / {CAPACITY} h
            </span>
          </div>
        );
      })}
    </div>
  );
}

const digest = [
  { icon: 'check', tone: 'shipped', text: '6 tasks shipped' },
  { icon: 'arrow', tone: 'moved', text: '3 tasks moved to review' },
  { icon: 'flag', tone: 'blocked', text: '1 task blocked: waiting on legal copy' },
];

function DigestVisual() {
  return (
    <div className={styles.digest}>
      <div className={styles.digestHeader}>
        <span className={styles.digestIcon}>
          <Icon name="mail" size={18} />
        </span>
        <div>
          <p className={styles.panelTitle}>Friday digest</p>
          <p className={styles.digestMeta}>Spring launch, week 14</p>
        </div>
      </div>
      {digest.map((row) => (
        <p key={row.text} className={styles.digestRow}>
          <span className={cx(styles.digestBadge, styles[row.tone])}>
            <Icon name={row.icon} size={14} />
          </span>
          {row.text}
        </p>
      ))}
    </div>
  );
}

const visuals = {
  board: BoardVisual,
  workload: WorkloadVisual,
  digest: DigestVisual,
};

export default function FeatureVisual({ variant }) {
  const Visual = visuals[variant];
  if (!Visual) return null;

  return (
    <div className={styles.frame} aria-hidden="true">
      <Visual />
    </div>
  );
}
