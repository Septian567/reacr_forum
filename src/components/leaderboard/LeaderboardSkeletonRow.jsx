import React from "react";
import {
  Row,
  RowLeft,
  AvatarSkeleton,
  NameSkeleton,
  EmailSkeleton,
  ScoreSkeleton,
} from "./LeaderboardSkeletonRow.styles";

const LeaderboardSkeletonRow = () => {
  return (
    <Row>
      <RowLeft>
        <AvatarSkeleton />
        <div>
          <NameSkeleton />
          <EmailSkeleton />
        </div>
      </RowLeft>
      <ScoreSkeleton />
    </Row>
  );
};

export default LeaderboardSkeletonRow;
