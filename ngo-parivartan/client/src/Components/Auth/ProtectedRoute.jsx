import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Retrieve user data and token from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');

  if (!userData || !token) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (requiredRole && userData.isAdmin !== true) {
    // If user does not have the required role, redirect to a 'Not Authorized' or Home page
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the correct role, render the protected component
  return children;
};

export default ProtectedRoute;
