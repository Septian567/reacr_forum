import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser, registerUser, fetchUserProfile } from './action';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

describe('auth actions', () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should dispatch fulfilled action with user data on success', async () => {
      const mockToken = 'mockToken123';
      const mockUser = { id: 'user1', name: 'John' };

      api.login.mockResolvedValue(mockToken);
      api.getOwnProfile.mockResolvedValue(mockUser);

      const thunk = loginUser({ email: 'test@mail.com', password: '123456' });
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(api.login).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: '123456',
      });
      expect(api.putAccessToken).toHaveBeenCalledWith(mockToken);
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(result.payload).toEqual(mockUser);
      expect(result.type).toBe('auth/loginUser/fulfilled');
    });

    it('should dispatch rejected action on failure', async () => {
      api.login.mockRejectedValue(new Error('Invalid credentials'));

      const thunk = loginUser({
        email: 'test@mail.com',
        password: 'wrongpass',
      });
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('auth/loginUser/rejected');
      expect(result.payload).toBe('Invalid credentials');
    });
  });

  describe('registerUser', () => {
    it('should dispatch fulfilled action on successful registration', async () => {
      api.register.mockResolvedValue(true);

      const thunk = registerUser({
        name: 'John',
        email: 'john@mail.com',
        password: '123456',
      });

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(api.register).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@mail.com',
        password: '123456',
      });
      expect(result.type).toBe('auth/registerUser/fulfilled');
      expect(result.payload).toBe(true);
    });

    it('should dispatch rejected action on registration failure', async () => {
      api.register.mockRejectedValue(new Error('Email sudah digunakan'));

      const thunk = registerUser({
        name: 'John',
        email: 'john@mail.com',
        password: '123456',
      });

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('auth/registerUser/rejected');
      expect(result.payload).toBe('Email sudah digunakan');
    });
  });

  describe('fetchUserProfile', () => {
    it('should dispatch fulfilled action with user data', async () => {
      const mockUser = { id: 'user123', name: 'Jane' };
      api.getOwnProfile.mockResolvedValue(mockUser);

      const thunk = fetchUserProfile();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(result.type).toBe('auth/fetchUserProfile/fulfilled');
      expect(result.payload).toEqual(mockUser);
    });

    it('should dispatch rejected action on failure', async () => {
      api.getOwnProfile.mockRejectedValue(new Error('Unauthorized'));

      const thunk = fetchUserProfile();
      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('auth/fetchUserProfile/rejected');
      expect(result.payload).toBe('Unauthorized');
    });
  });
});
