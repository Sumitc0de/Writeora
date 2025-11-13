import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PageWrapper from "./components/transition/PageWrapper";
import FadeTransition from "./components/transition/FadeTransition";

import Layout from "./components/layouts/Layout";

import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/Contactpage";
import Home from "../pages/Home";
import Learn from "../pages/Learn";
import CreateContent from "../pages/CreateContent";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {/* Full screen fade transition */}
        <FadeTransition key={"glow-" + location.pathname} />

        <Routes location={location} key={location.pathname}>

          {/* AUTH (no layout) */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />

          <Route
            path="/signup"
            element={
              <PageWrapper>
                <Signup />
              </PageWrapper>
            }
          />

          {/* LAYOUT ROUTES */}
          <Route path="/" element={<Layout />}>
            
            {/* Public routes */}
            <Route
              index
              element={
                <PageWrapper>
                  <LandingPage />
                </PageWrapper>
              }
            />

            <Route
              path="about"
              element={
                <PageWrapper>
                  <AboutPage />
                </PageWrapper>
              }
            />

            <Route
              path="contact-us"
              element={
                <PageWrapper>
                  <ContactPage />
                </PageWrapper>
              }
            />

            {/* Protected */}
            <Route
              path="discover"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="learn"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Learn />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <CreateContent />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="post/:slug"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Posts />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <AppContent />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
