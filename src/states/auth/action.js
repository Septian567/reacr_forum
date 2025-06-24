// store/auth/action.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const SLICE_NAME = 'auth';
const ERROR_MESSAGES = {
  LOGIN: 'Login gagal',
  REGISTER: 'Registrasi gagal',
  FETCH_PROFILE: 'Gagal memuat profil',
};

// Helper function
const handleAsyncError = (error, defaultMessage) => {
  return error.message || defaultMessage;
};

export const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      return await api.getOwnProfile();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        ERROR_MESSAGES.LOGIN;
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error, ERROR_MESSAGES.REGISTER));
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  `${SLICE_NAME}/fetchUserProfile`,
  async (_, { rejectWithValue }) => {
    try {
      return await api.getOwnProfile();
    } catch (error) {
      return rejectWithValue(
        handleAsyncError(error, ERROR_MESSAGES.FETCH_PROFILE)
      );
    }
  }
);
