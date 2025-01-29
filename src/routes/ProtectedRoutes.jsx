import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ token }) => {
  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="login" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export const PublicRoute = ({ token }) => {
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
