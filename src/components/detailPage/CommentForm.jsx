import React from 'react';
import ProfilePhoto from './ProfilePhoto';

const CommentForm = ({ author, comment, setComment, onSubmit, getPhoto }) => (
  <div className="comment-form">
    <ProfilePhoto username={author} getPhoto={getPhoto} />
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
