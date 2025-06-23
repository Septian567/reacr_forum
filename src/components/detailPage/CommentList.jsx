import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import PostActions from './PostActions';
import { formatDate } from '../../utils/dateFormatter';

const CommentList = ({ comments, onVote, getPhoto }) => (
  <div className="comment-list">
    <h4>{comments.length} Komentar:</h4>
    {comments.length === 0 ? (
      <p>Belum ada komentar.</p>
    ) : (
      comments.map((c) => (
        <div key={c.id} className="comment-list-item">
          <ProfilePhoto username={c.owner.name} getPhoto={getPhoto} />
          <div style={{ flex: 1 }}>
            <div className="comment-header">
              <span className="comment-author">{c.owner.name}</span>
              <span className="comment-meta">{formatDate(c.createdAt)}</span>
            </div>
            <div
              className="comment-content"
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
            <PostActions
              upvotes={c.upVotesBy?.length || 0}
              downvotes={c.downVotesBy?.length || 0}
              onVote={(type) => onVote(c.id, type)}
              showComments={false}
            />
          </div>
        </div>
      ))
    )}
  </div>
);

export default CommentList;
