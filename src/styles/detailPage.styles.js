// DetailPage.styled.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  border-radius: 10px;
  box-shadow: none;
  gap: 8px;
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  color: #3a86ff;
  font-weight: 500;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackText = styled.span`
  font-size: 1rem;
`;

export const Heading = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin: 4px 0;
`;

export const Strong = styled.strong`
  color: #000;
`;

export const PostDate = styled.span`
  font-size: 0.75rem;
  color: #888;
  margin-top: 4px;
`;
