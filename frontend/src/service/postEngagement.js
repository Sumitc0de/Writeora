import { api } from "../service/api.js";
// Toggle save
export const toggleSavePost = (slug) =>
  api.post(`/api/posts/${slug}/save`);

// Get save status
export const getSaveStatus = (slug) =>
  api.get(`/api/posts/${slug}/save`);

// Get save comments
export const getComments = (slug) =>
  api.get(`/api/posts/${slug}/comments`);

// ADD comment
export const addComment = (slug, text) =>
  api.post(`/api/posts/${slug}/comments`, { text });

// Toggle Like
export const toggleLikePost = (slug) =>
  api.post(`/api/posts/${slug}/likes`);

// Get total likes and like status 
export const getLikeStatus = (slug) =>
  api.get(`/api/posts/${slug}/likes`);

// Get user saved posts
export const getUserSavedPosts = () => api.get(`/api/posts/user/saved`);

// Get user stats
export const getUserStats = () => api.get(`/api/posts/user/stats`);

// Get user stats by ID (Public)
export const getUserStatsById = (userId) => api.get(`/api/posts/user/stats/${userId}`);