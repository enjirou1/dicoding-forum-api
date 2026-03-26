import CreateThread from '../../Domains/threads/entities/CreateThread.js';

class ThreadUseCase {
  constructor({
    threadRepository
  }) {
    this._threadRepository = threadRepository;
  }

  async create(useCasePayload) {
    const createThread = new CreateThread(useCasePayload);
    return this._threadRepository.addThread(createThread);
  }

  async get(threadId) {
    return this._threadRepository.getThreadById(threadId);
  }
}

export default ThreadUseCase;