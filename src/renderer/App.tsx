// import { useCallback, useMemo, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import ProvideAuthContext from './contexts/AuthContext';
import Appbar from './components/Appbar';
import NewPasswordPage from './components/NewPasswordPage';

export default function App() {
  return (
    <ProvideAuthContext>
      <Router>
        <div className="h-[100dvh] w-[100dvw] flex flex-col items-stretch overflow-hidden">
          <Appbar />
          <div className="flex flex-grow">
            <div className="flex-grow h-[calc(100dvh-3rem)] overflow-y-auto overflow-x-hidden flex flex-col p-10 space-y-2">
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/new-password"
                  element={<NewPasswordPage isExisting={false} />}
                />
                <Route
                  path="/add-existing-password"
                  element={<NewPasswordPage isExisting />}
                />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ProvideAuthContext>
  );
}
