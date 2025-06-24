// store/leaderboard/action.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const CACHE_TTL = 5 * 60 * 1000;

const cache = {
  data: null,
  lastFetch: 0,
  ttl: CACHE_TTL,
  get: () => {
    const now = Date.now();
    return cache.lastFetch + cache.ttl > now ? cache.data : null;
  },
  set: (data) => {
    cache.data = data;
    cache.lastFetch = Date.now();
  },
};

export const fetchLeaderboardData = createAsyncThunk(
  'leaderboard/fetch',
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
