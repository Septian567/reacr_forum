import React from 'react';
import DOMPurify from 'dompurify';
import ProfilePhoto from './ProfilePhoto';
import PostActions from './PostActions';
import { formatDate } from '../../utils/dateFormatter';

const PostItem = ({ post, onVote, getPhoto }) => (
  <div className="post-item">
    <ProfilePhoto username={post.owner.name} getPhoto={getPhoto} />
    <div className="post-content-wrapper">
      <span className="account-name">{post.owner.name}</span>
      <h4 className="post-category">#{post.category}</h4>
      <h3 className="post-title">{post.title}</h3>
      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
      />
      <span className="post-date spaced-date">
        {formatDate(post.createdAt, 'full')}
      </span>
      <PostActions
        comments={post.comments?.length}
        upvotes={post.upVotesBy?.length}
        downvotes={post.downVotesBy?.length}
        onVote={onVote}
      />
    </div>
  </div>
);

export default PostItem;
