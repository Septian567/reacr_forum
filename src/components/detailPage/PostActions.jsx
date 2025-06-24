import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

const PostActions = ({
  comments,
  upvotes,
  downvotes,
  onVote,
  hasUpvoted,
  hasDownvoted,
  showComments = true,
}) => {
  const handleClick = (e, type) => {
    e.stopPropagation();
    onVote(type);
  };

  return (
    <div className="post-actions">
      {showComments && comments !== undefined && (
        <div className="action-item">
          <MessageCircle size={16} />
          <span>{comments}</span>
        </div>
      )}
      <button
        className="action-item"
        onClick={(e) => handleClick(e, 'up')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <ThumbsUp
          size={16}
          fill={hasUpvoted ? 'black' : 'none'}
          stroke={hasUpvoted ? 'black' : '#555'}
          strokeWidth={2}
        />
        <span>{upvotes}</span>
      </button>
      <button
        className="action-item"
        onClick={(e) => handleClick(e, 'down')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <ThumbsDown
          size={16}
          fill={hasDownvoted ? 'black' : 'none'}
          stroke={hasDownvoted ? 'black' : '#555'}
          strokeWidth={2}
        />
        <span>{downvotes}</span>
      </button>
    </div>
  );
};

export default PostActions;
