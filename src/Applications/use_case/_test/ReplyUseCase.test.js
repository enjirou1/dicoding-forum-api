import ReplyUseCase from '../ReplyUseCase.js';
import Reply from '../../../Domains/threads/entities/Reply.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import CreateReply from '../../../Domains/threads/entities/CreateReply.js';
import Thread from '../../../Domains/threads/entities/Thread.js';
import Comment from '../../../Domains/threads/entities/Comment.js';

describe('ReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
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

    mockThreadRepository.replyComment = vi.fn().mockImplementation(() => Promise.resolve(mockReply));
    mockThreadRepository.getThreadById = vi.fn().mockImplementation(() => Promise.resolve(mockThread));
    mockThreadRepository.getCommentById = vi.fn().mockImplementation(() => Promise.resolve(mockComment));

    const replyUseCase = new ReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const reply = await replyUseCase.create(useCasePayload);

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
  });

  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'reply-123',
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

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.deleteReplyComment = vi.fn().mockImplementation(() => Promise.resolve(useCasePayload.id));
    mockThreadRepository.getReplyById = vi.fn().mockImplementation(() => Promise.resolve(mockReply));

    const replyUseCase = new ReplyUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const reply = await replyUseCase.delete(useCasePayload);

    // Assert
    expect(reply).toStrictEqual(useCasePayload.id);
    expect(mockThreadRepository.deleteReplyComment).toBeCalledWith(useCasePayload.id);
  });
});