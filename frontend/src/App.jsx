// src/App.jsx
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/layouts/Layout"; // contains Header + Footer
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/Contactpage";

import Home from "../pages/Home";
import Learn from "../pages/Learn";
import CreateContent from "../pages/CreateContent";
import Posts from "../pages/Posts";

// Auth pages (no header/footer)
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
        <Routes>
          {/* ===== Auth routes (no header/footer) ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ===== Pages that use Layout (header/footer included) ===== */}
          <Route path="/" element={<Layout />}>
            {/* Landing is index under Layout */}
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact-us" element={<ContactPage />} />

            {/* Protected pages (still children of Layout so they include header/footer) */}
            <Route
              path="discover"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="learn"
              element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="read"
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* optional: catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
