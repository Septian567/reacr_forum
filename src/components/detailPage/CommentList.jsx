import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import PostActions from "./PostActions";
import { formatDate } from "../../utils/dateFormatter";

import {
  CommentListContainer,
  CommentListItem,
  CommentHeader,
  CommentAuthor,
  CommentMeta,
} from "./CommentList.styles";

const CommentList = ({ comments, onVote, getPhoto }) => (
  <CommentListContainer>
    <h4>{comments.length} Komentar:</h4>
    {comments.length === 0 ? (
      <p>Belum ada komentar.</p>
    ) : (
      comments.map((c) => (
        <CommentListItem key={c.id}>
          <ProfilePhoto username={c.owner.name} getPhoto={getPhoto} />
          <div style={{ flex: 1 }}>
            <CommentHeader>
              <CommentAuthor>{c.owner.name}</CommentAuthor>
              <CommentMeta>{formatDate(c.createdAt)}</CommentMeta>
            </CommentHeader>
            <div dangerouslySetInnerHTML={{ __html: c.content }} />
            <PostActions
              upvotes={c.upVotesBy?.length || 0}
              downvotes={c.downVotesBy?.length || 0}
              onVote={(type) => onVote(c.id, type)}
              showComments={false}
            />
          </div>
        </CommentListItem>
      ))
    )}
  </CommentListContainer>
);

export default CommentList;
