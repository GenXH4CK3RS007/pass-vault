import React, { createContext, useContext, useState } from 'react';

type AppErrorLevel = 'info' | 'warn' | 'erro';
type AppError = {
  id: string;
  title: string;
  desc?: string;
  level: AppErrorLevel;
};

// type HandledAppError = AppError & {
//   isClosed: boolean;
// };

type ErrorContext = {
  errors: AppError[];
  logError?: (title: string, level: AppErrorLevel, desc?: string) => string;
  closeError?: (id: string) => void;
};

function generateRandomID() {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 12; i += 1) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
}

export const errorContext = createContext<ErrorContext>({
  errors: [],
  logError: undefined,
  closeError: undefined,
});

export function useErrorContext(): ErrorContext {
  return useContext(errorContext);
}

type ProvideErrorContextProps = {
  children: React.ReactNode;
};

function useProvideErrorContext() {
  const [errors, setErrors] = useState<AppError[]>([]);

  const logError = (
    title: string,
    level: AppErrorLevel = 'erro',
    desc: string | undefined = undefined,
  ) => {
    const id = generateRandomID();
    setErrors([...errors, { id, title, level, desc }]);
    return id;
  };

  const closeError = (id: string) => {
    setErrors(errors.filter((e) => e.id !== id));
  };

  return {
    errors,
    logError,
    closeError,
  };
}

export default function ProvideErrorContext({
  children,
}: ProvideErrorContextProps) {
  const auth = useProvideErrorContext();
  return <errorContext.Provider value={auth}>{children}</errorContext.Provider>;
}
