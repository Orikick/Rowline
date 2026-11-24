import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'rowline-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const THEME_COLORS = { light: '#f5f8f6', dark: '#0b1a18' };

function readSavedTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * Light/dark theme.
 * - Starts from the saved choice, or the system preference if nothing is saved.
 * - Follows system changes until the visitor picks a theme themselves.
 * - Saves the choice in localStorage only when the visitor toggles it.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => readSavedTheme() ?? getSystemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_QUERY);
    const handleChange = (event) => {
      if (!readSavedTheme()) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage is unavailable: the theme still changes for this visit. */
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
}
