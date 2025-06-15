import { useState, useEffect } from "react";

const useMainPage = () => {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error("Gagal parsing posts dari localStorage", error);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts, hasLoaded]);

  const getFormattedDate = () => {
    return new Date().toISOString();
  };

  const handlePost = (category, content) => {
    const newPost = {
      id: Date.now(),
      category,
      content,
      author: "Budi",
      date: getFormattedDate(),
      comments: 0,
      upvotes: 0,
      downvotes: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleVote = (id, type) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
              downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
            }
          : post
      )
    );
  };

  const handleDeleteAll = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua postingan?")) {
      setPosts([]);
    }
  };

  return {
    posts,
    handlePost,
    handleVote,
    handleDeleteAll,
  };
};

export default useMainPage;
