import { useEffect, useState } from 'react';
import icon from '../../../assets/icon-def.jpg';
import { Password } from '../types';
import AuthenticatedTemplate from '../components/AuthenticatedTemplate';
import { getPasswordValidity } from '../hooks/usePasswordValidation';

export default function HomePage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [selectedPasswordID, setSelectedPasswordID] = useState<number>();
  useEffect(() => {
    window.electron.ipcRenderer!.once('db-get-records', (ps) => {
      setPasswords(ps as Password[]);
    });
    window.electron.ipcRenderer!.sendMessage('db-get-records');
  }, []);
  const handleItemMouseEnter = (id: number) => {
    setSelectedPasswordID(id);
  };
  const handleItemMouseLeave = () => {
    setSelectedPasswordID(undefined);
  };
  const handleItemClick = (value: string) => {
    navigator.clipboard.writeText(value);
  };
  return (
    <AuthenticatedTemplate>
      {passwords !== undefined && passwords.length > 0 ? (
        <>
          <p className="font-emph text-xl sticky">Home</p>
          <hr className="dark:border-zinc-700" />
          <p className="text-zinc-700 dark:text-zinc-400 text-sm">
            *Hover to show password, click to copy to clipboard.
          </p>
          <div className="flex flex-col space-y-2">
            {passwords.map((p) => {
              const pv = getPasswordValidity(p.value);
              return (
                <button
                  type="button"
                  key={p.id}
                  className={`p-4 text-left rounded-xl border border-transparent ${pv.length > 3 ? 'dark:border-red-900 bg-red-50 border-red-600 dark:bg-red-600/20' : ''} ${pv.length <= 3 && pv.length > 0 ? 'bg-yellow-50 dark:bg-yellow-600/20 border-yellow-500 dark:border-yellow-800' : ''}`}
                  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  onMouseEnter={() => handleItemMouseEnter(p.id)}
                  onMouseLeave={() => handleItemMouseLeave()}
                  onClick={() => handleItemClick(p.value)}
                >
                  <p className="text-xl font-semibold">{p.key}</p>
                  <p className="font-semibold">{p.domain}</p>
                  <p className="text-sm">
                    Created On:{' '}
                    <span className="font-bold">
                      {p.createdAt.toLocaleDateString()}
                    </span>
                  </p>
                  <p
                    className={`${selectedPasswordID === p.id ? 'h-6' : 'h-0'} overflow-hidden transition-all`}
                  >
                    {p.value}
                  </p>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="self-center my-auto flex flex-col items-center">
          <img
            src={icon}
            alt=""
            className="overflow-hidden rounded-xl max-h-[30%] mb-[5%]"
          />
          <p className="text-3xl font-emph">Welcome To PassVault</p>
          <p className="text-xl text-center">
            Add a new or existing password to get started...
          </p>
        </div>
      )}
    </AuthenticatedTemplate>
  );
}
