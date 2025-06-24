import { configureStore } from '@reduxjs/toolkit';
import postReducer from './posts/reducer';
import authReducer from './auth/reducer';
import threadReducer from './thread/reducer';
import userReducer from './user/reducer';
import leaderboardReducer from './leaderboard/reducer';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    thread: threadReducer,
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
});
