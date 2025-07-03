import { describe, it, expect } from 'vitest';
import reducer from './reducer'; // pastikan path-nya benar
import { fetchLeaderboardData } from './action';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

describe('leaderboardReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, unknownAction);
    expect(state).toEqual(initialState);
  });

  it('should handle fetchLeaderboardData.pending action correctly', () => {
    const action = { type: fetchLeaderboardData.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchLeaderboardData.fulfilled action correctly', () => {
    const mockData = [
      { user: 'Alice', score: 100 },
      { user: 'Bob', score: 90 },
    ];
    const action = {
      type: fetchLeaderboardData.fulfilled.type,
      payload: mockData,
    };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(mockData);
  });

  it('should handle fetchLeaderboardData.rejected action correctly', () => {
    const action = {
      type: fetchLeaderboardData.rejected.type,
      payload: 'Network error',
    };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Network error');
  });
});
