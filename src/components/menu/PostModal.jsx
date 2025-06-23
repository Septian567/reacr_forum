import React from 'react';
import { X, User } from 'react-feather';
import '../../styles/postModal.css';

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
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="profile"
              className="profile-image"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
          ) : (
            <div
              className="profile-icon-circle"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
              }}
            >
              <User size={20} color="#fff" />
            </div>
          )}
          <span className="username" style={{ fontWeight: 'bold' }}>
            {user?.name || 'Anonim'}
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

export default PostModal;
