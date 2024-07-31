import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedTemplate from '../components/AuthenticatedTemplate';
import usePasswordValidation from '../hooks/usePasswordValidation';
import PasswordValidityIndicator from '../components/PasswordValidityIndicator';

type NewPasswordPageProps = {
  isExisting: boolean;
};

export default function NewPasswordPage({ isExisting }: NewPasswordPageProps) {
  const navigate = useNavigate();
  const [nameInputValue, setNameInputValue] = useState<string>();
  const [domainInputValue, setDomainInputValue] = useState<string>();
  const [passwordInputValue, setPasswordInputValue] = useState<string>();
  const passwordValidityParams = usePasswordValidation(
    passwordInputValue ?? '',
  );
  const handleCancelButtonClick = () => {
    setNameInputValue('');
    setPasswordInputValue('');
  };
  const handleAddButtonClick = () => {
    if (
      nameInputValue === '' ||
      domainInputValue === '' ||
      passwordInputValue === ''
    )
      return;
    window.electron.ipcRenderer.once('db-new-password', (res) => {
      if (res) {
        navigate('/');
      }
    });
    window.electron.ipcRenderer.sendMessage('db-new-password', {
      key: nameInputValue,
      value: passwordInputValue,
      domain: domainInputValue,
    });
  };

  return (
    <AuthenticatedTemplate>
      <>
        <p className="font-emph text-xl sticky">
          {isExisting ? 'Add Existing' : 'New'} Password
        </p>
        <hr className="dark:border-zinc-700" />
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Name</p>
          <input
            id="name-input"
            type="text"
            className="border-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1  min-w-full md:min-w-[300px]"
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
          <p className="text-xs text-red-500 dark:text-red-600">
            {nameInputValue === undefined || nameInputValue?.length === 0
              ? 'Name is required'
              : ''}
          </p>
        </label>
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Domain</p>
          <input
            id="domain-input"
            type="text"
            className="border-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1  min-w-full md:min-w-[300px]"
            value={domainInputValue}
            onChange={(e) => setDomainInputValue(e.target.value)}
          />
          <p className="text-xs text-red-500 dark:text-red-600">
            {domainInputValue === undefined || domainInputValue?.length === 0
              ? 'Domain is required'
              : ''}
          </p>
        </label>
        <label htmlFor="passkey-input" className="p-2 mt-[10%] mb-[10%]">
          <p className="text-lg">Password</p>
          <input
            id="password-input"
            type="password"
            className="border-2 border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-blue-600 rounded-lg px-4 py-1  min-w-full md:min-w-[300px]"
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
          />
          {isExisting &&
          (passwordInputValue === undefined ||
            passwordInputValue.length === 0) ? (
            <p className="text-xs text-red-500 dark:text-red-600">
              {domainInputValue === undefined || domainInputValue?.length === 0
                ? 'Domain is required'
                : ''}
            </p>
          ) : (
            <PasswordValidityIndicator params={passwordValidityParams} />
          )}
        </label>
        <div className="md:self-start self-end flex space-x-2">
          <button
            className="self-end flex items-center px-4 py-1 rounded border-2 border-zinc-200 dark:border-zinc-700 s0 text-lg"
            type="button"
            onClick={handleCancelButtonClick}
          >
            <p>Cancel</p>
          </button>
          <button
            className="flex items-center px-4 py-1 rounded space-x-1 bg-blue-600 text-white text-lg font-semibold disabled:opacity-30"
            type="button"
            disabled={
              (!isExisting && passwordValidityParams.length > 0) ||
              nameInputValue === undefined ||
              nameInputValue?.length === 0 ||
              domainInputValue === undefined ||
              domainInputValue?.length === 0 ||
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
