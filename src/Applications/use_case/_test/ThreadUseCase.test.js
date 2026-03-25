import ThreadUseCase from '../ThreadUseCase.js';
import Thread from '../../../Domains/threads/entities/Thread.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import AuthenticationTokenManager from '../../security/AuthenticationTokenManager.js';
import CreateThread from '../../../Domains/threads/entities/CreateThread.js';

describe('ThreadUseCase', () => {
  it('should throw error if use case not contain access token', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Title',
      body: 'This is body',
      userId: 'user-123'
    };
    const threadUseCase = new ThreadUseCase({});

    // Action & Assert
    await expect(threadUseCase.create(useCasePayload, { authorization: '' }))
      .rejects
      .toThrowError('THREAD_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
  });

  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCaseHeaders = {
      authorization: 'Bearer access_token'
    };
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
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockThreadRepository.addThread = vi.fn().mockImplementation(() => Promise.resolve(mockThread));
    mockAuthenticationTokenManager.verifyAccessToken = vi.fn().mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = vi.fn().mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));

    const threadUseCase = new ThreadUseCase({
      threadRepository: mockThreadRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    });

    // Action
    const thread = await threadUseCase.create(useCasePayload, useCaseHeaders);

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
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(useCaseHeaders.authorization.split(' ')[1]);
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(useCaseHeaders.authorization.split(' ')[1]);
  });
});