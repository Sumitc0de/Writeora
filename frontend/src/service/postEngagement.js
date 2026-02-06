import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ✅ Global axios config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies automatically
});


// Toggle save
export const toggleSavePost = (slug) =>
  api.post(`/posts/${slug}/save`);

// Get save status
export const getSaveStatus = (slug) =>
  api.get(`/posts/${slug}/save`);

// Get save comments
export const getComments = (slug) =>
  api.get(`/posts/${slug}/comments`);

// ADD comment
export const addComment = (slug, text) =>
  api.post(`/posts/${slug}/comments`, { text });

// Toggle Like
export const toggleLikePost = (slug) =>
  api.post(`/posts/${slug}/likes`);

// Get total likes and like status 
export const getLikeStatus = (slug) =>
  api.get(`/posts/${slug}/likes`);

// Get user saved posts
export const getUserSavedPosts = () => api.get(`/posts/user/saved`);

// Get user stats
export const getUserStats = () => api.get(`/posts/user/stats`);

// Get user stats by ID (Public)
export const getUserStatsById = (userId) => api.get(`/posts/user/stats/${userId}`);