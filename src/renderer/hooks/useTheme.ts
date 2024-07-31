import { useState } from 'react';

export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const storeTheme = (isDark: boolean) => {
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('app-theme', theme);
    setCurrentTheme(theme);
  };
  const getTheme = () => {
    const theme = localStorage.getItem('app-theme');
    return theme;
  };
  const toggleTheme = (op?: 'add' | 'remove') => {
    document.body.classList[op ?? 'toggle']('dark');
    const isSetToDark = getTheme();
    storeTheme(isSetToDark === 'dark');
    return isSetToDark;
  };
  const initTheme = () => {
    const theme = localStorage.getItem('app-theme');
    toggleTheme(theme === 'dark' ? 'add' : 'remove');
  };
  return { currentTheme, toggleTheme, initTheme, getTheme };
}
