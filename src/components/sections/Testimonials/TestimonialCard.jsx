import { useState } from 'react';
import { cx } from '../../../utils/cx';
import styles from './TestimonialCard.module.scss';

function initialsOf(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

export default function TestimonialCard({ testimonial }) {
  const { quote, name, role, company, photo, featured } = testimonial;
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <figure className={cx(styles.card, featured && styles.featured)}>
      <blockquote className={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <figcaption className={styles.person}>
        {photoFailed ? (
          <span className={styles.fallback} aria-hidden="true">
            {initialsOf(name)}
          </span>
        ) : (
          <img
            className={styles.photo}
            src={photo.src}
            srcSet={photo.srcSet}
            alt={`Portrait of ${name}`}
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
            onError={() => setPhotoFailed(true)}
          />
        )}
        <span>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>
            {role}, {company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
