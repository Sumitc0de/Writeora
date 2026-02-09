const API_BASE = "http://localhost:5000/api/user";

// Update username
export const updateUsername = async (username) => {
    try {
        const res = await fetch(`${API_BASE}/settings/username`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update username");
        }

        return data;
    } catch (error) {
        console.error("updateUsername error:", error);
        throw error;
    }
};

// Update bio
export const updateBio = async (bio) => {
    try {
        const res = await fetch(`${API_BASE}/settings/bio`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ bio }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update bio");
        }

        return data;
    } catch (error) {
        console.error("updateBio error:", error);
        throw error;
    }
};

// Update avatar
export const updateAvatar = async (avatar) => {
    try {
        const res = await fetch(`${API_BASE}/settings/avatar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ avatar }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update avatar");
        }

        return data;
    } catch (error) {
        console.error("updateAvatar error:", error);
        throw error;
    }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const res = await fetch(`${API_BASE}/settings/password`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to change password");
        }

        return data;
    } catch (error) {
        console.error("changePassword error:", error);
        throw error;
    }
};

// Delete account
export const deleteAccount = async (password) => {
    try {
        const res = await fetch(`${API_BASE}/settings/account`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to delete account");
        }

        return data;
    } catch (error) {
        console.error("deleteAccount error:", error);
        throw error;
    }
};

// Get user settings
export const getUserSettings = async () => {
    try {
        const res = await fetch(`${API_BASE}/settings`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch settings");
        }

        return data;
    } catch (error) {
        console.error("getUserSettings error:", error);
        throw error;
    }
};
// Get Public Profile
export const getPublicProfile = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/author/${id}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch profile");
        }

        return data;
    } catch (error) {
        console.error("getPublicProfile error:", error);
        throw error;
    }
};
