import { useEffect, useState } from 'react';

export type PasswordInvalidityState =
  | 'A Length of Atleast 14'
  | 'An Uppercase Letter'
  | 'A Lowercase Letter'
  | 'A Number'
  | 'A Special Character';

const regexChecks: { [key in PasswordInvalidityState]: RegExp } = {
  'A Special Character': /[^A-Za-z0-9]/,
  'A Number': /[0-9]/,
  'A Lowercase Letter': /[a-z]/,
  'An Uppercase Letter': /[A-Z]/,
  'A Length of Atleast 14': /^.{14,}$/,
};

export function getPasswordValidity(password: string) {
  const params: PasswordInvalidityState[] = [];
  Object.keys(regexChecks).forEach((key) => {
    if (!regexChecks[key as PasswordInvalidityState].test(password))
      params.push(key as PasswordInvalidityState);
  });
  return params;
}

export default function usePasswordValidation(password: string) {
  const [validityParams, setValidityParams] = useState<
    PasswordInvalidityState[]
  >([]);
  useEffect(() => {
    setValidityParams(getPasswordValidity(password));
  }, [password]);
  return validityParams;
}
