import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateFormatter';

const DateText = styled.span`
  font-size: 0.75rem;
  color: #888;
  margin-top: 4px;
`;

const PostDate = ({ dateString, mode = 'auto' }) => {
  return <DateText>{formatDate(dateString, mode)}</DateText>;
};

export default PostDate;
