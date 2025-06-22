import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk: ambil semua thread dan user, lalu enrich data
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

      const enrichedPosts = await Promise.all(
        threads.map(async (thread) => {
          try {
            const detail = await api.getThreadDetail(thread.id);
            const owner = usersMap[thread.ownerId];
            return {
              ...thread,
              ...detail,
              author: owner?.name || "Anonim",
              avatar: owner?.avatar || "https://via.placeholder.com/40",
              totalComments: detail.comments?.length || 0,
            };
          } catch {
            const owner = usersMap[thread.ownerId];
            return {
              ...thread,
              author: owner?.name || "Anonim",
              avatar: owner?.avatar || "https://via.placeholder.com/40",
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

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost, { rejectWithValue }) => {
    try {
      const response = await api.createThread(newPost);
      const threadId = response.data.thread.id;
      const detail = await api.getThreadDetail(threadId);

      return {
        ...detail,
        author: newPost.user?.name || "Anonim",
        avatar: newPost.user?.avatar || "https://via.placeholder.com/40",
        totalComments: detail.comments?.length || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const votePost = createAsyncThunk(
  "posts/votePost",
  async ({ postId, type }, { getState, rejectWithValue }) => {
    try {
      if (type === "up") {
        await api.upVoteThread(postId);
      } else if (type === "down") {
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
        author: oldPost?.author || usersMap[updated.ownerId]?.name || "Anonim",
        avatar:
          oldPost?.avatar ||
          usersMap[updated.ownerId]?.avatar ||
          "https://via.placeholder.com/40",
        totalComments: updated.comments?.length || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
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
      if (window.confirm("Hapus semua postingan lokal?")) {
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

// Export actions & reducer
export const { setSelectedCategory, deleteAllPosts, updatePostData } =
  postSlice.actions;
export default postSlice.reducer;
