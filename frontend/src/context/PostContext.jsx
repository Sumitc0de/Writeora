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

  const [postData, setPostData] = useState({
    headerImage: "",
    title: "",
    subtitle: "",
    category: "",
    content: "",
    contentImage: [],
    hashtags: [],
  });

  /**
   * ✅ Fetch all posts
   */
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.posts || response || []);
    } catch (err) {
      console.error("❌ Fetch posts error:", err);
      setError(err.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * ✅ Create / Publish Post
   * No manual token required — cookie is sent automatically
   */
  const publishPost = useCallback(
    async (postPayload) => {
      if (!user) throw new Error("User not authenticated");

      const payload = {
        title: postPayload?.title?.trim(),
        subTitle: postPayload?.subtitle || "",
        category: postPayload?.category || "General",
        content: postPayload?.content,
        headerImage: postPayload?.headerImage || "",
        hashtags: postPayload?.hashtags || [],
      };

      if (!payload.title || !payload.content) {
        throw new Error("Title and content are required");
      }

      try {
        const data = await createPost(payload);
        console.log("✅ Post created:", data);

        setPosts((prev) => [data.post || data, ...prev]);

        // Reset editor state
        setPostData({
          headerImage: "",
          title: "",
          subtitle: "",
          category: "",
          content: "",
          contentImage: [],
          hashtags: [],
        });

        return data;
      } catch (err) {
        console.error("❌ Publish post error:", err);
        throw err;
      }
    },
    [user]
  );

  /**
   * ✅ Fetch posts when component mounts
   */
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /**
   * ✅ Memoized context value
   */
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

/**
 * ✅ Safe custom hook for using PostContext
 */
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("usePosts must be used within a PostProvider");
  return context;
};
