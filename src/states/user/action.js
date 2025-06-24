import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getOwnProfile();
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal memuat profil');
    }
  }
);
