import CreateComment from '../../Domains/threads/entities/CreateComment.js';

class CommentUseCase {
  constructor({
    threadRepository
  }) {
    this._threadRepository = threadRepository;
  }

  async create(useCasePayload) {
    const thread = await this._threadRepository.getThreadById(useCasePayload.threadId);
    if (!thread) {
      throw new Error('COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const createComment = new CreateComment(useCasePayload);
    return this._threadRepository.addComment(createComment);
  }

  async get(threadId) {
    return this._threadRepository.getCommentsByThreadId(threadId);
  }

  async delete(useCasePayload) {
    const comment = await this._threadRepository.getCommentById(useCasePayload.id);
    if (!comment) {
      throw new Error('COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }

    if (useCasePayload.userId != comment.userId) {
      throw new Error('COMMENT_USE_CASE.UNAUTHORIZED');
    }

    return this._threadRepository.deleteComment(useCasePayload.id);
  }

  async like(useCasePayload) {
    const thread = await this._threadRepository.getThreadById(useCasePayload.threadId);
    if (!thread) {
      throw new Error('COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const comment = await this._threadRepository.getCommentById(useCasePayload.commentId);
    if (!comment) {
      throw new Error('COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }

    await this._threadRepository.likeComment(useCasePayload);
  }
}

export default CommentUseCase;