// store/auth/reducer.js

import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { loginUser, registerUser, fetchUserProfile } from './action';

const SLICE_NAME = 'auth';

const IDLE_STATUS = 'idle';
const LOADING_STATUS = 'loading';
const SUCCEEDED_STATUS = 'succeeded';
const FAILED_STATUS = 'failed';

// Initial State
const initialState = {
  user: null,
  status: IDLE_STATUS,
  error: null,
  registerLoading: false,
  isRegistered: false,
};

// Reducer Cases
const registerUserCases = (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
      state.error = null;
      state.isRegistered = false;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.registerLoading = false;
      state.isRegistered = true;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.registerLoading = false;
      state.error = action.payload;
      state.isRegistered = false;
    });
};

const loginUserCases = (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.status = LOADING_STATUS;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = SUCCEEDED_STATUS;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = FAILED_STATUS;
      state.user = null;
      state.error = action.payload;
    });
};

const fetchUserProfileCases = (builder) => {
  builder
    .addCase(fetchUserProfile.pending, (state) => {
      state.status = LOADING_STATUS;
      state.error = null;
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = SUCCEEDED_STATUS;
      state.user = action.payload;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = FAILED_STATUS;
      state.user = null;
      state.error = action.payload;
    });
};

// Slice
export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = IDLE_STATUS;
      state.error = null;
      api.removeAccessToken();
    },
    resetRegisterState(state) {
      state.registerLoading = false;
      state.isRegistered = false;
      state.error = null;
    },
    resetLoginState(state) {
      state.status = IDLE_STATUS;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    registerUserCases(builder);
    loginUserCases(builder);
    fetchUserProfileCases(builder);
  },
});

export const { logout, resetRegisterState, resetLoginState } =
  authSlice.actions;
export default authSlice.reducer;
