// styles/CommentList.styles.js
import styled from "styled-components";

export const CommentListContainer = styled.div`
  margin-top: 30px;
`;

export const CommentListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
`;

export const SpacedDate = styled.span`
  display: block;
  margin-top: 1.2rem;
  color: #666;
`;

export const PostDate = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 5px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const CommentMeta = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

export const CommentVotes = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 2rem;
`;

export const VoteButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 4px;
  }
`;
