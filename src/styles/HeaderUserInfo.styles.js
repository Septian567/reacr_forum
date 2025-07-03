import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 10px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameSkeleton = styled.div`
  width: 120px;
  height: 16px;
  background-color: #eee;
  margin-bottom: 4px;
`;

export const EmailSkeleton = styled.div`
  width: 180px;
  height: 12px;
  background-color: #eee;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

export const UserEmail = styled.span`
  font-size: 0.85rem;
  color: #666;
`;
