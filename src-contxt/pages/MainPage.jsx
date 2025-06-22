import React, { useEffect, useState } from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { usePostContext } from "../contexts/PostContext";
import api from "../utils/api";
import LoadingBar from "react-top-loading-bar";

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); // State for loading bar
  const { filteredPosts, addPost, votePost, selectedCategory } =
    usePostContext();

  useEffect(() => {
    const fetchUser = async () => {
      setProgress(30); // Start loading
      try {
        const profile = await api.getOwnProfile();
        setUser(profile);
        setProgress(100); // Complete loading
      } catch (err) {
        console.warn("User belum login atau gagal fetch:", err.message);
        setUser(null);
        setProgress(100); // Complete even on error
      }
    };

    fetchUser();

    // 🔁 Tambahkan listener untuk logout event
    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener("userLoggedOut", handleLogout);

    // Bersihkan listener saat komponen dibongkar
    return () => {
      window.removeEventListener("userLoggedOut", handleLogout);
      setProgress(0); // Reset progress on unmount
    };
  }, []);

  return (
    <div className="column center main-grid">
      <LoadingBar
        color="#f11946" // Warna loading bar (bisa disesuaikan)
        progress={progress}
        height={3} // Ketebalan loading bar
        onLoaderFinished={() => setProgress(0)} // Reset ketika selesai
      />

      {user && <PostForm onPost={addPost} />}

      {selectedCategory && (
        <div style={{ marginBottom: "10px" }}>
          <strong>kategori:</strong> #{selectedCategory}
        </div>
      )}

      <PostList posts={filteredPosts} onVote={votePost} />
    </div>
  );
};

export default MainPage;
