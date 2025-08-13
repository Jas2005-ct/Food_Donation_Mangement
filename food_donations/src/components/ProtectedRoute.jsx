// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if the user is authenticated before rendering the protected route
/*const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('access_token');
  return token ? element : <Navigate to="/login" />;
};*/


const ProtectedRoute = ({ children, allowedUserType }) => {
  const userType = localStorage.getItem('user_type');

  if (!userType) {
    return <Navigate to="/login" />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default ProtectedRoute;
