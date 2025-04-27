import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token'); 

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;






