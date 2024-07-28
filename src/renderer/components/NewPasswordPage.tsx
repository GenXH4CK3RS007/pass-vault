import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedTemplate from './AuthenticatedTemplate';
import usePasswordValidation from '../hooks/usePasswordValidation';

type NewPasswordPageProps = {
  isExisting: boolean;
};

export default function NewPasswordPage({ isExisting }: NewPasswordPageProps) {
  const navigate = useNavigate();
  const [nameInputValue, setNameInputValue] = useState<string>();
  const [passwordInputValue, setPasswordInputValue] = useState<string>();
  const passwordValidityParams = usePasswordValidation(
    passwordInputValue ?? '',
  );
  const handleCancelButtonClick = () => {
    setNameInputValue('');
    setPasswordInputValue('');
  };
  const handleAddButtonClick = () => {
    if (nameInputValue === '' || passwordInputValue === '') return;
    window.electron.ipcRenderer.once('db-new-password', (res) => {
      if (res) {
        navigate('/');
      }
    });
    window.electron.ipcRenderer.sendMessage(
      'db-new-password',
      nameInputValue,
      passwordInputValue,
    );
  };

  return (
    <AuthenticatedTemplate>
      <>
        <p className="font-emph text-xl sticky">New Password</p>
        <hr />
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Name</p>
          <input
            id="name-input"
            type="text"
            className="border-2 border-slate-300 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1  min-w-full md:min-w-[300px]"
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
          <p className="text-xs text-red-500">
            {nameInputValue === undefined || nameInputValue?.length === 0
              ? 'Name is required'
              : ''}
          </p>
        </label>
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Password</p>
          <input
            id="password-input"
            type="password"
            className="border-2 border-slate-300 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1  min-w-full md:min-w-[300px]"
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
          />
          {!isExisting ? (
            <p className="text-xs font-semibold">
              A strong password should contain:
            </p>
          ) : (
            ''
          )}
          <ul className="text-xs text-red-500 px-1">
            {!isExisting
              ? passwordValidityParams.map((vp) => <li>{vp}</li>)
              : ''}
            {isExisting &&
            (passwordInputValue === undefined ||
              passwordInputValue.length === 0)
              ? 'Password is required'
              : ''}
          </ul>
        </label>
        <div className="md:self-start self-end flex space-x-2">
          <button
            className="self-end flex items-center px-4 py-1 rounded border-2 border-slate-200 text-lg"
            type="button"
            onClick={handleCancelButtonClick}
          >
            <p>Cancel</p>
          </button>
          <button
            className="flex items-center px-4 py-1 rounded space-x-1 bg-blue-600 text-white text-lg font-semibold disabled:opacity-30 "
            type="button"
            disabled={
              (!isExisting && passwordValidityParams.length > 0) ||
              nameInputValue === undefined ||
              nameInputValue?.length === 0 ||
              passwordInputValue === undefined ||
              passwordInputValue?.length === 0
            }
            onClick={handleAddButtonClick}
          >
            <p>Add</p>
            <span className="material-symbols-rounded">add</span>
          </button>
        </div>
      </>
    </AuthenticatedTemplate>
  );
}
