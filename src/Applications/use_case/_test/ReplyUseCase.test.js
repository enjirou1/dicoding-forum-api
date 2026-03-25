import ReplyUseCase from '../ReplyUseCase.js';
import Reply from '../../../Domains/threads/entities/Reply.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import AuthenticationTokenManager from '../../security/AuthenticationTokenManager.js';
import CreateReply from '../../../Domains/threads/entities/CreateReply.js';
import Thread from '../../../Domains/threads/entities/Thread.js';
import Comment from '../../../Domains/threads/entities/Comment.js';

describe('ReplyUseCase', () => {
  it('should throw error if use case payload not contain access token', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Title',
      body: 'This is body',
      threadId: 'thread-123'
    };
    const replyUseCase = new ReplyUseCase({});

    // Action & Assert
    await expect(replyUseCase.create(useCasePayload, { authorization: '' }))
      .rejects
      .toThrowError('REPLY_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
  });

  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCaseHeaders = {
      authorization: 'Bearer access_token'
    };
    const useCasePayload = {
      content: 'This is content',
      commentId: 'comment-123',
      userId: 'user-123'
    };

    const mockReply = new Reply({
      id: 'reply-123',
      content: 'This is content',
      commentId: 'comment-123',
      userId: 'user-123',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockThread = new Thread({
      id: 'thread-123',
      title: 'Title',
      body: 'This is body',
      userId: 'user-123',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockComment = new Comment({
      id: 'comment-123',
      content: 'This is content',
      threadId: 'thread-123',
      userId: 'user-123',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockThreadRepository = new ThreadRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockThreadRepository.replyComment = vi.fn().mockImplementation(() => Promise.resolve(mockReply));
    mockThreadRepository.getThreadById = vi.fn().mockImplementation(() => Promise.resolve(mockThread));
    mockThreadRepository.getCommentById = vi.fn().mockImplementation(() => Promise.resolve(mockComment));
    mockAuthenticationTokenManager.verifyAccessToken = vi.fn().mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = vi.fn().mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));

    const replyUseCase = new ReplyUseCase({
      threadRepository: mockThreadRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    });

    // Action
    const reply = await replyUseCase.create(useCasePayload, useCaseHeaders);

    // Assert
    expect(reply).toStrictEqual(new Reply({
      id: 'reply-123',
      content: useCasePayload.content,
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    }));
    expect(mockThreadRepository.replyComment).toBeCalledWith(new CreateReply(useCasePayload));
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(useCaseHeaders.authorization.split(' ')[1]);
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(useCaseHeaders.authorization.split(' ')[1]);
  });

  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCaseHeaders = {
      authorization: 'Bearer access_token'
    };
    const useCasePayload = {
      id: 'reply-123'
    };

    const mockReply = new Reply({
      id: 'reply-123',
      content: 'This is content',
      commentId: 'comment-123',
      userId: 'user-123',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockThreadRepository = new ThreadRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockThreadRepository.deleteReplyComment = vi.fn().mockImplementation(() => Promise.resolve(useCasePayload.id));
    mockThreadRepository.getReplyById = vi.fn().mockImplementation(() => Promise.resolve(mockReply));
    mockAuthenticationTokenManager.verifyAccessToken = vi.fn().mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = vi.fn().mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));

    const replyUseCase = new ReplyUseCase({
      threadRepository: mockThreadRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    });

    // Action
    const reply = await replyUseCase.delete(useCasePayload, useCaseHeaders);

    // Assert
    expect(reply).toStrictEqual(useCasePayload.id);
    expect(mockThreadRepository.deleteReplyComment).toBeCalledWith(useCasePayload.id);
  });
});