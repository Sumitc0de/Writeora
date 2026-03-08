import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import PageWrapper from "./components/transition/PageWrapper";
import FadeTransition from "./components/transition/FadeTransition";

import Layout from "./components/layouts/Layout";

// Lazy Load Pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/Contactpage"));
const Home = lazy(() => import("../pages/Home"));
const Learn = lazy(() => import("../pages/Learn"));
const CreateContent = lazy(() => import("../pages/CreateContent"));
const Posts = lazy(() => import("../pages/Posts"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/user/Profile"));
const Settings = lazy(() => import("../pages/user/Settings"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));

// 🎓 New Learn System
const LearnHome = lazy(() => import("./pages/learn/LearnHome"));
const ModulePage = lazy(() => import("./pages/learn/ModulePage"));
const LessonPage = lazy(() => import("./pages/learn/LessonPage"));

// 🛡️ Admin Panel
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLearnManager = lazy(() => import("./pages/admin/AdminLearnManager"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminModules = lazy(() => import("./pages/admin/AdminModules"));
const AdminLessons = lazy(() => import("./pages/admin/AdminLessons"));
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));

// Lazy Load Editor
const ContentEditor = lazy(() => import("./components/contentEditor/ContentEditor"));

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <ScrollToTopButton />

      {/* Global Transition Overlay */}
      <AnimatePresence>
        <FadeTransition key={`fade-${location.pathname}`} />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
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

              {/* Public Routes */}
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

              <Route
                path="discover"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />

              {/* 🎓 Learn Routes */}
              <Route path="learn" element={<PageWrapper><LearnHome /></PageWrapper>} />
              <Route path="learn/:moduleName" element={<PageWrapper><ModulePage /></PageWrapper>} />
              <Route path="learn/:moduleName/lesson/:lessonSlug" element={<PageWrapper><LessonPage /></PageWrapper>} />

              <Route
                path="post/:slug"
                element={
                  <PageWrapper>
                    <Posts />
                  </PageWrapper>
                }
              />

              <Route
                path="profile/:userId"
                element={
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                }
              />

              {/* ================= PROTECTED ROUTES ================= */}

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

            </Route>

            {/* 🛡️ Admin Routes (No Layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/learn/modules" element={<AdminModules />} />
              <Route path="/admin/learn/lessons" element={<AdminLessons />} />
              <Route path="/admin/learn" element={<Navigate to="/admin/learn/modules" replace />} />
            </Route>

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
