import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

type AuthenticatedTemplateProps = {
  children: React.ReactNode;
};

export default function AuthenticatedTemplate({
  children,
}: AuthenticatedTemplateProps) {
  const authContext = useAuthContext();
  return authContext.isAuthenticated ? children : <Navigate to="/auth" />;
}
