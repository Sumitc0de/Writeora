import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";

import { useAuth } from "./AuthContext";
import { getAllPosts, createPost } from "../service/postService";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FIXED: headerImage SHOULD be an object
  const [postData, setPostData] = useState({
    headerImage: {
      public_id: "",
      url: ""
    },
    title: "",
    subtitle: "",
    category: "",
    content: "",
    contentImages: [], // array of {public_id, url}
    hashtags: [],
  });

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.posts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED: Publish Post
  const publishPost = useCallback(
    async (postPayload) => {
      if (!user) throw new Error("User not authenticated");

      const payload = {
        title: postPayload.title?.trim(),
        subtitle: postPayload.subtitle || "",
        category: postPayload.category || "General",
        content: postPayload.content,

        // FIXED: Send object, not string
        headerImage: {
          public_id: postPayload.headerImage?.public_id || "",
          url: postPayload.headerImage?.url || ""
        },

        hashtags: postPayload.hashtags || [],

        // FIXED: Send array of objects
        contentImages: postPayload.contentImages || [],
      };

      if (!payload.title || !payload.content) {
        throw new Error("Title and content are required");
      }

      try {
        const data = await createPost(payload);

        setPosts((prev) => [data.post || data, ...prev]);

        // Reset AFTER publish
        setPostData({
          headerImage: {
            public_id: "",
            url: ""
          },
          title: "",
          subtitle: "",
          category: "",
          content: "",
          contentImages: [],
          hashtags: [],
        });

        return data;
      } catch (err) {
        console.error("Publish error:", err);
        throw err;
      }
    },
    [user]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const value = useMemo(
    () => ({
      posts,
      postData,
      setPostData,
      fetchPosts,
      publishPost,
      loading,
      error,
    }),
    [posts, postData, fetchPosts, publishPost, loading, error]
  );

  return (
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be inside PostProvider");
  return context;
};
