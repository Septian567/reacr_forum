// store/posts/action.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Thunk: Fetch threads & users
export const fetchPostsAndUsers = createAsyncThunk(
  'posts/fetchPostsAndUsers',
  async (_, { rejectWithValue }) => {
    try {
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);

      const usersMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      const enrichedPosts = await Promise.all(
        threads.map(async (thread) => {
          try {
            const detail = await api.getThreadDetail(thread.id);
            const owner = usersMap[thread.ownerId];
            return {
              ...thread,
              ...detail,
              author: owner?.name || 'Anonim',
              avatar: owner?.avatar || 'https://via.placeholder.com/40',
              totalComments: detail.comments?.length || 0,
            };
          } catch {
            const owner = usersMap[thread.ownerId];
            return {
              ...thread,
              author: owner?.name || 'Anonim',
              avatar: owner?.avatar || 'https://via.placeholder.com/40',
              totalComments: 0,
            };
          }
        })
      );

      return { posts: enrichedPosts, usersMap };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk: Add new post
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (newPost, { rejectWithValue }) => {
    try {
      const response = await api.createThread(newPost);
      const threadId = response.data.thread.id;
      const detail = await api.getThreadDetail(threadId);

      return {
        ...detail,
        author: newPost.user?.name || 'Anonim',
        avatar: newPost.user?.avatar || 'https://via.placeholder.com/40',
        totalComments: detail.comments?.length || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk: Vote post
export const votePost = createAsyncThunk(
  'posts/votePost',
  async ({ postId, type }, { getState, rejectWithValue }) => {
    try {
      if (type === 'up') {
        await api.upVoteThread(postId);
      } else if (type === 'down') {
        await api.downVoteThread(postId);
      } else {
        await api.neutralizeVoteThread(postId);
      }

      const updated = await api.getThreadDetail(postId);
      const state = getState();
      const usersMap = state.posts.usersMap;
      const oldPost = state.posts.posts.find((p) => p.id === postId);

      return {
        ...updated,
        author: oldPost?.author || usersMap[updated.ownerId]?.name || 'Anonim',
        avatar:
          oldPost?.avatar ||
          usersMap[updated.ownerId]?.avatar ||
          'https://via.placeholder.com/40',
        totalComments: updated.comments?.length || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
