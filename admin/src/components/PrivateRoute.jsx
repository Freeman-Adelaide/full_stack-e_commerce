// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('adminToken');

  return token ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
