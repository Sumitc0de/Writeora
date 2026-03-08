import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/learn`;

const getAuthHeaders = () => ({ withCredentials: true });

// --- Public ---

export const getModules = async () => {
    const { data } = await axios.get(`${API_URL}/modules`);
    return data;
};

export const getModuleBySlug = async (slug) => {
    const { data } = await axios.get(`${API_URL}/modules/${slug}`);
    return data;
};

export const getLesson = async (moduleSlug, lessonSlug) => {
    const { data } = await axios.get(`${API_URL}/modules/${moduleSlug}/lessons/${lessonSlug}`);
    return data;
};

// --- Admin ---

// Modules
export const createModule = async (moduleData) => {
    const { data } = await axios.post(`${API_URL}/modules`, moduleData, getAuthHeaders());
    return data;
};

export const updateModule = async (id, moduleData) => {
    const { data } = await axios.put(`${API_URL}/modules/${id}`, moduleData, getAuthHeaders());
    return data;
};

export const deleteModule = async (id) => {
    const { data } = await axios.delete(`${API_URL}/modules/${id}`, getAuthHeaders());
    return data;
};

// Lessons
export const createLesson = async (lessonData) => {
    const { data } = await axios.post(`${API_URL}/lessons`, lessonData, getAuthHeaders());
    return data;
};

export const updateLesson = async (id, lessonData) => {
    const { data } = await axios.put(`${API_URL}/lessons/${id}`, lessonData, getAuthHeaders());
    return data;
};

export const deleteLesson = async (id) => {
    const { data } = await axios.delete(`${API_URL}/lessons/${id}`, getAuthHeaders());
    return data;
};
