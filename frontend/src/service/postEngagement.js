import api from "../api/axios";


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