// src/redux/slices/leaderboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const cache = {
  data: null,
  lastFetch: 0,
  ttl: 5 * 60 * 1000,
  get: () => {
    const now = Date.now();
    return cache.lastFetch + cache.ttl > now ? cache.data : null;
  },
  set: (data) => {
    cache.data = data;
    cache.lastFetch = Date.now();
  },
};

// Async thunk for leaderboard data
export const fetchLeaderboardData = createAsyncThunk(
  "leaderboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const cached = cache.get();
      if (cached) return cached;

      const data = await api.getLeaderboards();
      cache.set(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.loading = true;
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
