import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import useLeaderboardData from '../hooks/useLeaderboardData';
import HeaderUserInfo from '../components/leaderboard/HeaderUserInfo';
import LeaderboardHeader from '../components/leaderboard/LeaderboardHeader';
import LeaderboardRow from '../components/leaderboard/LeaderboardRow';
import LeaderboardSkeletonRow from '../components/leaderboard/LeaderboardSkeletonRow';

const Leaderboard = () => {
  const navigate = useNavigate();
  const {
    progress,
    setProgress,
    currentUser,
    isUserLoading,
    leaderboards,
    isLeaderboardLoading,
  } = useLeaderboardData();

  const isInitialLoad = isUserLoading || isLeaderboardLoading;
  const displayName = currentUser?.name || 'Anonim';
  const displayEmail = currentUser?.email || '-';

  return (
    <div className="column center main-grid">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <HeaderUserInfo
        isUserLoading={isUserLoading}
        displayName={displayName}
        displayEmail={displayEmail}
        onBack={() => navigate('/')}
      />

      <h2 style={{ marginBottom: '20px' }}>Klasemen Pengguna Aktif</h2>

      <LeaderboardHeader />

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: '10px',
          width: '100%',
        }}
      >
        {isInitialLoad
          ? [...Array(5)].map((_, index) => (
            <LeaderboardSkeletonRow key={index} />
          ))
          : leaderboards.map((leaderboard, index) => {
            const isCurrentUser =
                currentUser?.id && leaderboard.user.id === currentUser.id;

            return (
              <LeaderboardRow
                key={leaderboard.user.id}
                leaderboard={leaderboard}
                index={index}
                isCurrentUser={isCurrentUser}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Leaderboard;
