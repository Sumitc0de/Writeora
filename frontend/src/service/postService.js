import api from "../api/axios";

// ✅ Get all posts
export const getAllPosts = async () => {
  const { data } = await api.get("/api/posts/");
  return data;
};

// ✅ Create a new post
export const createPost = async (postData) => {
  const { data } = await api.post("/api/posts/", postData);
  return data;
};


export const getPostBySlug = async (slug) => {
  const { data } = await api.get(`/api/posts/${slug}`);
  return data;
}

export const getPostByCategory = async (category) => {
  const { data } = await api.get(`/api/posts/category/${encodeURIComponent(category)}`);
  return data;
}

export const updatePost = async (id, postData) => {
  const { data } = await api.patch(`/api/posts/${id}`, postData);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await api.delete(`/api/posts/${id}`);
  return data;
};

export const updateVisibility = async (id) => {
  const { data } = await api.patch(`/api/posts/${id}/visibility`);
  return data;
};

export const getMyPosts = async () => {
  const { data } = await api.get("/api/posts/user/my-posts");
  return data;
};

