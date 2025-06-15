import React, { useState } from 'react';
import '../styles/columns.css';
import '../styles/post.css';
import {
  FiPlus,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
} from 'react-icons/fi';
import ProfilePhoto from '../components/ProfilePhoto';

const ThreadsPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'hanje',
      handle: '@hanjel',
      avatar:
        'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRp2cUQ4xccxorojRxTNO91338T49Xk4WX2cp3vqDOG6aW-oAyYcbQqLwkFed8LoyCOXase-R068V5Lfyg',
      content: 'Ini adalah contoh post pertama di Threads!',
      category: 'Technology',
      date: 'Apr 19',
      comments: 3,
      upvotes: 5,
      downvotes: 1,
    },
  ]);

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      username: 'hanje',
      handle: '@hanjel',
      avatar:
        'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRp2cUQ4xccxorojRxTNO91338T49Xk4WX2cp3vqDOG6aW-oAyYcbQqLwkFed8LoyCOXase-R068V5Lfyg',
      content,
      category: category || 'General',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      comments: 0,
      upvotes: 0,
      downvotes: 0,
    };

    setPosts([newPost, ...posts]);
    setContent('');
    setCategory('');
  };

  const handleVote = (postId, type) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes: type === 'up' ? post.upvotes + 1 : post.upvotes,
            downvotes: type === 'down' ? post.downvotes + 1 : post.downvotes,
          };
        }
        return post;
      })
    );
  };

  const handleComment = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="column center">
      {/* Post Creation Form */}
      <div className="post-container compact">
        <div className="input-row">
          <div className="form-profile-wrapper">
            <ProfilePhoto
              src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRp2cUQ4xccxorojRxTNO91338T49Xk4WX2cp3vqDOG6aW-oAyYcbQqLwkFed8LoyCOXase-R068V5Lfyg"
              alt="Profile"
              size="medium"
            />
          </div>
          <input
            type="text"
            placeholder="Pilih kategori..."
            className="category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="input-row content-row">
          <div className="form-profile-wrapper"></div>
          <textarea
            placeholder="Apa yang sedang Anda pikirkan?"
            className="content-input compact"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
          />
        </div>

        <div className="submit-action">
          <button className="submit-btn" onClick={handlePost}>
            <span className="btn-text">Post</span>
            <FiPlus className="btn-icon" />
          </button>
        </div>
      </div>
      <div className="divider-line"></div>

      {/* Posts List */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-header">
              <div className="post-profile-wrapper">
                <ProfilePhoto
                  src={post.avatar}
                  alt={post.username}
                  size="medium"
                />
              </div>
              <div className="post-user-info-container">
                <div className="post-user-info">
                  <span className="post-username">{post.username}</span>
                  <span className="post-handle">{post.handle}</span>
                </div>
                <span className="post-date">{post.date}</span>
              </div>
            </div>
            <div className="post-category">{post.category}</div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button
                className="post-action"
                onClick={() => handleComment(post.id)}
              >
                <FiMessageSquare className="action-icon comment-icon" />
                <span className="action-count">{post.comments}</span>
              </button>
              <button
                className="post-action"
                onClick={() => handleVote(post.id, 'up')}
              >
                <FiThumbsUp className="action-icon upvote-icon" />
                <span className="action-count">{post.upvotes}</span>
              </button>
              <button
                className="post-action"
                onClick={() => handleVote(post.id, 'down')}
              >
                <FiThumbsDown className="action-icon downvote-icon" />
                <span className="action-count">{post.downvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadsPage;
