import { cx } from '../../../utils/cx';
import styles from './Container.module.scss';

/** Centres content and applies the page gutter. */
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cx(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
