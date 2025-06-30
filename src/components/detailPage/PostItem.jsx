import React from "react";
import DOMPurify from "dompurify";
import ProfilePhoto from "./ProfilePhoto";
import PostActions from "./PostActions";
import { formatDate } from "../../utils/dateFormatter";
import {
  PostItemWrapper,
  PostContentWrapper,
  AccountName,
  PostCategory,
  PostTitle,
  PostDetailContent,
  PostDate,
} from "./PostItem.styles";

const PostItem = ({ post, onVote, getPhoto }) => (
  <PostItemWrapper>
    <ProfilePhoto username={post.owner.name} getPhoto={getPhoto} />
    <PostContentWrapper>
      <AccountName>{post.owner.name}</AccountName>
      <PostCategory>#{post.category}</PostCategory>
      <PostTitle>{post.title}</PostTitle>
      <PostDetailContent
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
      />
      <PostDate>{formatDate(post.createdAt, "full")}</PostDate>
      <PostActions
        comments={post.comments?.length}
        upvotes={post.upVotesBy?.length}
        downvotes={post.downVotesBy?.length}
        onVote={onVote}
      />
    </PostContentWrapper>
  </PostItemWrapper>
);

export default PostItem;
