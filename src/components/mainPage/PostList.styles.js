// components/PostList/PostList.styles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PostItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0px;
  border-bottom: 1px solid #cfcaca;
`;

export const PostContentWrapper = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const AccountName = styled.span`
  font-weight: 600;
  color: #333;
`;

export const PostCategory = styled.div`
  font-size: 0.95rem;
  font-weight: bold;
  color: #3a86ff;
  margin-bottom: 0.7rem;
`;

export const PostContent = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  text-decoration: none;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: ${({ voted }) => (voted ? "#000" : "#555")};
  transition: color 0.2s ease;

  &:hover {
    color: #3a86ff;
  }
`;
