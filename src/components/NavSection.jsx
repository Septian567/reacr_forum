// src/components/NavSection.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  BarChart,
  LogOut,
  LogIn,
  Plus,
  X,
  User,
} from 'react-feather';
import '../styles/NavSection.css';
import '../styles/postModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logout } from '../features/auth/authSlice';
import { addNewPost } from '../features/posts/postSlice';

// --- Modal Posting ---
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

// --- Komponen Utama ---
const NavSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      setShowModal(false);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Judul dan isi postingan tidak boleh kosong.');
      return;
    }

    try {
      await dispatch(
        addNewPost({
          title: postTitle,
          body: postContent,
          category: category || 'umum',
          user,
        })
      ).unwrap();

      setPostTitle('');
      setPostContent('');
      setCategory('');
      setShowModal(false);
    } catch (err) {
      alert(`Gagal membuat postingan: ${  err}`);
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
            style={{ cursor: 'pointer' }}
          >
            <LogOut size={20} className="nav-icon" />
            <span className="nav-text">Logout</span>
          </div>
        ) : (
          <div
            className="nav-item"
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          >
            <LogIn size={20} className="nav-icon" />
            <span className="nav-text">Login</span>
          </div>
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
