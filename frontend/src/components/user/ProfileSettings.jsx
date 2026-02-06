import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUsername, updateBio, updateAvatar } from "../../service/userService";
import { uploadImage } from "../../service/uploadImage";
import { Camera, Loader, CheckCircle2, AlertCircle, User, FileText } from "lucide-react";

const ProfileSettings = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const [uploading, setUploading] = useState(false);
  const [saveLoading, setSaveLoading] = useState({ name: false, bio: false });
  const [messages, setMessages] = useState({ name: "", bio: "", avatar: "" });


  // console.log(messages)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showMessage = (field, message, type = "success") => {
    setMessages(prev => ({ ...prev, [field]: { text: message, type } }));
    setTimeout(() => {
      setMessages(prev => ({ ...prev, [field]: null }));
    }, 3000);
  };

  // Update Username
  const handleUpdateUsername = async () => {
    if (!formData.name.trim() || formData.name === user?.name) return;

    setSaveLoading(prev => ({ ...prev, name: true }));
    try {
      const response = await updateUsername(formData.name);
      setUser(response.user); // Update global state
      showMessage("name", "Username updated successfully!");
    } catch (error) {
      showMessage("name", error.message || "Failed to update username", "error");
      setFormData(prev => ({ ...prev, name: user?.name || "" })); // Revert on error
    } finally {
      setSaveLoading(prev => ({ ...prev, name: false }));
    }
  };

  // Update Bio
  const handleUpdateBio = async () => {
    if (formData.bio === user?.bio) return;

    setSaveLoading(prev => ({ ...prev, bio: true }));
    try {
      const response = await updateBio(formData.bio);
      setUser(response.user); // Update global state
      showMessage("bio", "Bio updated successfully!");
    } catch (error) {
      showMessage("bio", error.message || "Failed to update bio", "error");
      setFormData(prev => ({ ...prev, bio: user?.bio || "" }));
    } finally {
      setSaveLoading(prev => ({ ...prev, bio: false }));
    }
  };

  // Avatar Upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload to cloudinary
      const uploadedImage = await uploadImage(file);

      // Update user avatar via API
      const response = await updateAvatar(uploadedImage);
      setUser(response.user); // Update global state
      showMessage("avatar", "Avatar updated successfully!");
    } catch (error) {
      showMessage("avatar", error.message || "Failed to upload avatar", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="lg:mt-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
        <p className="text-gray-400">
          Update your public profile information.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
            <Camera size={18} />
          </div>
          <h3 className="text-white font-semibold">Profile Picture</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div
              className="w-24 h-24 rounded-full bg-cover bg-center border-2 border-white/10 flex-shrink-0 overflow-hidden"
              style={{
                backgroundImage: user?.avatar?.url
                  ? `url(${user.avatar.url})`
                  : `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}')`,
              }}
            >
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin text-[#F5C542]" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              id="avatarInput"
              className="hidden"
              disabled={uploading}
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="avatarInput"
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-white/[0.05] border border-white/10 rounded-lg font-medium hover:bg-white/[0.08] transition disabled:opacity-50 text-sm"
            >
              <Camera size={16} />
              {uploading ? "Uploading..." : "Upload New Photo"}
            </label>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>

        {messages.avatar && (
          <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm ${messages.avatar.type === "success"
            ? "bg-green-500/10 border border-green-500/20 text-green-400"
            : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}>
            {messages.avatar.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {messages.avatar.text}
          </div>
        )}
      </div>

      {/* Username Section */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
            <User size={18} />
          </div>
          <h3 className="text-white font-semibold">Username</h3>
        </div>

        <div className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#F5C542]/50 focus:bg-white/[0.02] outline-none text-white placeholder-gray-600 transition"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdateUsername}
              disabled={saveLoading.name || !formData.name.trim() || formData.name === user?.name}
              className="px-5 py-2 bg-[#F5C542] text-black font-semibold rounded-lg hover:bg-[#ffdb75] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm flex items-center gap-2"
            >
              {saveLoading.name ? (
                <>
                  <Loader size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                "Update Username"
              )}
            </button>

            {messages.name && (
              <div className={`flex items-center gap-2 text-sm ${messages.name.type === "success" ? "text-green-400" : "text-red-400"
                }`}>
                {messages.name.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {messages.name.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
            <FileText size={18} />
          </div>
          <h3 className="text-white font-semibold">Bio</h3>
        </div>

        <div className="space-y-3">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell others about yourself..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#F5C542]/50 focus:bg-white/[0.02] outline-none text-white placeholder-gray-600 resize-none transition"
          />
          <div className="text-xs text-gray-500 text-right">
            {formData.bio.length}/500 characters
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdateBio}
              disabled={saveLoading.bio || formData.bio === user?.bio}
              className="px-5 py-2 bg-[#F5C542] text-black font-semibold rounded-lg hover:bg-[#ffdb75] disabled:opacity-50 disabled:cursor-not-allowed transition text-sm flex items-center gap-2"
            >
              {saveLoading.bio ? (
                <>
                  <Loader size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                "Update Bio"
              )}
            </button>

            {messages.bio && (
              <div className={`flex items-center gap-2 text-sm ${messages.bio.type === "success" ? "text-green-400" : "text-red-400"
                }`}>
                {messages.bio.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {messages.bio.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
