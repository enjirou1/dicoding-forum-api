import CreateThread from '../../Domains/threads/entities/CreateThread.js';

class ThreadUseCase {
  constructor({
    threadRepository,
    authenticationTokenManager
  }) {
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async create(useCasePayload, useCaseHeaders) {
    this._verifyHeaders(useCaseHeaders);
    const accessToken = useCaseHeaders.authorization.split(' ')[1];

    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id } = await this._authenticationTokenManager.decodePayload(accessToken);
    if (!id) {
      throw new Error('THREAD_USE_CASE.INVALID_TOKEN');
    }

    const createThread = new CreateThread({ ...useCasePayload, userId: id });
    return this._threadRepository.addThread(createThread);
  }

  async get(threadId) {
    return this._threadRepository.getThreadById(threadId);
  }

  _verifyHeaders(headers) {
    if (!headers.authorization) {
      throw new Error('THREAD_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    const accessToken = headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new Error('THREAD_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    if (typeof accessToken !== 'string') {
      throw new Error('THREAD_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default ThreadUseCase;