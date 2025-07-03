// src/components/post/PostSkeleton.jsx
import React from 'react';
import {
  PostSkeletonWrapper,
  SkeletonAvatar,
  SkeletonContent,
  SkeletonLine,
  SkeletonActions,
  SkeletonButton,
} from '../../styles/PostSkeleton.styles';

const PostSkeleton = () => {
  return (
    <PostSkeletonWrapper>
      <SkeletonAvatar />
      <SkeletonContent>
        <SkeletonLine short />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonActions>
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </SkeletonActions>
      </SkeletonContent>
    </PostSkeletonWrapper>
  );
};

export default PostSkeleton;
