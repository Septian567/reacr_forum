import { describe, it, expect, vi, beforeEach } from 'vitest';
vi.mock('../../utils/api', () => ({
  default: {
    getAllThreads: vi.fn(),
    getAllUsers: vi.fn(),
    getThreadDetail: vi.fn(),
    createThread: vi.fn(),
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
  },
}));

import api from '../../utils/api';
import { fetchPostsAndUsers, addNewPost, votePost } from './action';

const mockUsers = [
  { id: 'users-1', name: 'John Doe', avatar: 'https://avatar-1.jpg' },
  { id: 'users-2', name: 'Jane Smith', avatar: 'https://avatar-2.jpg' },
];

const mockThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 1,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const mockThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://avatar-1.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://avatar-1.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('posts async actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchPostsAndUsers should return enriched posts', async () => {
    api.getAllThreads.mockResolvedValue(mockThreads);
    api.getAllUsers.mockResolvedValue(mockUsers);
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const thunk = fetchPostsAndUsers();
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload.posts).toHaveLength(2);
    expect(result.payload.posts[0]).toMatchObject({
      author: 'John Doe',
      avatar: 'https://avatar-1.jpg',
    });
  });

  it('addNewPost should return new post detail enriched', async () => {
    const newPost = {
      title: 'New Title',
      body: 'New Body',
      category: 'General',
      user: { name: 'Tester', avatar: 'https://test-avatar.jpg' },
    };

    // Mock sesuai dokumentasi API createThread
    api.createThread.mockResolvedValue({
      status: 'success',
      message: 'Thread created',
      data: {
        thread: {
          id: 'thread-3',
          title: 'New Title',
          body: 'New Body',
          category: 'General',
          createdAt: '2021-07-01T10:00:00.000Z',
          ownerId: 'users-999',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    });

    api.getThreadDetail.mockResolvedValue({
      id: 'thread-3',
      title: 'New Title',
      body: 'New Body',
      category: 'General',
      createdAt: '2021-07-01T10:00:00.000Z',
      owner: {
        id: 'users-999',
        name: 'Tester',
        avatar: 'https://test-avatar.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    });

    const thunk = addNewPost(newPost);
    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await thunk(dispatch, getState, undefined);

    expect(result.meta?.requestStatus ?? 'fulfilled').toBe('fulfilled');
    expect(result.payload.id).toBe('thread-3');
    expect(result.payload.author).toBe('Tester');
    expect(result.payload.avatar).toBe('https://test-avatar.jpg');
  });

  it('votePost should return updated thread detail', async () => {
    const mockState = {
      posts: {
        usersMap: {
          'users-1': { name: 'John Doe', avatar: 'https://avatar-1.jpg' },
        },
        posts: [
          {
            id: 'thread-1',
            author: 'John Doe',
            avatar: 'https://avatar-1.jpg',
          },
        ],
      },
    };

    api.upVoteThread.mockResolvedValue({});
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const thunk = votePost({ postId: 'thread-1', type: 'up' });
    const dispatch = vi.fn();
    const getState = vi.fn(() => mockState);

    const result = await thunk(dispatch, getState, undefined);

    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(result.payload.id).toBe('thread-1');
    expect(result.payload.author).toBe('John Doe');
  });
});
