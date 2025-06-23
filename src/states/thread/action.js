// src/features/thread/action.js
import { createAsyncThunk } from '@reduxjs/toolkit';
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
    return await api.getThreadDetail(id);
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
