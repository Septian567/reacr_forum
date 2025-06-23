// src/features/user/reducer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './action';
import { logout } from '../auth/reducer'; // pastikan ini sesuai path ekspor logout

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.profile = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
