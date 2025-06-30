// CategoryList.styles.js
import styled from "styled-components";
import { Hash } from "react-feather";

export const CategoriesSection = styled.div`
  margin-top: 1.5rem;

  @media (max-width: 675px) {
    display: none;
  }
`;

export const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(4px);
  }

  @media (max-width: 800px) {
    padding: 0.6rem 0.8rem;
  }

  &.selected {
    background-color: #e6f0ff;
  }
`;

export const CategoryContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const HashtagIcon = styled(Hash)`
  color: #4299e1;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

export const CategoryText = styled.span`
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 800px) {
    font-size: 0.85rem;
  }
`;

export const CategoryCount = styled.span`
  color: #718096;
  font-size: 0.8rem;

  @media (max-width: 800px) {
    display: none;
  }
`;
