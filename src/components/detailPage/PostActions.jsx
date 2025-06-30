// postActions.jsx
import React from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  PostActionsWrapper,
  ActionItem,
  ActionButton,
} from "./PostActions.styles";

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
    <PostActionsWrapper>
      {showComments && comments !== undefined && (
        <ActionItem>
          <MessageCircle size={16} />
          <span>{comments}</span>
        </ActionItem>
      )}

      <ActionButton
        onClick={(e) => handleClick(e, "up")}
        className={hasUpvoted ? "voted" : ""}
      >
        <ThumbsUp
          size={16}
          fill={hasUpvoted ? "black" : "none"}
          stroke={hasUpvoted ? "black" : "#555"}
          strokeWidth={2}
        />
        <span>{upvotes}</span>
      </ActionButton>

      <ActionButton
        onClick={(e) => handleClick(e, "down")}
        className={hasDownvoted ? "voted" : ""}
      >
        <ThumbsDown
          size={16}
          fill={hasDownvoted ? "black" : "none"}
          stroke={hasDownvoted ? "black" : "#555"}
          strokeWidth={2}
        />
        <span>{downvotes}</span>
      </ActionButton>
    </PostActionsWrapper>
  );
};

export default PostActions;
