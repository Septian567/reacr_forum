import React, { useState } from 'react';
import '../styles/postForm.css';

const PostForm = ({ onPost }) => {
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (category.trim() && content.trim()) {
      onPost(category, content);
      setCategory('');
      setContent('');
    }
  };

  return (
    <div className="post-form input-row">
      <div className="profile-wrapper">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-photo"
        />
      </div>
      <div className="form-fields">
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
          <button className="submit-btn" onClick={handleSubmit}>
            <span className="btn-text">Kirim</span>
            <span className="btn-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
