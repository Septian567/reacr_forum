import styled from 'styled-components';

export const RowItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-bottom: 1px solid #ddd;
  background-color: ${({ $highlight }) =>
    $highlight ? '#f5f5f5' : 'transparent'};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserDetails = styled.div``;

export const UserName = styled.div`
  font-weight: bold;
`;

export const CurrentUserTag = styled.span`
  margin-left: 5px;
  color: #4caf50;
  font-size: 0.8em;
`;

export const UserEmail = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

export const ScoreText = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;
