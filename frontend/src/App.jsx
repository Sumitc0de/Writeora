import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import PageWrapper from "./components/transition/PageWrapper";
import FadeTransition from "./components/transition/FadeTransition";

import Layout from "./components/layouts/Layout";

// Pages
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/Contactpage";
import Home from "../pages/Home";
import Learn from "../pages/Learn";
import CreateContent from "../pages/CreateContent";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Editor
import ContentEditor from "./components/contentEditor/ContentEditor";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <ScrollToTopButton />

      <AnimatePresence mode="wait">
        {/* Global fade effect */}
        <FadeTransition key={`fade-${location.pathname}`} />

        <Routes location={location} key={location.pathname}>

          {/* ================= AUTH ROUTES (NO LAYOUT) ================= */}
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

          <Route
            path="/forgot-password"
            element={
              <PageWrapper>
                <ForgotPassword />
              </PageWrapper>
            }
          />

          <Route
            path="/reset-password/:resetToken"
            element={
              <PageWrapper>
                <ResetPassword />
              </PageWrapper>
            }
          />

          {/* ================= MAIN LAYOUT ROUTES ================= */}
          <Route path="/" element={<Layout />}>

            {/* Public */}
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

            {/* ================= PROTECTED ROUTES ================= */}
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
              path="profile"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="profile/:userId"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Settings />
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

            {/* ✅ FIXED: RELATIVE NESTED ROUTE */}
            <Route
              path="create/write"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <ContentEditor />
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

          {/* ================= FALLBACK ================= */}
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
