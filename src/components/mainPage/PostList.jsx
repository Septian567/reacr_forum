// src/components/post/PostList.jsx
import React from 'react';
import DOMPurify from 'dompurify';
import PostDate from './PostDate';
import PostActions from '../detailPage/PostActions';
import usePostList from '../../hooks/usePostList';
import '../../styles/postList.css';

const PostList = ({ posts, onVote, userId }) => {
  const { handleNavigate, hasUpvoted, hasDownvoted } = usePostList(userId);

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
              />
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <PostActions
                comments={post.totalComments ?? post.comments?.length ?? 0}
                upvotes={post.upVotesBy?.length ?? 0}
                downvotes={post.downVotesBy?.length ?? 0}
                hasUpvoted={hasUpvoted(post)}
                hasDownvoted={hasDownvoted(post)}
                onVote={(type) => onVote(post.id, type)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
