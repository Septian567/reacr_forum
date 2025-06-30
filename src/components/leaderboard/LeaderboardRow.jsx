import React from "react";
import {
  RowItem,
  UserInfo,
  Avatar,
  UserDetails,
  UserName,
  UserEmail,
  ScoreText,
  CurrentUserTag,
} from "./LeaderboardRow.styles";

const LeaderboardRow = ({ leaderboard, index, isCurrentUser }) => (
  <RowItem $highlight={isCurrentUser}>
    <UserInfo>
      <Avatar
        src={`https://i.pravatar.cc/40?img=${index + 1}`}
        alt={leaderboard.user.name}
      />
      <UserDetails>
        <UserName>
          {leaderboard.user.name}
          {isCurrentUser && <CurrentUserTag>(Anda)</CurrentUserTag>}
        </UserName>
        <UserEmail>{leaderboard.user.email}</UserEmail>
      </UserDetails>
    </UserInfo>
    <ScoreText>{leaderboard.score} poin</ScoreText>
  </RowItem>
);

export default LeaderboardRow;
