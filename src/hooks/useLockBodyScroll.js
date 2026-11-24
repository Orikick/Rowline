import { useEffect } from 'react';

/** Stops the page behind an overlay from scrolling while `locked` is true. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
