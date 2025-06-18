import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, BarChart, LogOut, Plus, X } from "react-feather";
import "../styles/NavSection.css";
import "../styles/postModal.css";
import { usePostContext } from "../contexts/PostContext";
import api from "../utils/api"; // pastikan path sesuai

const NavSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [category, setCategory] = useState("");
  const { addPost } = usePostContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    api.removeAccessToken();
    navigate("/login");
  };

  const handlePost = () => {
    if (!postContent.trim()) {
      alert("Isi postingan tidak boleh kosong.");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: "Anonymous",
      category: category || "umum",
      content: postContent,
      date: new Date().toISOString(),
      comments: 0,
      upvotes: 0,
      downvotes: 0,
    };

    addPost(newPost);

    setPostContent("");
    setCategory("");
    setShowModal(false);
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

        <div
          className="nav-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <LogOut size={20} className="nav-icon" />
          <span className="nav-text">Logout</span>
        </div>

        <div className="post-button-container">
          <button
            className="post-button mobile-post-button"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            <span className="desktop-only-text">Post</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal no-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Buat Postingan</h3>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="profile-preview">
                <img
                  src="https://via.placeholder.com/40"
                  alt="profile"
                  className="profile-image"
                />
                <span className="username">username</span>
              </div>

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

              <button className="modal-post-button" onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavSection;
