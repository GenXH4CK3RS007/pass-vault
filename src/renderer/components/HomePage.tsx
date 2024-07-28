import { useEffect, useState } from 'react';
import { Password } from '../types';
import AuthenticatedTemplate from './AuthenticatedTemplate';
import { getPasswordValidity } from '../hooks/usePasswordValidation';

export default function HomePage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.once('db-get-records', (ps) => {
      setPasswords(ps as Password[]);
    });
    window.electron.ipcRenderer.sendMessage('db-get-records');
  }, []);
  return (
    <AuthenticatedTemplate>
      <>
        <p className="font-emph text-xl sticky">Home</p>
        <hr />
        <ul className="flex flex-col space-y-2">
          {passwords.map((p) => {
            const pv = getPasswordValidity(p.value);
            return (
              <li
                key={p.id}
                className={`p-4 rounded-xl border border-transparent ${pv.length > 3 ? 'bg-red-50 border-red-500' : ''} ${pv.length <= 3 && pv.length > 0 ? 'bg-yellow-50 border-yellow-500' : ''}`}
              >
                <p className="text-xl font-semibold">{p.key}</p>
                <p className="text-sm">
                  Created On:{' '}
                  <span className="font-bold">
                    {p.createdAt.toLocaleDateString()}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </>
    </AuthenticatedTemplate>
  );
}
