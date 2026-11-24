import { m, useReducedMotion } from 'motion/react';

const EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Visitors who prefer reduced motion get the content with no animation at all.
 *
 * `as` can be any HTML tag name, so list items and articles keep their semantics.
 */
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
