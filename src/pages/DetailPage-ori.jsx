import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ThumbsUp, ThumbsDown } from 'react-feather';
import '../styles/detailPage.css';
import '../styles/postList.css';

import { formatDate } from '../utils/dateFormatter'; // <-- import di sini

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      try {
        const posts = JSON.parse(storedPosts);
        const foundPost = posts.find((p) => p.id.toString() === id);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Gagal parsing posts dari localStorage', error);
      }
    }
  }, [id]);

  const handleBack = () => navigate(-1);

  if (!post) {
    return (
      <div className="column center main-grid detail-page-container">
        <div className="back-button" onClick={handleBack}>
          <ArrowLeft size={18} />
          <span className="back-text">Back</span>
        </div>
        <p>Postingan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="column center main-grid detail-page-container">
      <div className="back-button" onClick={handleBack}>
        <ArrowLeft size={18} />
        <span className="back-text">Back</span>
      </div>

      <div className="post-item">
        <div className="profile-wrapper">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-photo"
          />
        </div>

        <div className="post-content-wrapper">
          <div className="post-header">
            <span className="account-name">{post.author}</span>
          </div>

          <h4 className="post-category">#{post.category}</h4>

          <p className="post-content">{post.content}</p>

          <span className="post-date" style={{ marginTop: '6px' }}>
            {formatDate(post.date, 'full')}
          </span>

          <div className="post-actions">
            <div className="action-item">
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </div>
            <div className="action-item">
              <ThumbsUp size={16} />
              <span>{post.upvotes}</span>
            </div>
            <div className="action-item">
              <ThumbsDown size={16} />
              <span>{post.downvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
