import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "../service/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🔍 Fetch the logged-in user's profile from the backend
   * Runs once on app load or refresh to persist the login
   */
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/user/profile");
      setUser(data.user); // ✅ Backend sends the user inside data.user
      setError(null);
    } catch (err) {
      setUser(null);
      // Only set error if it's NOT a 401 (which just means user is not logged in)
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || "Failed to fetch user");
      }
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
      const { data } = await api.post("/api/user/login", { email, password });
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
      await api.post("/api/user/logout");
      setUser(null);
      Cookies.remove("token"); // ✅ Ensure token cookie is cleared manually (for safety)
      window.location.href = "/"; // ✅ Hard redirect fallback
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
      throw err;
    }
  };

  //  🔐 Sign Out logic is handled by clear credentials on backend

  // 📝 Signup Handler
  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post("/api/user/register", { name, email, password });
      setUser(data.user);
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  // 🔐 Password Change Handler
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const { data } = await api.put("/api/user/settings/password", { currentPassword, newPassword });
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
      throw err;
    }
  };

  // 🗑️ Account Deletion Handler
  const deleteAccount = async (password) => {
    try {
      const { data } = await api.delete("/api/user/settings/account", { data: { password } });
      setUser(null);
      Cookies.remove("token");
      setError(null);
      window.location.href = "/";
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
      throw err;
    }
  };

  // ✅ Context value
  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    signup,
    logout,
    updatePassword,
    deleteAccount,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Auth Hook 
export const useAuth = () => useContext(AuthContext);

