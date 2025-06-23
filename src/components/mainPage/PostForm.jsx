import React from 'react';
import { User as UserIcon } from 'react-feather';
import usePostForm from '../../hooks/usePostForm';
import '../../styles/postForm.css';

const PostForm = ({ onPost }) => {
  const {
    title,
    category,
    content,
    loading,
    user,
    setTitle,
    setCategory,
    setContent,
    handleSubmit,
  } = usePostForm(onPost);

  return (
    <div className="post-form input-row">
      <div className="profile-wrapper">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'User'}
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
              {loading ? 'Mengirim...' : 'Kirim'}
            </span>
            <span className="btn-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
