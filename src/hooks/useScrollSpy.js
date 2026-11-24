import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport,
 * or null when none of the given sections is there (for example, in the hero).
 *
 * `ids` must be a stable array reference.
 */
export function useScrollSpy(ids, rootMargin = '-45% 0px -50% 0px') {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (ids.length === 0 || !('IntersectionObserver' in window)) {
      setActiveId(null);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target;
          setActiveId((current) => {
            if (entry.isIntersecting) return id;
            return current === id ? null : current;
          });
        });
      },
      { rootMargin },
    );

    ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
