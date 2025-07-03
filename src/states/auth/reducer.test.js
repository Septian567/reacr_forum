import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, {
  logout,
  resetRegisterState,
  resetLoginState,
} from './reducer';
import { registerUser, loginUser, fetchUserProfile } from './action';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  registerLoading: false,
  isRegistered: false,
};

describe('authReducer', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
  });

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = reducer(undefined, action);
    expect(nextState).toEqual(initialState);
  });

  // registerUser
  it('should handle registerUser.pending action correctly', () => {
    const action = { type: registerUser.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      registerLoading: true,
      error: null,
      isRegistered: false,
    });
  });

  it('should handle registerUser.fulfilled action correctly', () => {
    const action = { type: registerUser.fulfilled.type };
    const prevState = { ...initialState, registerLoading: true };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...initialState,
      registerLoading: false,
      isRegistered: true,
    });
  });

  it('should handle registerUser.rejected action correctly', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Register error',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      registerLoading: false,
      error: 'Register error',
      isRegistered: false,
    });
  });

  // loginUser
  it('should handle loginUser.pending action correctly', () => {
    const action = { type: loginUser.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBe(null);
  });

  it('should handle loginUser.fulfilled action correctly', () => {
    const userData = { id: 1, name: 'John' };
    const action = {
      type: loginUser.fulfilled.type,
      payload: userData,
    };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('succeeded');
    expect(nextState.user).toEqual(userData);
  });

  it('should handle loginUser.rejected action correctly', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Login failed',
    };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('failed');
    expect(nextState.user).toBe(null);
    expect(nextState.error).toBe('Login failed');
  });

  // fetchUserProfile
  it('should handle fetchUserProfile.pending action correctly', () => {
    const action = { type: fetchUserProfile.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchUserProfile.fulfilled action correctly', () => {
    const user = { id: 2, name: 'Doe' };
    const action = {
      type: fetchUserProfile.fulfilled.type,
      payload: user,
    };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('succeeded');
    expect(nextState.user).toEqual(user);
  });

  it('should handle fetchUserProfile.rejected action correctly', () => {
    const action = {
      type: fetchUserProfile.rejected.type,
      payload: 'Profile error',
    };
    const nextState = reducer(initialState, action);
    expect(nextState.status).toBe('failed');
    expect(nextState.user).toBe(null);
    expect(nextState.error).toBe('Profile error');
  });

  // logout
  it('should handle logout action correctly', () => {
    const prevState = {
      ...initialState,
      user: { id: 1, name: 'Test' },
      status: 'succeeded',
      error: 'some error',
    };
    const nextState = reducer(prevState, logout());
    expect(nextState).toEqual({
      ...initialState,
    });
  });

  // resetRegisterState
  it('should handle resetRegisterState action correctly', () => {
    const prevState = {
      ...initialState,
      registerLoading: true,
      isRegistered: true,
      error: 'error',
    };
    const nextState = reducer(prevState, resetRegisterState());
    expect(nextState.registerLoading).toBe(false);
    expect(nextState.isRegistered).toBe(false);
    expect(nextState.error).toBe(null);
  });

  // resetLoginState
  it('should handle resetLoginState action correctly', () => {
    const prevState = {
      ...initialState,
      status: 'failed',
      error: 'login error',
    };
    const nextState = reducer(prevState, resetLoginState());
    expect(nextState.status).toBe('idle');
    expect(nextState.error).toBe(null);
  });
});
