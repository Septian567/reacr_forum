import React from 'react';
import {
  PostSkeletonWrapper,
  SkeletonAvatar,
  SkeletonContent,
  SkeletonLine,
  SkeletonActions,
  SkeletonButton,
} from '../../styles/PostSkeleton.styles';

const DetailSkeleton = () => {
  return (
    <PostSkeletonWrapper style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <SkeletonAvatar data-testid="skeleton-avatar" />
        <SkeletonContent>
          <SkeletonLine className="short" data-testid="skeleton-line-short" />
        </SkeletonContent>
      </div>

      <SkeletonContent style={{ marginTop: '1rem' }}>
        <SkeletonLine data-testid="skeleton-line" />
        <SkeletonLine data-testid="skeleton-line" />
        <SkeletonLine data-testid="skeleton-line" />
        <SkeletonLine data-testid="skeleton-line" />
        <SkeletonLine data-testid="skeleton-line" />
        <SkeletonActions>
          <SkeletonButton data-testid="skeleton-button" />
          <SkeletonButton data-testid="skeleton-button" />
          <SkeletonButton data-testid="skeleton-button" />
        </SkeletonActions>
      </SkeletonContent>
    </PostSkeletonWrapper>
  );
};

export default DetailSkeleton;
