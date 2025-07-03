import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-bottom: 1px solid #ddd;
`;

export const RowLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 10px;
`;

export const NameSkeleton = styled.div`
  width: 100px;
  height: 16px;
  background-color: #eee;
  margin-bottom: 4px;
`;

export const EmailSkeleton = styled.div`
  width: 150px;
  height: 12px;
  background-color: #eee;
`;

export const ScoreSkeleton = styled.div`
  width: 60px;
  height: 16px;
  background-color: #eee;
`;
