import React, { useEffect, useState } from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { usePostContext } from "../contexts/PostContext";
import api from "../utils/api";

const MainPage = () => {
  const [user, setUser] = useState(null);

  const { filteredPosts, addPost, votePost, selectedCategory } =
    usePostContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await api.getOwnProfile();
        setUser(profile);
      } catch (err) {
        console.warn("User belum login atau gagal fetch:", err.message);
        setUser(null); // reset if failed
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
    };
  }, []);

  return (
    <div className="column center main-grid">
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
