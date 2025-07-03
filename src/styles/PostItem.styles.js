import styled from 'styled-components';

export const PostItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountName = styled.span`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const PostCategory = styled.h4`
  color: #007bff;
  margin: 0.2rem 0;
`;

export const PostTitle = styled.h3`
  margin: 0.5rem 0;
`;

export const PostDetailContent = styled.div`
  margin-top: 0.5rem;
  line-height: 1.5;
`;

export const PostDate = styled.span`
  display: block;
  margin-top: 1.2rem;
  color: #666;
`;
