// contexts/PostContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import api from "../utils/api";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Utilitas untuk membentuk mapping userId -> data user
  const buildUsersMap = (users) =>
    users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

  // Utilitas untuk menambahkan data author/avatar ke thread
  const enrichThread = (thread, users) => {
    const owner = users[thread.ownerId];
    return {
      ...thread,
      author: owner?.name || "Anonim",
      avatar: owner?.avatar || "https://via.placeholder.com/40",
      totalComments: thread.comments?.length || 0,
      upvotes: thread.upVotesBy?.length || 0,
      downvotes: thread.downVotesBy?.length || 0,
    };
  };

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        setIsLoading(true);
        const [threads, users] = await Promise.all([
          api.getAllThreads(),
          api.getAllUsers(),
        ]);

        const usersMap = buildUsersMap(users);
        setUsersMap(usersMap);

        const mappedThreads = threads.map((post) =>
          enrichThread(post, usersMap)
        );

        setPosts(mappedThreads);
      } catch (err) {
        console.error("Gagal mengambil data:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsAndUsers();
  }, []);

  const toggleCategoryFilter = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const addPost = async (newPost) => {
    try {
      const response = await api.createThread(newPost);
      const threadId = response.data.thread.id;
      const rawThread = await api.getThreadDetail(threadId);

      // Gunakan data user dari newPost
      const enrichedThread = {
        ...rawThread,
        author: newPost.user?.name || "Anonim",
        avatar: newPost.user?.avatar || "https://via.placeholder.com/40",
        totalComments: rawThread.comments?.length || 0,
        upvotes: rawThread.upVotesBy?.length || 0,
        downvotes: rawThread.downVotesBy?.length || 0,
      };

      setPosts((prev) => [enrichedThread, ...prev]);
    } catch (error) {
      console.error("Gagal menambah thread:", error.message);
      throw error;
    }
  };

  const votePost = async (postId, type) => {
    try {
      // Simpan data post sebelum diupdate untuk mempertahankan author info
      const currentPost = posts.find((post) => post.id === postId);

      // Lakukan vote
      if (type === "up") {
        await api.upVoteThread(postId);
      } else if (type === "down") {
        await api.downVoteThread(postId);
      } else {
        await api.neutralizeVoteThread(postId);
      }

      // Dapatkan thread yang diperbarui
      const updated = await api.getThreadDetail(postId);

      // Buat thread yang diperbarui dengan mempertahankan data author
      const enriched = {
        ...updated,
        author:
          currentPost?.author || usersMap[updated.ownerId]?.name || "Anonim",
        avatar:
          currentPost?.avatar ||
          usersMap[updated.ownerId]?.avatar ||
          "https://via.placeholder.com/40",
        totalComments: updated.comments?.length || 0,
        upvotes: updated.upVotesBy?.length || 0,
        downvotes: updated.downVotesBy?.length || 0,
      };

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? enriched : post))
      );
    } catch (error) {
      console.error("Gagal voting:", error.message);
      throw error;
    }
  };

  const addComment = async (postId, content) => {
    try {
      const comment = await api.createComment({ threadId: postId, content });
      setComments((prev) => ({
        ...prev,
        [postId]: [comment, ...(prev[postId] || [])],
      }));

      const updated = await api.getThreadDetail(postId);
      const currentPost = posts.find((post) => post.id === postId);

      const enriched = {
        ...updated,
        author:
          currentPost?.author || usersMap[updated.ownerId]?.name || "Anonim",
        avatar:
          currentPost?.avatar ||
          usersMap[updated.ownerId]?.avatar ||
          "https://via.placeholder.com/40",
        totalComments: updated.comments?.length || 0,
        upvotes: updated.upVotesBy?.length || 0,
        downvotes: updated.downVotesBy?.length || 0,
      };

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? enriched : post))
      );
    } catch (err) {
      console.error("Gagal menambah komentar:", err.message);
      throw err;
    }
  };

  const voteComment = async (postId, commentId, type) => {
    try {
      const currentPost = posts.find((post) => post.id === postId);

      if (type === "up") {
        await api.upVoteComment({ threadId: postId, commentId });
      } else if (type === "down") {
        await api.downVoteComment({ threadId: postId, commentId });
      } else {
        await api.neutralizeVoteComment({ threadId: postId, commentId });
      }

      const updatedThread = await api.getThreadDetail(postId);

      const enriched = {
        ...updatedThread,
        author:
          currentPost?.author ||
          usersMap[updatedThread.ownerId]?.name ||
          "Anonim",
        avatar:
          currentPost?.avatar ||
          usersMap[updatedThread.ownerId]?.avatar ||
          "https://via.placeholder.com/40",
        totalComments: updatedThread.comments?.length || 0,
        upvotes: updatedThread.upVotesBy?.length || 0,
        downvotes: updatedThread.downVotesBy?.length || 0,
      };

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? enriched : post))
      );
    } catch (err) {
      console.error("Gagal vote komentar:", err.message);
      throw err;
    }
  };

  const deleteAllPosts = () => {
    if (window.confirm("Hapus semua postingan lokal?")) {
      setPosts([]);
      setComments({});
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        filteredPosts,
        comments,
        addPost,
        votePost,
        deleteAllPosts,
        addComment,
        voteComment,
        selectedCategory,
        toggleCategoryFilter,
        isLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
