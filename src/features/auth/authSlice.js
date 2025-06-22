import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Constants
const SLICE_NAME = "auth";
const IDLE_STATUS = "idle";
const LOADING_STATUS = "loading";
const SUCCEEDED_STATUS = "succeeded";
const FAILED_STATUS = "failed";

const ERROR_MESSAGES = {
  LOGIN: "Login gagal",
  REGISTER: "Registrasi gagal",
  FETCH_PROFILE: "Gagal memuat profil",
};

// Helper function for consistent error handling
const handleAsyncError = (error, defaultMessage) => {
  return error.message || defaultMessage;
};

// Async Thunks
export const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      return await api.getOwnProfile();
    } catch (error) {
      // Ambil pesan spesifik dari response jika ada
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