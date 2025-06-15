// contexts/PostContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // 🔹 Filter kategori
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load dari localStorage saat pertama kali
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    const storedComments = localStorage.getItem("comments");

    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (err) {
        console.error("Gagal parsing posts", err);
      }
    }

    if (storedComments) {
      try {
        setComments(JSON.parse(storedComments));
      } catch (err) {
        console.error("Gagal parsing comments", err);
      }
    }

    setHasLoaded(true);
  }, []);

  // Simpan ke localStorage ketika berubah
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("posts", JSON.stringify(posts));
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [posts, comments, hasLoaded]);

  // 🔹 Filter kategori (klik & toggle)
  const toggleCategoryFilter = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  // 🔹 Gunakan useMemo agar efisien
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const addPost = (newPost) => {
    const postWithDefaults = {
      ...newPost,
      id: Date.now(),
      author: "Budi",
      date: new Date().toISOString(),
      comments: 0,
      upvotes: 0,
      downvotes: 0,
    };
    setPosts((prev) => [postWithDefaults, ...prev]);
  };

  const votePost = (postId, type) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
              downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
            }
          : post
      )
    );
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: Date.now(),
      author: "Kamu",
      content,
      date: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
    };

    setComments((prev) => {
      const updated = {
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])],
      };
      return updated;
    });

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  const voteComment = (postId, commentId, type) => {
    setComments((prev) => {
      const updated = (prev[postId] || []).map((c) =>
        c.id === commentId
          ? {
              ...c,
              upvotes: type === "up" ? c.upvotes + 1 : c.upvotes,
              downvotes: type === "down" ? c.downvotes + 1 : c.downvotes,
            }
          : c
      );

      return {
        ...prev,
        [postId]: updated,
      };
    });
  };

  const deleteAllPosts = () => {
    if (window.confirm("Hapus semua postingan?")) {
      setPosts([]);
      setComments({});
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        filteredPosts, // 🔹 post setelah difilter
        comments,
        addPost,
        votePost,
        deleteAllPosts,
        addComment,
        voteComment,
        selectedCategory, // 🔹 kategori aktif
        toggleCategoryFilter, // 🔹 fungsi toggle
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
