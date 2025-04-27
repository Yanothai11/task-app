{/*import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;*/}


{/*import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;*/}



import React from 'react';
import { Navigate } from 'react-router-dom';

// สมมุติว่า isAuthenticated เป็นฟังก์ชันที่ตรวจสอบการล็อกอิน
const isAuthenticated = () => !!localStorage.getItem('token'); // ใช้ token ใน localStorage

// PrivateRoute component
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;






