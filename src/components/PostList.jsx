import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import PostDate from './PostDate';
import DOMPurify from 'dompurify';
import '../styles/postList.css';
import { useDispatch, useSelector } from 'react-redux';
import { votePost, selectFilteredPosts } from '../features/posts/postSlice';

const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  const handleVote = (postId, type) => {
    dispatch(votePost({ postId, type }));
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          className="post-item"
          key={post.id}
          onClick={() => handleNavigate(post.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="profile-wrapper">
            <img
              src={post.avatar || 'https://via.placeholder.com/40'}
              alt={post.author || 'User'}
              className="profile-photo"
            />
          </div>

          <div className="post-content-wrapper">
            <div className="post-header">
              <span className="account-name">{post.author || 'Anonim'}</span>
              <PostDate dateString={post.createdAt} mode="auto" />
            </div>

            <h4 className="post-title">
              {post.title?.trim() ? post.title : 'judul'}
            </h4>

            <h5 className="post-category">#{post.category}</h5>

            <div className="post-content-link">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.body),
                }}
              ></div>
            </div>

            <div className="post-actions">
              <div className="action-item" onClick={(e) => e.stopPropagation()}>
                <MessageCircle size={16} />
                <span>{post.totalComments ?? post.comments?.length ?? 0}</span>
              </div>
              <div
                className="action-item"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(post.id, 'up');
                }}
              >
                <ThumbsUp size={16} />
                <span>{post.upVotesBy?.length ?? 0}</span>
              </div>
              <div
                className="action-item"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(post.id, 'down');
                }}
              >
                <ThumbsDown size={16} />
                <span>{post.downVotesBy?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
