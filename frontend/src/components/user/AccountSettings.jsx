import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Shield, Key, Trash2, AlertTriangle, Loader, CheckCircle2 } from "lucide-react";

const AccountSettings = () => {
  const { user, updatePassword, deleteAccount } = useAuth();

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({ password: "", account: "" });

  const showMessage = (field, text, type = "success") => {
    setMessages(prev => ({ ...prev, [field]: { text, type } }));
    setTimeout(() => setMessages(prev => ({ ...prev, [field]: null })), 4000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return showMessage("password", "Passwords do not match", "error");
    }

    setLoading(true);
    try {
      await updatePassword(passwords.current, passwords.new);
      showMessage("password", "Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      showMessage("password", error.message || "Failed to change password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      await deleteAccount(deleteConfirm);
      // AuthContext handles redirect
    } catch (error) {
      showMessage("account", error.message || "Failed to delete account", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="lg:mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Account & Security</h2>
        <p className="text-gray-400">Manage your credentials and protect your account.</p>
      </div>

      {/* Password Section */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
            <Key size={18} />
          </div>
          <h3 className="text-white font-semibold">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Current Password</label>
            <input
              type="password"
              required
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 focus:border-[#F5C542]/50 outline-none text-white transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 focus:border-[#F5C542]/50 outline-none text-white transition"
            />
          </div>

          <div className="space-y-2 border-b border-white/[0.05] pb-4">
            <label className="text-sm font-medium text-gray-400">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 focus:border-[#F5C542]/50 outline-none text-white transition"
            />
          </div>

          {messages.password && (
            <div className={`flex items-center gap-2 text-sm ${messages.password.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {messages.password.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              {messages.password.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#F5C542] text-black font-bold rounded-xl hover:bg-[#ffdb75] transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader size={16} className="animate-spin" />}
            Update Password
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/[0.02] border border-red-500/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
            <Trash2 size={18} />
          </div>
          <h3 className="text-white font-semibold">Danger Zone</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex gap-3 text-red-400">
              <AlertTriangle size={20} className="shrink-0" />
              <div>
                <p className="font-bold text-sm mb-1">Delete Account</p>
                <p className="text-xs opacity-80">Once you delete your account, there is no going back. All your stories, drafts, and profile data will be permanently removed.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-w-md">
            <label className="text-sm font-medium text-gray-400">Type your password to confirm</label>
            <input
              type="password"
              placeholder="Enter password"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-red-500/20 focus:border-red-500 outline-none text-white transition"
            />

            {messages.account && <p className="text-red-400 text-xs">{messages.account.text}</p>}

            <button
              onClick={handleDeleteAccount}
              disabled={!deleteConfirm || isDeleting}
              className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition disabled:opacity-30 flex items-center gap-2"
            >
              {isDeleting && <Loader size={16} className="animate-spin" />}
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;

