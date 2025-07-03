import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchLeaderboardData, cache } from './action';
import api from '../../utils/api';

// Mock API module
vi.mock('../../utils/api');

describe('fetchLeaderboardData', () => {
  const mockLeaderboards = [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      score: 5,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // 🔁 Reset cache state
    cache.data = null;
    cache.lastFetch = 0;
  });

  it('should fetch leaderboards and return data', async () => {
    api.getLeaderboards.mockResolvedValueOnce(mockLeaderboards);

    const thunk = fetchLeaderboardData();
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(api.getLeaderboards).toHaveBeenCalledTimes(1);
    expect(result.payload).toEqual(mockLeaderboards);
    expect(result.type).toBe('leaderboard/fetch/fulfilled');
  });

  it('should return cached data if within TTL', async () => {
    api.getLeaderboards.mockResolvedValueOnce(mockLeaderboards);

    // First call to fill the cache
    await fetchLeaderboardData()(vi.fn(), vi.fn(), undefined);

    // Second call should use cache, not call API
    const result = await fetchLeaderboardData()(vi.fn(), vi.fn(), undefined);

    expect(api.getLeaderboards).toHaveBeenCalledOnce(); // Only 1 API call
    expect(result.payload).toEqual(mockLeaderboards);
  });

  it('should handle API error gracefully', async () => {
    const errorMessage = 'Network error';
    api.getLeaderboards.mockRejectedValueOnce(new Error(errorMessage));

    const result = await fetchLeaderboardData()(vi.fn(), vi.fn(), undefined);

    expect(api.getLeaderboards).toHaveBeenCalledTimes(1);
    expect(result.payload).toBe(errorMessage);
    expect(result.type).toBe('leaderboard/fetch/rejected');
  });
});
