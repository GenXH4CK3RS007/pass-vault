import { useEffect, useState } from 'react';
import { Password } from '../types';

export default function HomePage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.once('db-get-records', (ps) => {
      setPasswords(ps as Password[]);
    });
    window.electron.ipcRenderer.sendMessage('db-get-records');
  }, []);
  return (
    <div>
      <p className="font-emph">Home</p>
      <hr />
      <ul>
        {passwords.map((p) => {
          return (
            <li key={p.id}>
              <p>{p.key}</p>
              <p>{p.createdAt.toISOString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
