import CreateReply from '../../Domains/threads/entities/CreateReply.js';

class ReplyUseCase {
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
      throw new Error('REPLY_USE_CASE.INVALID_TOKEN');
    }

    const thread = await this._threadRepository.getThreadById(useCasePayload.threadId);
    if (!thread) {
      throw new Error('REPLY_USE_CASE.THREAD_NOT_FOUND');
    }

    const comment = await this._threadRepository.getCommentById(useCasePayload.commentId);
    if (!comment) {
      throw new Error('REPLY_USE_CASE.COMMENT_NOT_FOUND');
    }

    const createReply = new CreateReply({ ...useCasePayload, userId: id });
    return this._threadRepository.replyComment(createReply);
  }

  async get(threadId) {
    return this._threadRepository.getRepliesByThreadId(threadId);
  }

  async delete(useCasePayload, useCaseHeaders) {
    this._verifyHeaders(useCaseHeaders);
    const accessToken = useCaseHeaders.authorization.split(' ')[1];

    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id } = await this._authenticationTokenManager.decodePayload(accessToken);
    if (!id) {
      throw new Error('REPLY_USE_CASE.INVALID_TOKEN');
    }

    const reply = await this._threadRepository.getReplyById(useCasePayload.id);
    if (!reply) {
      throw new Error('REPLY_USE_CASE.REPLY_NOT_FOUND');
    }

    if (id != reply.userId) {
      throw new Error('REPLY_USE_CASE.UNAUTHORIZED');
    }

    return this._threadRepository.deleteReplyComment(useCasePayload.id);
  }

  _verifyHeaders(headers) {
    if (!headers.authorization) {
      throw new Error('REPLY_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    const accessToken = headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new Error('REPLY_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    if (typeof accessToken !== 'string') {
      throw new Error('REPLY_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default ReplyUseCase;