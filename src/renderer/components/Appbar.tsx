import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/icon-hor-large.jpg';
import { useAuthContext } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';

const getMaterialSymbolFromTheme = (theme: 'light' | 'dark') => {
  return theme === 'light' ? 'wb_sunny' : 'nightlight';
};

export default function Appbar() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const theme = useThemeContext();

  const [themeToggleButtonSymbol, setThemeToggleButtonSymbol] = useState(
    getMaterialSymbolFromTheme(theme.getTheme!()),
  );

  return (
    <div className="flex items-center h-12 border-b px-4 space-x-1 dark:border-zinc-700">
      <button
        className="font-emph text-xl"
        type="button"
        onClick={() => navigate('/')}
      >
        <img
          src={icon}
          alt="app logo"
          className="overflow-hidden rounded h-8"
        />
      </button>
      <div className="flex-grow" />
      <button
        className="rounded px-2 py-1 border dark:border-zinc-700 flex items-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        type="button"
        onClick={() => {
          const t = theme.setTheme!();
          setThemeToggleButtonSymbol(getMaterialSymbolFromTheme(t));
        }}
      >
        <span className="material-symbols-rounded font-bold">
          {themeToggleButtonSymbol}
        </span>
      </button>
      <button
        className="rounded px-2 py-1 border dark:border-zinc-700 flex items-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        type="button"
        onClick={() => {
          navigate('/new-password');
        }}
      >
        <p>New</p>
        <span className="material-symbols-rounded font-bold">add</span>
      </button>
      <button
        className="rounded px-2 py-1 border dark:border-zinc-700 flex items-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        type="button"
        onClick={() => {
          navigate('/add-existing-password');
        }}
      >
        <p>Add Existing</p>
        <span className="material-symbols-rounded font-bold">library_add</span>
      </button>
      <button
        className="rounded px-2 py-1 border dark:border-zinc-700 flex items-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        type="button"
        onClick={() => {
          authContext.logout!();
        }}
      >
        <p>Sign Out</p>
        <span className="material-symbols-rounded font-bold">logout</span>
      </button>
    </div>
  );
}
