import React from "react";
import { formatDate } from "../utils/dateFormatter";
import { ThumbsUp, ThumbsDown } from "react-feather";
import "../styles/CommentList.css"; // pastikan path-nya sesuai struktur project kamu

const CommentList = ({ comments, onVote }) => (
  <div className="comment-list">
    <h4>Komentar:</h4>
    {comments.length === 0 ? (
      <p>Belum ada komentar.</p>
    ) : (
      comments.map((c) => (
        <div key={c.id} className="comment-list-item">
          <div style={{ flex: 1 }}>
            <span className="comment-author">{c.author}</span>{" "}
            <span className="comment-meta">• {formatDate(c.date)}</span>
            <p className="comment-content">{c.content}</p>
            <div className="comment-votes">
              <div className="vote-button" onClick={() => onVote(c.id, "up")}>
                <ThumbsUp size={16} />
                <span>{c.upvotes || 0}</span>
              </div>
              <div className="vote-button" onClick={() => onVote(c.id, "down")}>
                <ThumbsDown size={16} />
                <span>{c.downvotes || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

export default CommentList;
