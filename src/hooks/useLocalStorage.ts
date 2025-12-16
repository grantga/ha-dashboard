import { useState, useEffect } from 'react';

// A small, safe localStorage hook with lazy initialization and JSON serialization.
export default function useLocalStorage<T>(key: string, initial: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return typeof initial === 'function' ? (initial as () => T)() : initial;
      }
      const raw = window.localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw) as T;
    } catch {
      // ignore and fall back to initial
    }
    return typeof initial === 'function' ? (initial as () => T)() : initial;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write failures (e.g., storage disabled)
    }
  }, [key, state]);

  return [state, setState] as const;
}
