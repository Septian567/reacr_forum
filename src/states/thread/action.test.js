import {
  fetchThreadDetail,
  fetchAllUsers,
  voteThread,
  voteComment,
  createComment,
} from './action';
import api from '../../utils/api';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../utils/api');

const mockThreadId = 'thread-1';
const mockCommentId = 'comment-1';

const mockUsers = [
  {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://avatar-john.jpg',
  },
  {
    id: 'users-2',
    name: 'Jane Smith',
    avatar: 'https://avatar-jane.jpg',
  },
];

const mockThreadDetail = {
  id: mockThreadId,
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://avatar-john.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: mockCommentId,
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Smith',
        avatar: 'https://avatar-jane.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('thread actions', () => {
  it('should fetch thread detail', async () => {
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const result = await fetchThreadDetail(mockThreadId)(vi.fn(), vi.fn(), {});
    expect(result.payload).toEqual(mockThreadDetail);
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);
  });

  it('should fetch all users', async () => {
    api.getAllUsers.mockResolvedValue(mockUsers);

    const result = await fetchAllUsers()(vi.fn(), vi.fn(), {});
    expect(result.payload).toEqual(mockUsers);
    expect(api.getAllUsers).toHaveBeenCalled();
  });

  it('should vote thread (up)', async () => {
    const mockUpVoteResponse = {
      status: 'success',
      message: 'Thread upvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: mockThreadId,
          voteType: 1,
        },
      },
    };

    api.upVoteThread.mockResolvedValue(mockUpVoteResponse);
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const result = await voteThread({ id: mockThreadId, type: 'up' })(
      vi.fn(),
      vi.fn(),
      {}
    );

    expect(api.upVoteThread).toHaveBeenCalledWith(mockThreadId);
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);
    expect(result.payload).toEqual(mockThreadDetail);
  });

  it('should vote thread (down)', async () => {
    const mockDownVoteResponse = {
      status: 'success',
      message: 'Thread downvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: mockThreadId,
          voteType: -1,
        },
      },
    };

    api.downVoteThread.mockResolvedValue(mockDownVoteResponse);
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const result = await voteThread({ id: mockThreadId, type: 'down' })(
      vi.fn(),
      vi.fn(),
      {}
    );

    expect(api.downVoteThread).toHaveBeenCalledWith(mockThreadId);
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);
    expect(result.payload).toEqual(mockThreadDetail);
  });

  it('should vote comment (up)', async () => {
    const mockUpVoteCommentResponse = {
      status: 'success',
      message: 'Comment upvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: mockCommentId,
          voteType: 1,
        },
      },
    };

    api.upVoteComment.mockResolvedValue(mockUpVoteCommentResponse);
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const result = await voteComment({
      threadId: mockThreadId,
      commentId: mockCommentId,
      type: 'up',
    })(vi.fn(), vi.fn(), {});

    expect(api.upVoteComment).toHaveBeenCalledWith({
      threadId: mockThreadId,
      commentId: mockCommentId,
    });
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);
    expect(result.payload).toEqual(mockThreadDetail);
  });

  it('should vote comment (down)', async () => {
    const mockDownVoteCommentResponse = {
      status: 'success',
      message: 'Comment downvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: mockCommentId,
          voteType: -1,
        },
      },
    };

    api.downVoteComment.mockResolvedValue(mockDownVoteCommentResponse);
    api.getThreadDetail.mockResolvedValue(mockThreadDetail);

    const result = await voteComment({
      threadId: mockThreadId,
      commentId: mockCommentId,
      type: 'down',
    })(vi.fn(), vi.fn(), {});

    expect(api.downVoteComment).toHaveBeenCalledWith({
      threadId: mockThreadId,
      commentId: mockCommentId,
    });
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);
    expect(result.payload).toEqual(mockThreadDetail);
  });

  it('should create comment and return updated thread', async () => {
    const newComment = {
      id: mockCommentId,
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    // Simulasikan response API sesuai dokumentasi
    api.createComment.mockResolvedValue({
      status: 'success',
      message: 'Comment created',
      data: {
        comment: newComment,
      },
    });

    // Setelah komentar dibuat, API getThreadDetail dipanggil untuk mendapatkan thread terbaru
    api.getThreadDetail.mockResolvedValue({
      ...mockThreadDetail,
      comments: [newComment], // Masukkan komentar baru ke thread
    });

    const result = await createComment({
      threadId: mockThreadId,
      content: 'Test',
    })(vi.fn(), vi.fn(), {});

    expect(api.createComment).toHaveBeenCalledWith({
      threadId: mockThreadId,
      content: 'Test',
    });
    expect(api.getThreadDetail).toHaveBeenCalledWith(mockThreadId);

    // Periksa bahwa komentar baru dimasukkan dalam thread
    expect(result.payload.comments).toContainEqual(newComment);
  });
});
