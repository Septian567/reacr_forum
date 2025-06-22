import React from "react";
import "../styles/CommentForm.css"; // pastikan path sesuai

const CommentForm = ({ author, comment, setComment, onSubmit }) => (
  <div className="comment-form">
    <div className="form-wrapper">
      <div className="reply-label">Replying to @{author}</div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar Anda..."
      />
      <button onClick={onSubmit}>Kirim Komentar</button>
    </div>
  </div>
);

export default CommentForm;
