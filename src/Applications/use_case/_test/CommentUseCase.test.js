import CommentUseCase from '../CommentUseCase.js';
import Comment from '../../../Domains/threads/entities/Comment.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import CreateComment from '../../../Domains/threads/entities/CreateComment.js';
import Thread from '../../../Domains/threads/entities/Thread.js';

describe('CommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'This is content',
      threadId: 'thread-123',
      userId: 'user-123'
    };

    const mockComment = new Comment({
      id: 'comment-123',
      content: 'This is content',
      threadId: 'thread-123',
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

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addComment = vi.fn().mockImplementation(() => Promise.resolve(mockComment));
    mockThreadRepository.getThreadById = vi.fn().mockImplementation(() => Promise.resolve(mockThread));

    const commentUseCase = new CommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const comment = await commentUseCase.create(useCasePayload);

    // Assert
    expect(comment).toStrictEqual(new Comment({
      id: 'comment-123',
      content: useCasePayload.content,
      threadId: useCasePayload.threadId,
      userId: useCasePayload.userId,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    }));
    expect(mockThreadRepository.addComment).toBeCalledWith(new CreateComment(useCasePayload));
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      userId: 'user-123'
    };

    const mockComment = new Comment({
      id: 'comment-123',
      content: 'This is content',
      threadId: 'thread-123',
      userId: 'user-123',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.deleteComment = vi.fn().mockImplementation(() => Promise.resolve(useCasePayload.id));
    mockThreadRepository.getCommentById = vi.fn().mockImplementation(() => Promise.resolve(mockComment));

    const commentUseCase = new CommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const comment = await commentUseCase.delete(useCasePayload);

    // Assert
    expect(comment).toStrictEqual(useCasePayload.id);
    expect(mockThreadRepository.deleteComment).toBeCalledWith(useCasePayload.id);
  });
});