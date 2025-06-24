import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboardData } from './action';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
