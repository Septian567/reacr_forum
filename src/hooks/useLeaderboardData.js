// hooks/useLeaderboardData.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardData } from '../features/leaderboard/leaderboardSlice';
import { fetchUserProfile } from '../features/user/userSlice';

const useLeaderboardData = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const { profile: currentUser, loading: isUserLoading } = useSelector(
    (state) => state.user
  );
  const { data: leaderboards, loading: isLeaderboardLoading } = useSelector(
    (state) => state.leaderboard
  );

  useEffect(() => {
    setProgress(30);
    dispatch(fetchUserProfile()).then(() => setProgress(60));
    dispatch(fetchLeaderboardData()).then(() => setProgress(100));
  }, [dispatch]);

  return {
    progress,
    setProgress,
    currentUser,
    isUserLoading,
    leaderboards,
    isLeaderboardLoading,
  };
};

export default useLeaderboardData;
