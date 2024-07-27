// import { useCallback, useMemo, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import ProvideAuthContext from './contexts/AuthContext';

export default function App() {
  return (
    <ProvideAuthContext>
      <div className="h-[100dvh] w-[100dvw]">
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </ProvideAuthContext>
  );
}
