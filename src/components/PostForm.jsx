import React, { useState } from "react";
import { User as UserIcon } from "react-feather";
import { useSelector } from "react-redux";
import "../styles/postForm.css";

const PostForm = ({ onPost }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

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
        body: content,
        category,
        user,
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
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="profile-photo"
          />
        ) : (
          <div className="profile-photo circle-icon">
            <UserIcon size={20} />
          </div>
        )}
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
        <textarea
          placeholder="Isi konten..."
          className="content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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
