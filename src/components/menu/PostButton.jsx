import React from 'react';
import { Plus } from 'react-feather';

const PostButton = ({ onClick }) => (
  <div className="post-button-container">
    <button className="post-button mobile-post-button" onClick={onClick}>
      <Plus size={20} />
      <span className="desktop-only-text">Post</span>
    </button>
  </div>
);

export default PostButton;
