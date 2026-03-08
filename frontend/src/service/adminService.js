import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;
const UPLOAD_URL = `${import.meta.env.VITE_API_BASE_URL}/api/upload`;

const getAuthHeaders = () => {
    // Assuming token is stored in cookie, simply setting credentials true is enough for browser
    // But if we need Authorization header:
    // const token = localStorage.getItem("token"); // If we used LS, but we use cookies.
    // So axios 'withCredentials: true' is key.
    return {
        withCredentials: true
    };
};

// --- User Management ---

export const getAllUsers = async () => {
    const { data } = await axios.get(`${API_URL}/users`, getAuthHeaders());
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await axios.delete(`${API_URL}/user/${id}`, getAuthHeaders());
    return data;
};

export const updateUserRole = async (id, role) => {
    const { data } = await axios.put(`${API_URL}/user/${id}/role`, { role }, getAuthHeaders());
    return data;
};

// --- PDF Upload ---

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    const { data } = await axios.post(`${UPLOAD_URL}/pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    });
    return data;
};
