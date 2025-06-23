import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { logout } from "../auth/authSlice"; // <-- import logout

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getOwnProfile();
    } catch (error) {
      return rejectWithValue(error.message || "Gagal memuat profil");
    }
  }
);

const userSlice = createSlice({
  name: "user",
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
      // ⬇️ Tambahkan ini agar profile dihapus saat logout
      .addCase(logout, (state) => {
        state.profile = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
