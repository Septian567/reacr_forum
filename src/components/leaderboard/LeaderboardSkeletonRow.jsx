import React from 'react';
import '../../styles/LeaderboardSkeletonRow.css';

const LeaderboardSkeletonRow = () => {
  return (
    <div className="leaderboard-row">
      <div className="leaderboard-row-left">
        <div className="skeleton-avatar" />
        <div>
          <div className="skeleton-name" />
          <div className="skeleton-email" />
        </div>
      </div>
      <div className="skeleton-score" />
    </div>
  );
};

export default LeaderboardSkeletonRow;
