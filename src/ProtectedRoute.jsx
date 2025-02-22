/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useContext(AuthContext);

  if (!token) {
    // If no token, redirect to login
    console.log(token)
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // If user doesn't have the required role, redirect to home or unauthorized page
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;