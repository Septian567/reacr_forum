// store/posts/reducer.js

import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchPostsAndUsers, addNewPost, votePost } from './action';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    usersMap: {},
    selectedCategory: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory =
        state.selectedCategory === action.payload ? null : action.payload;
    },
    deleteAllPosts: (state) => {
      if (window.confirm('Hapus semua postingan lokal?')) {
        state.posts = [];
      }
    },
    updatePostData: (state, action) => {
      const updated = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === updated.id ? { ...post, ...updated } : post
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAndUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsAndUsers.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.usersMap = action.payload.usersMap;
        state.isLoading = false;
      })
      .addCase(fetchPostsAndUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(votePost.fulfilled, (state, action) => {
        const updated = action.payload;
        state.posts = state.posts.map((post) =>
          post.id === updated.id ? updated : post
        );
      });
  },
});

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectSelectedCategory = (state) => state.posts.selectedCategory;

export const selectFilteredPosts = createSelector(
  [selectAllPosts, selectSelectedCategory],
  (posts, category) => {
    if (!category) return posts;
    return posts.filter((post) => post.category === category);
  }
);

export const { setSelectedCategory, deleteAllPosts, updatePostData } =
  postSlice.actions;

export default postSlice.reducer;
