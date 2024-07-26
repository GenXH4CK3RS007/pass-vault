import { useEffect, useState } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';

export default function App() {
  return (
    <div className="h-[100dvh] w-[100dvw]">
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={<AuthPage onSubmit={(e) => console.log(e)} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
