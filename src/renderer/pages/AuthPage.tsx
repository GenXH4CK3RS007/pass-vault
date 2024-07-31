import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import usePasswordValidation from '../hooks/usePasswordValidation';
import PasswordValidityIndicator from '../components/PasswordValidityIndicator';

export default function AuthPage() {
  const authContext = useAuthContext();
  const [passKeyInputValue, setPassKeyInputValue] = useState<string>('');
  const navigate = useNavigate();
  const passwordValidityParams = usePasswordValidation(passKeyInputValue ?? '');
  const [fileExists, setFileExists] = useState(false);
  const handleCancelButtonClick = () => {
    setPassKeyInputValue('');
  };
  useEffect(() => {
    window.electron.ipcRenderer.once('db-pre-init', (res: any) => {
      setFileExists(res);
    });
    window.electron.ipcRenderer.sendMessage('db-pre-init');
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center from-blue-500 to-violet-600 bg-gradient-to-br">
      <div className="flex flex-col w-[20%] min-w-[400px] px-12 py-10 rounded-xl bg-white/90 dark:bg-black/75 shadow-2xl">
        <p className="font-emph text-2xl text-center">Sign In</p>
        <hr className="border-b w-full dark:border-zinc-700" />
        {!fileExists ? (
          <p className="text-sm text-justify mt-[5%]">
            Welcome to PassVault, enter a passkey which will be used to encrypt
            stored data. Once set it cannot be changed. If passkey is forgotten,
            data will be redundant.
          </p>
        ) : (
          ''
        )}
        <label htmlFor="passkey-input" className="p-2 mb-[10%]">
          <p className="text-lg">Enter passkey</p>
          <input
            id="passkey-input"
            type="password"
            className="border-2 border-zinc-300 dark:border-zinc-500 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1 w-full"
            value={passKeyInputValue}
            onChange={(e) => setPassKeyInputValue(e.target.value)}
          />
          {!fileExists ? (
            <PasswordValidityIndicator params={passwordValidityParams} />
          ) : (
            ''
          )}
        </label>
        <div className="self-end flex space-x-2">
          <button
            className="self-end flex items-center px-4 py-1 rounded border-2 border-zinc-300 dark:border-zinc-500 text-lg"
            type="button"
            onClick={handleCancelButtonClick}
          >
            <p>Cancel</p>
          </button>
          <button
            className="flex items-center px-4 py-1 rounded space-x-1 bg-blue-600 text-white text-lg font-semibold"
            type="button"
            onClick={() => {
              authContext.login!(passKeyInputValue);
              navigate('/');
            }}
          >
            <p>Go</p>
            <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
