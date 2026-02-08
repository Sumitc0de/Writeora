import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Optional: Add an interceptor to debug 401s if they persist
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("🔒 Unauthorized request (401) - session may have expired.");
        }
        return Promise.reject(error);
    }
);

export default API;

