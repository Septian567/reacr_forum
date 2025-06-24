// src/features/thread/reducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchThreadDetail,
  fetchAllUsers,
  voteThread,
  voteComment,
  createComment,
} from './action';

const threadSlice = createSlice({
  name: 'thread',
  initialState: {
    threadDetail: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail: (state) => {
      state.threadDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('thread/') &&
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (action.payload?.id) {
            state.threadDetail = action.payload;
          }
        }
      );
  },
});

export const { clearThreadDetail } = threadSlice.actions;
export default threadSlice.reducer;
