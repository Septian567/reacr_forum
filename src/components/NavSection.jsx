import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  BarChart,
  LogOut,
  LogIn,
  Plus,
  X,
  User,
} from "react-feather";
import "../styles/NavSection.css";
import "../styles/postModal.css";
import { usePostContext } from "../contexts/PostContext";
import api from "../utils/api";

const PostModal = ({
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  category,
  setCategory,
  onClose,
  onPost,
  user,
}) => (
  <div className="modal no-backdrop" onClick={onClose}>
    <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Buat Postingan</h3>
        <button className="close-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="modal-body">
        <div
          className="profile-preview"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="profile"
              className="profile-image"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
          ) : (
            <div
              className="profile-icon-circle"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
            >
              <User size={20} color="#fff" />
            </div>
          )}
          <span className="username" style={{ fontWeight: "bold" }}>
            {user?.name || "Anonim"}
          </span>
        </div>

        <input
          type="text"
          placeholder="Judul"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className="modal-input"
        />

        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="modal-input"
        />

        <textarea
          className="modal-textarea"
          placeholder="Apa yang ingin kamu bagikan?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        <button className="modal-post-button" onClick={onPost}>
          Post
        </button>
      </div>
    </div>
  </div>
);

const NavSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null);

  const { addPost } = usePostContext();
  const navigate = useNavigate();

  const refreshUser = async () => {
    try {
      const profile = await api.getOwnProfile();
      setUser(profile);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const handleLogout = () => {
    api.removeAccessToken();

    // Tampilkan status logout (opsional)
    setTimeout(() => {
      setUser(null); // Update tampilan ke mode belum login
      window.dispatchEvent(new Event("userLoggedOut")); // Beritahu komponen lain
    }, 1000); // 2 detik delay
  };
  

  const handlePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert("Judul dan isi postingan tidak boleh kosong.");
      return;
    }

    try {
      await addPost({
        title: postTitle,
        body: postContent,
        category: category || "umum",
        user,
      });

      setPostTitle("");
      setPostContent("");
      setCategory("");
      setShowModal(false);
    } catch (err) {
      alert("Gagal membuat postingan: " + err.message);
    }
  };

  return (
    <>
      <div className="nav-section">
        <Link to="/" className="nav-item">
          <MessageSquare size={20} className="nav-icon" />
          <span className="nav-text">Threads</span>
        </Link>

        <Link to="/leaderboard" className="nav-item">
          <BarChart size={20} className="nav-icon" />
          <span className="nav-text">Leaderboard</span>
        </Link>

        {user ? (
          <div
            className="nav-item"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <LogOut size={20} className="nav-icon" />
            <span className="nav-text">Logout</span>
          </div>
        ) : (
          <Link to="/login" className="nav-item">
            <LogIn size={20} className="nav-icon" />
            <span className="nav-text">Login</span>
          </Link>
        )}

        {user && (
          <div className="post-button-container">
            <button
              className="post-button mobile-post-button"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              <span className="desktop-only-text">Post</span>
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <PostModal
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postContent={postContent}
          setPostContent={setPostContent}
          category={category}
          setCategory={setCategory}
          onClose={() => setShowModal(false)}
          onPost={handlePost}
          user={user}
        />
      )}
    </>
  );
};

export default NavSection;
