import { api } from "./api";

/* ---------------- USER SETTINGS ---------------- */

// Update username
export const updateUsername = async (username) => {
    try {
        const { data } = await api.put("/api/user/settings/username", { username });
        return data;
    } catch (error) {
        console.error(
            "updateUsername error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Update bio
export const updateBio = async (bio) => {
    try {
        const { data } = await api.put("/api/user/settings/bio", { bio });
        return data;
    } catch (error) {
        console.error(
            "updateBio error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Update avatar
export const updateAvatar = async (avatar) => {
    try {
        const { data } = await api.put("/api/user/settings/avatar", { avatar });
        return data;
    } catch (error) {
        console.error(
            "updateAvatar error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const { data } = await api.put("/api/user/settings/password", {
            currentPassword,
            newPassword,
        });
        return data;
    } catch (error) {
        console.error(
            "changePassword error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Delete account
export const deleteAccount = async (password) => {
    try {
        const { data } = await api.delete("/api/user/settings/account", {
            data: { password }, // axios delete body
        });
        return data;
    } catch (error) {
        console.error(
            "deleteAccount error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Get user settings
export const getUserSettings = async () => {
    try {
        const { data } = await api.get("/api/user/settings");
        return data;
    } catch (error) {
        console.error(
            "getUserSettings error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};

// Get public profile
export const getPublicProfile = async (id) => {
    try {
        const { data } = await api.get(`/api/user/author/${id}`);
        return data;
    } catch (error) {
        console.error(
            "getPublicProfile error:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};
