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
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Correct post data structure
  const [postData, setPostData] = useState({
    headerImage: {
      public_id: "",
      url: "",
    },
    title: "",
    subtitle: "",
    category: "",
    content: "",
    hashtags: [],
    readingTime: 1,
  });

  // ✅ Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllPosts();
      setPosts(response?.posts || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Publish post (fully safe)
  const publishPost = useCallback(
    async (postPayload) => {
      if (!user) {
        const authError = new Error("User not authenticated");
        setError(authError.message);
        throw authError;
      }

      const payload = {
        title: postPayload.title?.trim(),
        subtitle: postPayload.subtitle || "",
        category: postPayload.category || "General",
        content: postPayload.content,
        headerImage: {
          public_id: postPayload.headerImage?.public_id || "",
          url: postPayload.headerImage?.url || "",
        },
        hashtags: Array.isArray(postPayload.hashtags)
          ? postPayload.hashtags
          : [],
        contentImages: postPayload.contentImages || [],
        readingTime: postPayload.readingTime || 1,
      };

      if (!payload.title || !payload.content) {
        const validationError = new Error("Title and content are required");
        setError(validationError.message);
        throw validationError;
      }

      try {
        setPublishing(true);
        setError(null);

        await createPost(payload);

        // 🔥 Re-fetch so populated author is returned
        await fetchPosts();

        // ✅ Reset form
        setPostData({
          headerImage: { public_id: "", url: "" },
          title: "",
          subtitle: "",
          category: "",
          content: "",
          hashtags: [],
          readingTime: 1,
        });
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to publish post");
        throw err;
      } finally {
        setPublishing(false);
      }
    },
    [user, fetchPosts]
  );

  // ✅ Fetch only when auth state is ready
  useEffect(() => {
    if (user !== undefined) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  // ✅ Memoized context value
  const value = useMemo(
    () => ({
      posts,
      postData,
      setPostData,
      fetchPosts,
      publishPost,
      loading,
      publishing,
      error,
    }),
    [
      posts,
      postData,
      fetchPosts,
      publishPost,
      loading,
      publishing,
      error,
    ]
  );

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
