import React from "react";
import DOMPurify from "dompurify";
import PostDate from "./PostDate";
import PostActions from "../detailPage/PostActions";
import usePostList from "../../hooks/usePostList";
import {
  PostListWrapper,
  PostItem,
  PostContentWrapper,
  PostHeader,
  AccountName,
  PostCategory,
  PostContent,
} from "./PostList.styles";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.2rem 0;
  color: #222;
`;

const PostContentLink = styled.div`
  text-decoration: none;
`;

const PostList = ({ posts, onVote, userId }) => {
  const { handleNavigate, hasUpvoted, hasDownvoted } = usePostList(userId);

  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          onClick={() => handleNavigate(post.id)}
          style={{ cursor: "pointer" }}
        >
          <ProfileWrapper>
            <ProfilePhoto
              src={post.avatar || "https://via.placeholder.com/40"}
              alt={post.author || "User"}
            />
          </ProfileWrapper>

          <PostContentWrapper
            to={`/posts/${post.id}`}
            onClick={(e) => e.preventDefault()}
          >
            <PostHeader>
              <AccountName>{post.author || "Anonim"}</AccountName>
              <PostDate dateString={post.createdAt} mode="auto" />
            </PostHeader>

            <PostTitle>{post.title?.trim() ? post.title : "judul"}</PostTitle>
            <PostCategory>#{post.category}</PostCategory>

            <PostContentLink>
              <PostContent
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.body),
                }}
              />
            </PostContentLink>

            <div onClick={(e) => e.stopPropagation()}>
              <PostActions
                comments={post.totalComments ?? post.comments?.length ?? 0}
                upvotes={post.upVotesBy?.length ?? 0}
                downvotes={post.downVotesBy?.length ?? 0}
                hasUpvoted={hasUpvoted(post)}
                hasDownvoted={hasDownvoted(post)}
                onVote={(type) => onVote(post.id, type)}
              />
            </div>
          </PostContentWrapper>
        </PostItem>
      ))}
    </PostListWrapper>
  );
};

export default PostList;
