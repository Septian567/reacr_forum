import React, { createContext, useContext, useEffect, useState } from "react";

// Buat context
const PostContext = createContext();

// Fungsi bantu: simpan dan ambil dari localStorage
const LOCAL_STORAGE_KEY = "posts_data";

const getPostsFromStorage = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const savePostsToStorage = (posts) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Provider
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Load posts saat pertama kali render
  useEffect(() => {
    const savedPosts = getPostsFromStorage();
    setPosts(savedPosts);
  }, []);

  // Simpan ke localStorage setiap kali posts berubah
  useEffect(() => {
    console.log("Saving posts to localStorage:", posts); // 🔍 Debug log
    savePostsToStorage(posts);
  }, [posts]);

  const addPost = (newPost) => {
    console.log("Adding post:", newPost); // 🔍 Debug log
    setPosts((prev) => [...prev, newPost]);
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

  const deleteAllPosts = () => {
    setPosts([]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, votePost, deleteAllPosts }}>
      {children}
    </PostContext.Provider>
  );
};

// Hook untuk digunakan di komponen
export const usePostContext = () => useContext(PostContext);
