import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import authReducer from "./features/auth/authSlice";
import threadReducer from "./features/thread/threadSlice";
import userReducer from "./features/user/userSlice";
import leaderboardReducer from "./features/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    thread: threadReducer,
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
});
