// PostActions.styled.js
import styled from 'styled-components';

export const PostActionsWrapper = styled.div`
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
  color: #555;
  transition: color 0.2s ease;

  &:hover {
    color: #3a86ff;
  }

  &.voted {
    color: #000;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #555;
  transition: color 0.2s ease;

  &:hover {
    color: #3a86ff;
  }

  &.voted {
    color: #000;
  }
`;
