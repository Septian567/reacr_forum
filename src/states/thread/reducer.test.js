import { describe, it, expect } from 'vitest';
import reducer, { clearThreadDetail } from './reducer'; // pastikan path sesuai
import {
  fetchThreadDetail,
  fetchAllUsers,
  voteThread,
  voteComment,
  createComment,
} from './action';

const initialState = {
  threadDetail: null,
  users: [],
  loading: false,
  error: null,
};

describe('threadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, unknownAction);
    expect(state).toEqual(initialState);
  });

  it('should handle clearThreadDetail correctly', () => {
    const prevState = {
      ...initialState,
      threadDetail: { id: 1, title: 'Thread Title' },
    };
    const state = reducer(prevState, clearThreadDetail());
    expect(state.threadDetail).toBeNull();
  });

  describe('fetchThreadDetail', () => {
    it('should set loading true on pending', () => {
      const action = { type: fetchThreadDetail.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('should set threadDetail and loading false on fulfilled', () => {
      const action = {
        type: fetchThreadDetail.fulfilled.type,
        payload: { id: 1, title: 'Detail' },
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.threadDetail).toEqual(action.payload);
    });

    it('should set error and loading false on rejected', () => {
      const action = {
        type: fetchThreadDetail.rejected.type,
        error: { message: 'Error occurred' },
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error occurred');
    });
  });

  describe('fetchAllUsers', () => {
    it('should populate users on fulfilled', () => {
      const action = {
        type: fetchAllUsers.fulfilled.type,
        payload: [{ id: 1, name: 'Alice' }],
      };
      const state = reducer(initialState, action);
      expect(state.users).toEqual([{ id: 1, name: 'Alice' }]);
    });
  });

  describe('matcher (thread/.*fulfilled)', () => {
    it('should update threadDetail if payload has id', () => {
      const action = {
        type: voteThread.fulfilled.type,
        payload: { id: 99, content: 'updated thread' },
      };
      const state = reducer(initialState, action);
      expect(state.threadDetail).toEqual(action.payload);
    });

    it('should not update threadDetail if payload has no id', () => {
      const prevState = {
        ...initialState,
        threadDetail: { id: 1, content: 'original' },
      };
      const action = {
        type: voteComment.fulfilled.type,
        payload: { message: 'voted comment' }, // no `id`
      };
      const state = reducer(prevState, action);
      expect(state.threadDetail).toEqual(prevState.threadDetail);
    });

    it('should update threadDetail from createComment fulfilled if payload has id', () => {
      const action = {
        type: createComment.fulfilled.type,
        payload: { id: 42, content: 'new comment' },
      };
      const state = reducer(initialState, action);
      expect(state.threadDetail).toEqual(action.payload);
    });
  });
});
