import React, { createContext, useContext, useEffect, useState } from 'react';

type AppTheme = 'dark' | 'light';

type ThemeContext = {
  currentTheme: AppTheme;
  setTheme?: (theme?: AppTheme) => AppTheme;
  getTheme?: () => AppTheme;
};

export const themeContext = createContext<ThemeContext>({
  currentTheme: 'light',
  setTheme: undefined,
  getTheme: undefined,
});

export function useThemeContext(): ThemeContext {
  return useContext(themeContext);
}

type ProvideThemeContextProps = {
  children: React.ReactNode;
};

function useProvideThemeContext() {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(
    (localStorage.getItem('app-theme') as AppTheme) ?? 'light',
  );

  const getTheme = () =>
    (localStorage.getItem('app-theme') as AppTheme) ?? 'light';

  const setTheme = (theme?: AppTheme) => {
    let action: 'add' | 'remove' | 'toggle' = 'toggle';
    if (theme) action = theme === 'dark' ? 'add' : 'remove';
    document.body.classList[action]('dark');
    const t = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('app-theme', t);
    setCurrentTheme(t);
    return t;
  };

  return {
    currentTheme,
    getTheme,
    setTheme,
  };
}

export default function ProvideThemeContext({
  children,
}: ProvideThemeContextProps) {
  const theme = useProvideThemeContext();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (!isInitialized) {
      theme.setTheme(theme.getTheme());
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
}
