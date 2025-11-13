// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  // ⏳ While loading auth, show nothing but allow transitions to settle
  if (loading) {
    return <div className="min-h-screen bg-[#0F0D0A]" />; 
  }

  // 🔐 Allow when logged in
  if (user || isLoggedIn()) {
    return children;
  }

  // 🚫 Redirect user to login (with replace)
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
