import React, { useEffect, useState } from "react";
import "../styles/postForm.css";
import api from "../utils/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/postForm.css";

const PostForm = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await api.getOwnProfile();
        setUser(profile);
      } catch (error) {
        console.error("Gagal mengambil profil pengguna:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim() || !content.trim()) {
      alert("Judul, kategori, dan konten tidak boleh kosong.");
      return;
    }

    if (!user) {
      alert("Data user belum siap. Coba lagi sebentar.");
      return;
    }

    setLoading(true);

    try {
      await onPost({
        title,
        body: content, // ini HTML dari Quill
        category,
        user
      });

      setTitle("");
      setCategory("");
      setContent("");
    } catch (error) {
      alert("Gagal membuat postingan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form input-row">
      <div className="profile-wrapper">
        <img
          src={user?.avatar || "https://via.placeholder.com/40"}
          alt={user?.name || "User"}
          className="profile-photo"
        />
      </div>
      <div className="form-fields">
        <input
          type="text"
          placeholder="Judul"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategori"
          className="category-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        {/* Rich Text Editor */}
        <ReactQuill
          value={content}
          onChange={setContent}
          className="content-input"
          theme="snow"
        />

        <div className="submit-action">
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="btn-text">
              {loading ? "Mengirim..." : "Kirim"}
            </span>
            <span className="btn-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
