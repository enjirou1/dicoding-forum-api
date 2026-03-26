import CreateReply from '../../Domains/threads/entities/CreateReply.js';

class ReplyUseCase {
  constructor({
    threadRepository,
  }) {
    this._threadRepository = threadRepository;
  }

  async create(useCasePayload) {
    const thread = await this._threadRepository.getThreadById(useCasePayload.threadId);
    if (!thread) {
      throw new Error('REPLY_USE_CASE.THREAD_NOT_FOUND');
    }

    const comment = await this._threadRepository.getCommentById(useCasePayload.commentId);
    if (!comment) {
      throw new Error('REPLY_USE_CASE.COMMENT_NOT_FOUND');
    }

    const createReply = new CreateReply(useCasePayload);
    return this._threadRepository.replyComment(createReply);
  }

  async get(threadId) {
    return this._threadRepository.getRepliesByThreadId(threadId);
  }

  async delete(useCasePayload) {
    const reply = await this._threadRepository.getReplyById(useCasePayload.id);
    if (!reply) {
      throw new Error('REPLY_USE_CASE.REPLY_NOT_FOUND');
    }

    if (useCasePayload.userId != reply.userId) {
      throw new Error('REPLY_USE_CASE.UNAUTHORIZED');
    }

    return this._threadRepository.deleteReplyComment(useCasePayload.id);
  }
}

export default ReplyUseCase;