import { m, useReducedMotion } from 'motion/react';
import { cx } from '../../../utils/cx';
import Icon from '../../ui/Icon/Icon';
import styles from './ProductMockup.module.scss';

/** Sample board content. Built in HTML and CSS so it stays sharp in both themes. */
const lanes = [
  {
    id: 'todo',
    title: 'To do',
    tasks: [
      { id: 't1', title: 'Write the launch email', team: 'Marketing', tone: 'accent', owner: 'HB', due: 'Thu' },
      { id: 't2', title: 'Update the pricing page', team: 'Web', tone: 'primary', owner: 'JM', due: 'Fri' },
      { id: 't3', title: 'Record the demo video', team: 'Marketing', tone: 'accent', owner: 'SL', due: 'Mon' },
    ],
  },
  {
    id: 'doing',
    title: 'In progress',
    tasks: [
      { id: 't4', title: 'Test checkout on mobile', team: 'Engineering', tone: 'coral', owner: 'DM', due: 'Today' },
      { id: 't5', title: 'Design the onboarding checklist', team: 'Design', tone: 'primary', owner: 'AK', due: 'Wed' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 't6', title: 'Set up analytics events', team: 'Engineering', tone: 'coral', owner: 'DM' },
      { id: 't7', title: 'Brief the support team', team: 'Operations', tone: 'accent', owner: 'SL' },
      { id: 't8', title: 'Finalise release notes', team: 'Web', tone: 'primary', owner: 'JM' },
    ],
  },
];

const team = ['HB', 'DM', 'SL', 'AK'];

const EASE_OUT = [0.22, 1, 0.36, 1];

const boardVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const progressVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.5 } },
};

export default function ProductMockup({ className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={cx(styles.mockup, className)}
      role="img"
      aria-label="The Rowline board for a project called Spring launch. Tasks sit in three lanes: To do, In progress and Done. 8 of 14 tasks are done."
      variants={boardVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="show"
    >
      <div className={styles.toolbar}>
        <div className={styles.project}>
          <p className={styles.projectName}>Spring launch</p>
          <p className={styles.projectMeta}>8 of 14 tasks done</p>
        </div>
        <div className={styles.progress}>
          <m.span className={styles.progressFill} variants={progressVariants} />
        </div>
        <ul className={styles.team}>
          {team.map((initials) => (
            <li key={initials} className={styles.avatar}>
              {initials}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.lanes}>
        {lanes.map((lane) => (
          <div key={lane.id} className={cx(styles.lane, styles[lane.id])}>
            <p className={styles.laneTitle}>
              {lane.title}
              <span className={styles.count}>{lane.tasks.length}</span>
            </p>
            <ul className={styles.cards}>
              {lane.tasks.map((task) => (
                <m.li key={task.id} className={styles.card} variants={cardVariants}>
                  <p className={styles.cardTitle}>{task.title}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.tag}>
                      <span className={cx(styles.dot, styles[task.tone])} />
                      {task.team}
                    </span>
                    <span className={styles.owner}>
                      {task.due ? (
                        <span className={styles.due}>{task.due}</span>
                      ) : (
                        <Icon name="check" size={14} className={styles.doneIcon} />
                      )}
                      <span className={styles.avatar}>{task.owner}</span>
                    </span>
                  </div>
                </m.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </m.div>
  );
}
