
import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export const useTheme = () => {
  const { state, setTheme } = useApp();

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (theme: string) => {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    };

    if (state.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);
    } else {
      applyTheme(state.theme);
    }
  }, [state.theme]);

  return {
    theme: state.theme,
    setTheme,
    isDark: state.theme === 'dark' || (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
};
