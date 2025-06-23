import React from 'react';
import { ArrowLeft } from 'react-feather';

const PostHeader = ({ onBack }) => (
  <div className="post-header">
    <div className="back-button" onClick={onBack}>
      <ArrowLeft size={18} />
      <span className="back-text">Back</span>
    </div>
  </div>
);

export default PostHeader;
