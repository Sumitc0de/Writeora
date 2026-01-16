import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AccountSettings = () => {
  const { user, updateUser, changePassword } = useAuth();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateUser({ email });
      setMessage("Email updated successfully!");
    } catch (error) {
      setMessage(error.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await changePassword(currentPassword, newPassword);
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:mt-10">
      <h2 className="text-2xl font-extrabold mb-2">Account Settings</h2>
      <p className="text-[#C4C1A0] mb-6">
        Manage your account credentials and security.
      </p>

      {/* Email */}
      <form onSubmit={handleEmailUpdate} className="mb-8">
        <div className="mb-6">
          <label className="text-sm font-bold">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full h-12 px-4 rounded-lg bg-[#12120F] border border-[#2A2A20] focus:border-[#F2CC0D] outline-none"
          />
          <p className="text-xs text-[#C4C1A0] mt-1">
            Used for login and important notifications.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 h-12 bg-[#F2CC0D] text-black font-bold rounded-lg hover:bg-[#FFE45F] transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>

      {/* Password */}
      <form onSubmit={handlePasswordChange}>
        <div className="mb-8">
          <label className="text-sm font-bold">Change Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="mt-2 w-full h-12 px-4 rounded-lg bg-[#12120F] border border-[#2A2A20] focus:border-[#F2CC0D] outline-none"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="mt-2 w-full h-12 px-4 rounded-lg bg-[#12120F] border border-[#2A2A20] focus:border-[#F2CC0D] outline-none"
          />
        </div>

        {message && (
          <p className={`mb-4 ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 h-12 bg-[#F2CC0D] text-black font-bold rounded-lg hover:bg-[#FFE45F] transition disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>

      {/* Danger Zone */}
      <div className="mt-12 border-t border-[#2A2A20] pt-6">
        <h3 className="text-red-400 font-bold mb-2">Danger Zone</h3>
        <p className="text-[#C4C1A0] text-sm mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button className="w-full sm:w-auto px-6 h-11 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-black transition">
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default AccountSettings;

