import ThreadUseCase from '../ThreadUseCase.js';
import Thread from '../../../Domains/threads/entities/Thread.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import CreateThread from '../../../Domains/threads/entities/CreateThread.js';

describe('ThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Title',
      body: 'This is body',
      userId: 'user-123'
    };

    const mockThread = new Thread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      userId: useCasePayload.userId,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = vi.fn().mockImplementation(() => Promise.resolve(mockThread));

    const threadUseCase = new ThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const thread = await threadUseCase.create(useCasePayload);

    // Assert
    expect(thread).toStrictEqual(new Thread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      userId: useCasePayload.userId,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z')
    }));
    expect(mockThreadRepository.addThread).toBeCalledWith(new CreateThread(useCasePayload));
  });
});