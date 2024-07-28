import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [passKeyInputValue, setPassKeyInputValue] = useState<string>('');
  const handleCancelButtonClick = () => {
    setPassKeyInputValue('');
  };
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center from-blue-500 to-violet-600 bg-gradient-to-br">
      <div className="flex flex-col w-[20%] min-w-[400px] px-12 py-10 rounded-xl bg-white/90 shadow-2xl">
        <p className="font-emph text-2xl text-center">Sign In</p>
        <hr className="border-b w-full" />
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Enter passkey</p>
          <input
            id="passkey-input"
            type="password"
            className="border-2 border-slate-300 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1 w-full"
            value={passKeyInputValue}
            onChange={(e) => setPassKeyInputValue(e.target.value)}
          />
        </label>
        <div className="self-end flex space-x-2">
          <button
            className="self-end flex items-center px-4 py-1 rounded border-2 border-slate-200 text-lg"
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
