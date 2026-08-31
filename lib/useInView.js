'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView(options = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const threshold = typeof options === 'number' ? options : (options?.threshold ?? 0.15);
  const rootMargin = typeof options === 'object' && options?.rootMargin ? options.rootMargin : '200px 0px 200px 0px';
  const once = typeof options === 'object' && options?.once !== undefined ? options.once : true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            obs.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}