// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) return null;

  // ✅ Allow if logged in
  if (user || isLoggedIn()) return children;

  // ❌ Redirect if not logged in
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
