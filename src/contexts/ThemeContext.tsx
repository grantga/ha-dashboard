import { createContext } from 'react';

type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext({
  mode: 'dark' as ThemeMode,
  toggleTheme: () => {},
});

export type { ThemeMode };
