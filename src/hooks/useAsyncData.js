import { useCallback, useEffect, useState } from 'react';

const LOADING = { status: 'loading', data: null, error: null };

/**
 * Runs an async `fetcher` and tracks its state.
 *
 * status is one of: 'loading' | 'success' | 'empty' | 'error'
 * `retry()` runs the fetcher again and passes it the attempt number.
 *
 * `fetcher` must be a stable reference (module-level or memoised).
 */
export function useAsyncData(fetcher) {
  const [state, setState] = useState(LOADING);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    fetcher({ attempt })
      .then((data) => {
        if (ignore) return;
        const isEmpty = data == null || (Array.isArray(data) && data.length === 0);
        setState({ status: isEmpty ? 'empty' : 'success', data, error: null });
      })
      .catch((error) => {
        if (ignore) return;
        setState({ status: 'error', data: null, error });
      });

    // Ignore the response if the component unmounts or a newer request starts.
    return () => {
      ignore = true;
    };
  }, [fetcher, attempt]);

  const retry = useCallback(() => {
    setState(LOADING);
    setAttempt((current) => current + 1);
  }, []);

  return { ...state, retry };
}
