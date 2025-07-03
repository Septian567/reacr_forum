import { describe, it, expect } from 'vitest';
import reducer from './reducer'; // pastikan path sesuai
import { fetchUserProfile } from './action';
import { logout } from '../auth/reducer';

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

describe('userReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  describe('fetchUserProfile', () => {
    it('should set loading true and reset error on pending', () => {
      const action = { type: fetchUserProfile.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set profile and loading false on fulfilled', () => {
      const payload = { id: 1, name: 'User Test' };
      const action = { type: fetchUserProfile.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.profile).toEqual(payload);
    });

    it('should set error, reset profile, and loading false on rejected', () => {
      const action = {
        type: fetchUserProfile.rejected.type,
        payload: 'Failed to fetch profile',
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.profile).toBeNull();
      expect(state.error).toBe('Failed to fetch profile');
    });
  });

  describe('logout action', () => {
    it('should reset profile, loading, and error to initial state', () => {
      const prevState = {
        profile: { id: 1, name: 'Logged User' },
        loading: true,
        error: 'Some error',
      };
      const state = reducer(prevState, logout());
      expect(state).toEqual(initialState);
    });
  });
});
