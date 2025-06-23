import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown } from 'react-feather';

const PostActions = ({
  comments,
  upvotes,
  downvotes,
  onVote,
  showComments = true,
}) => (
  <div className="post-actions">
    {showComments && comments !== undefined && (
      <div className="action-item">
        <MessageCircle size={16} />
        <span>{comments}</span>
      </div>
    )}
    <div
      className="action-item"
      onClick={() => onVote('up')}
      style={{ cursor: 'pointer' }}
    >
      <ThumbsUp size={16} />
      <span>{upvotes}</span>
    </div>
    <div
      className="action-item"
      onClick={() => onVote('down')}
      style={{ cursor: 'pointer' }}
    >
      <ThumbsDown size={16} />
      <span>{downvotes}</span>
    </div>
  </div>
);

export default PostActions;
