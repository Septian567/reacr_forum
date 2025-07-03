import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  setSelectedCategory,
  deleteAllPosts,
  updatePostData,
} from './reducer';
import { fetchPostsAndUsers, addNewPost, votePost } from './action';

const initialState = {
  posts: [],
  usersMap: {},
  selectedCategory: null,
  isLoading: false,
  error: null,
};

describe('postReducer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  describe('setSelectedCategory', () => {
    it('should set selectedCategory if different category is selected', () => {
      const action = setSelectedCategory('tech');
      const state = reducer(initialState, action);
      expect(state.selectedCategory).toBe('tech');
    });

    it('should unset selectedCategory if same category is selected again', () => {
      const stateWithCategory = {
        ...initialState,
        selectedCategory: 'tech',
      };
      const action = setSelectedCategory('tech');
      const newState = reducer(stateWithCategory, action);
      expect(newState.selectedCategory).toBe(null);
    });
  });

  describe('deleteAllPosts', () => {
    it('should clear posts if user confirms', () => {
      vi.stubGlobal('window', {
        confirm: vi.fn(() => true),
      });

      const stateWithPosts = {
        ...initialState,
        posts: [{ id: 1 }, { id: 2 }],
      };
      const state = reducer(stateWithPosts, deleteAllPosts());
      expect(state.posts).toEqual([]);
    });

    it('should not clear posts if user cancels', () => {
      vi.stubGlobal('window', {
        confirm: vi.fn(() => false),
      });

      const stateWithPosts = {
        ...initialState,
        posts: [{ id: 1 }, { id: 2 }],
      };
      const state = reducer(stateWithPosts, deleteAllPosts());
      expect(state.posts.length).toBe(2);
    });
  });

  describe('updatePostData', () => {
    it('should update post by id', () => {
      const stateWithPosts = {
        ...initialState,
        posts: [
          { id: 1, content: 'Hello' },
          { id: 2, content: 'World' },
        ],
      };
      const updatedPost = { id: 2, content: 'Updated World' };
      const state = reducer(stateWithPosts, updatePostData(updatedPost));
      expect(state.posts[1].content).toBe('Updated World');
    });
  });

  describe('fetchPostsAndUsers async thunk', () => {
    it('should handle pending state correctly', () => {
      const action = { type: fetchPostsAndUsers.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fulfilled state correctly', () => {
      const action = {
        type: fetchPostsAndUsers.fulfilled.type,
        payload: {
          posts: [{ id: 1 }],
          usersMap: { 1: { id: 1, name: 'Alice' } },
        },
      };
      const state = reducer(initialState, action);
      expect(state.posts).toEqual([{ id: 1 }]);
      expect(state.usersMap).toEqual({ 1: { id: 1, name: 'Alice' } });
      expect(state.isLoading).toBe(false);
    });

    it('should handle rejected state correctly', () => {
      const action = {
        type: fetchPostsAndUsers.rejected.type,
        payload: 'Fetch error',
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Fetch error');
    });
  });

  describe('addNewPost async thunk', () => {
    it('should prepend new post to the list', () => {
      const action = {
        type: addNewPost.fulfilled.type,
        payload: { id: 3, content: 'New Post' },
      };
      const prevState = {
        ...initialState,
        posts: [{ id: 1 }],
      };
      const state = reducer(prevState, action);
      expect(state.posts[0].id).toBe(3);
    });
  });

  describe('votePost async thunk', () => {
    it('should update post votes by id', () => {
      const action = {
        type: votePost.fulfilled.type,
        payload: { id: 1, content: 'Updated Vote' },
      };
      const prevState = {
        ...initialState,
        posts: [{ id: 1, content: 'Old Vote' }],
      };
      const state = reducer(prevState, action);
      expect(state.posts[0].content).toBe('Updated Vote');
    });
  });
});
