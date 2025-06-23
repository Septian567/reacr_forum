// src/features/thread/threadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchThreadDetail = createAsyncThunk(
  'thread/fetchDetail',
  async (id, thunkAPI) => {
    return await api.getThreadDetail(id);
  }
);

export const fetchAllUsers = createAsyncThunk(
  'thread/fetchUsers',
  async () => await api.getAllUsers()
);

export const voteThread = createAsyncThunk(
  'thread/voteThread',

  async ({ id, type }, thunkAPI) => {
    const fn = type === 'up' ? api.upVoteThread : api.downVoteThread;
    await fn(id);
    return await api.getThreadDetail(id); // update setelah vote
  }
);

export const voteComment = createAsyncThunk(
  'thread/voteComment',
  async ({ threadId, commentId, type }) => {
    const fn = type === 'up' ? api.upVoteComment : api.downVoteComment;
    await fn({ threadId, commentId });
    return await api.getThreadDetail(threadId);
  }
);

export const createComment = createAsyncThunk(
  'thread/createComment',
  async ({ threadId, content }) => {
    await api.createComment({ threadId, content });
    return await api.getThreadDetail(threadId);
  }
);

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
      // Handle other async thunks similarly
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
