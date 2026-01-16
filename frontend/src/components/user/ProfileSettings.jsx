import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateUser(formData);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:mt-10">
      <h2 className="text-2xl font-extrabold mb-2">Profile Settings</h2>
      <p className="text-[#C4C1A0] mb-6">
        Update your public profile information.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center border border-[#2A2A20] flex-shrink-0"
            style={{
              backgroundImage: user?.avatar?.url
                ? `url(${user.avatar.url})`
                : "url('https://i.ibb.co/SsQ7pYw/avatar-placeholder.png')",
            }}
          />
          <button
            type="button"
            className="px-5 py-2 bg-[#2A2A20] rounded-lg font-bold hover:bg-[#F2CC0D] hover:text-black transition w-full sm:w-auto"
          >
            Upload Avatar
          </button>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="text-sm font-bold">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full h-12 px-4 rounded-lg bg-[#12120F] border border-[#2A2A20] focus:border-[#F2CC0D] outline-none"
          />
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label className="text-sm font-bold">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-2 w-full min-h-[120px] p-4 rounded-lg bg-[#12120F] border border-[#2A2A20] focus:border-[#F2CC0D] outline-none"
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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default ProfileSettings;
