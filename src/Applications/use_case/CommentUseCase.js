import CreateComment from '../../Domains/threads/entities/CreateComment.js';

class CommentUseCase {
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
      throw new Error('COMMENT_USE_CASE.INVALID_TOKEN');
    }

    const thread = await this._threadRepository.getThreadById(useCasePayload.threadId);
    if (!thread) {
      throw new Error('COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const createComment = new CreateComment({ ...useCasePayload, userId: id });
    return this._threadRepository.addComment(createComment);
  }

  async get(threadId) {
    return this._threadRepository.getCommentsByThreadId(threadId);
  }

  async delete(useCasePayload, useCaseHeaders) {
    this._verifyHeaders(useCaseHeaders);
    const accessToken = useCaseHeaders.authorization.split(' ')[1];

    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id } = await this._authenticationTokenManager.decodePayload(accessToken);
    if (!id) {
      throw new Error('COMMENT_USE_CASE.INVALID_TOKEN');
    }

    const comment = await this._threadRepository.getCommentById(useCasePayload.id);
    if (!comment) {
      throw new Error('COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }

    if (id != comment.userId) {
      throw new Error('COMMENT_USE_CASE.UNAUTHORIZED');
    }

    return this._threadRepository.deleteComment(useCasePayload.id);
  }

  _verifyHeaders(headers) {
    if (!headers.authorization) {
      throw new Error('COMMENT_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    const accessToken = headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new Error('COMMENT_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN');
    }

    if (typeof accessToken !== 'string') {
      throw new Error('COMMENT_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default CommentUseCase;