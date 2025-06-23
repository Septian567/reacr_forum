import React from 'react';
import '../../styles/postSkeleton.css';

const DetailSkeleton = () => {
  return (
    <div className="post-skeleton detail-skeleton">
      <div className="skeleton-avatar" />
      <div className="skeleton-content">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-actions">
          <div className="skeleton-button" />
          <div className="skeleton-button" />
          <div className="skeleton-button" />
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;