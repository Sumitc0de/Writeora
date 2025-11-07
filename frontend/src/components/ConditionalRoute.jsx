// src/components/ConditionalRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ConditionalRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) return null; // ⏳ Wait for auth check

  // ✅ If token exists or user already loaded
  if (isLoggedIn() || user) {
    return <Navigate to="/discover" replace />;
  }

  // ❌ If not logged in
  return children;
};

export default ConditionalRoute;
