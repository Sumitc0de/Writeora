import axios from "axios";

const API_URL = "http://localhost:5000/api/posts"; // Change if hosted

// ✅ Get all posts (public)
export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// ✅ Create a new post (requires token)
export const createPost = async (postData, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // from logged-in user
      },
    };

    const response = await axios.post(API_URL, postData, config);
    return response.data.post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
