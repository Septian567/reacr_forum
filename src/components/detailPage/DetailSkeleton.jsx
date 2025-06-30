import React from "react";
import {
  PostSkeletonWrapper,
  SkeletonAvatar,
  SkeletonContent,
  SkeletonLine,
  SkeletonActions,
  SkeletonButton,
} from "./PostSkeleton.styles";

const DetailSkeleton = () => {
  return (
    <PostSkeletonWrapper style={{ flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <SkeletonAvatar />
        <SkeletonContent>
          <SkeletonLine className="short" />
        </SkeletonContent>
      </div>

      <SkeletonContent style={{ marginTop: "1rem" }}>
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
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

export default DetailSkeleton;
