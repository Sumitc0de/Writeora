import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Configure axios defaults (only once)
  axios.defaults.baseURL = "http://localhost:8000/api";
  axios.defaults.withCredentials = true;

  /**
   * 🔍 Fetch the logged-in user's profile from the backend
   * Runs once on app load or refresh to persist the login
   */
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/profile");
      setUser(data.user); // ✅ Backend sends the user directly (not data.user)
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // run once when app mounts
  }, []);

 
  // 🧩 Login Handler

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/user/login", { email, password });
      setUser(data.user);
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  //  🚪 Logout Handler

  const logout = async () => {
    try {
      await axios.post("/user/logout");
      setUser(null);
      Cookies.remove("token"); // ✅ Ensure token cookie is cleared manually (for safety)
      window.location.href = "/"; // ✅ Hard redirect fallback
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
      throw err;
    }
  };

//  🔐 Check if user is logged in (based on token cookie)

  const isLoggedIn = () => {
    const token = Cookies.get("token");
    return Boolean(token);
  };

  // ✅ Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    fetchUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Auth Hook
export const useAuth = () => useContext(AuthContext);
