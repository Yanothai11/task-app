import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;





