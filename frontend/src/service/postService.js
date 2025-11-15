import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ✅ Global axios config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies automatically
});

// ✅ Get all posts
export const getAllPosts = async () => {
  const { data } = await api.get("/posts/");
  return data;
};

// ✅ Create a new post
export const createPost = async (postData) => {
  const { data } = await api.post("/posts/", postData);
  return data;
};


export const getPostBySlug = async (slug) => {
  const { data } = await axios.get(`http://localhost:8000/api/posts/${slug}`, {
    withCredentials: true,
  });
  return data;
}

export const getPostByCategory = async (category)=>{
  const { data } = await axios.get(`http://localhost:8000/api/posts/category/${category}`, {
    withCredentials: true,
  });
  return data;
}