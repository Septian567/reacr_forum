import React from 'react';
import { formatDate } from '../../utils/dateFormatter';

const PostDate = ({ dateString, mode = 'auto' }) => {
  return <span className="post-date">{formatDate(dateString, mode)}</span>;
};

export default PostDate;
