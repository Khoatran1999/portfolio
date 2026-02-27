import { useState, useEffect, useCallback } from 'react';

// Deduplicate scroll event listener — client-event-listeners
let listeners = 0;
const callbacks = new Set<(y: number) => void>();

function onScroll() {
  const y = window.scrollY;
  callbacks.forEach((cb) => cb(y));
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  const cb = useCallback((y: number) => setScrollY(y), []);

  useEffect(() => {
    callbacks.add(cb);
    if (listeners === 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    listeners++;

    return () => {
      callbacks.delete(cb);
      listeners--;
      if (listeners === 0) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [cb]);

  return scrollY;
}
