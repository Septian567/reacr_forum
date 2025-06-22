// features/posts/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk
export const fetchPostsAndUsers = createAsyncThunk(
  "posts/fetchPostsAndUsers",
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

      const enrichThread = (thread) => {
        const owner = usersMap[thread.ownerId];
        return {
          ...thread,
          author: owner?.name || "Anonim",
          avatar: owner?.avatar || "https://via.placeholder.com/40",
          totalComments: thread.comments?.length || 0,
          upVotesBy: thread.upVotesBy || [],
          downVotesBy: thread.downVotesBy || [],
        };
      };

      const enriched = await Promise.all(
        threads.map(async (thread) => {
          try {
            const detail = await api.getThreadDetail(thread.id);
            return enrichThread({ ...thread, comments: detail.comments });
          } catch {
            return enrichThread(thread);
          }
        })
      );

      return { enrichedPosts: enriched, usersMap };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    usersMap: {},
    comments: {},
    selectedCategory: null,
    isLoading: false,
  },
  reducers: {
    toggleCategoryFilter(state, action) {
      state.selectedCategory =
        state.selectedCategory === action.payload ? null : action.payload;
    },
    updatePostData(state, action) {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1)
        state.posts[index] = { ...state.posts[index], ...action.payload };
    },
    deleteAllPosts(state) {
      state.posts = [];
      state.comments = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAndUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsAndUsers.fulfilled, (state, action) => {
        state.posts = action.payload.enrichedPosts;
        state.usersMap = action.payload.usersMap;
        state.isLoading = false;
      })
      .addCase(fetchPostsAndUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleCategoryFilter, updatePostData, deleteAllPosts } =
  postSlice.actions;
export default postSlice.reducer;
