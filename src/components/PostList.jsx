import React from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "react-feather";
import { useNavigate } from "react-router-dom";
import PostDate from "./PostDate";
import "../styles/postList.css";

const PostList = ({ posts, onVote }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          className="post-item"
          key={post.id}
          onClick={() => handleNavigate(post.id)}
          style={{ cursor: "pointer" }}
        >
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
              <PostDate dateString={post.date} mode="auto" />
            </div>

            <h4 className="post-category">#{post.category}</h4>

            <div className="post-content-link">
              <p className="post-content">{post.content}</p>
            </div>

            <div className="post-actions">
              <div className="action-item" onClick={(e) => e.stopPropagation()}>
                <MessageCircle size={16} />
                <span>
                  {Array.isArray(post.comments)
                    ? post.comments.length
                    : post.comments}
                </span>
              </div>
              <div
                className="action-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(post.id, "up");
                }}
              >
                <ThumbsUp size={16} />
                <span>{post.upvotes}</span>
              </div>
              <div
                className="action-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(post.id, "down");
                }}
              >
                <ThumbsDown size={16} />
                <span>{post.downvotes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
