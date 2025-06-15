import React from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "react-feather";
import { Link } from "react-router-dom";
import PostDate from "./PostDate";
import "../styles/postList.css";

const PostList = ({ posts, onVote }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post-item" key={post.id}>
          <div className="profile-wrapper">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-photo"
            />
          </div>
          <Link to={`/post/${post.id}`} className="post-content-wrapper">
            <div className="post-header">
              <span className="account-name">{post.author}</span>
              {/* Panggil PostDate di sini */}
              <PostDate dateString={post.date} mode="auto" />
            </div>

            <h4 className="post-category">#{post.category}</h4>
            <div className="post-content-link">
              <p className="post-content">{post.content}</p>
            </div>

            <div className="post-actions">
              <div className="action-item">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </div>
              <div
                className="action-item"
                onClick={() => onVote(post.id, "up")}
              >
                <ThumbsUp size={16} />
                <span>{post.upvotes}</span>
              </div>
              <div
                className="action-item"
                onClick={() => onVote(post.id, "down")}
              >
                <ThumbsDown size={16} />
                <span>{post.downvotes}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
