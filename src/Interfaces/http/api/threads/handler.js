import ThreadUseCase from '../../../../Applications/use_case/ThreadUseCase.js';
import CommentUseCase from '../../../../Applications/use_case/CommentUseCase.js';
import ReplyUseCase from '../../../../Applications/use_case/ReplyUseCase.js';

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postThreadHandler(req, res, next) {
    try {
      const threadUseCase = this._container.getInstance(ThreadUseCase.name);
      const addedThread = await threadUseCase.create({ ...req.body, userId: res.locals.user.id });

      res.status(201).json({
        status: 'success',
        data: {
          addedThread: {
            id: addedThread.id,
            title: addedThread.title,
            owner: addedThread.userId,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getThreadHandler(req, res, next) {
    try {
      const threadUseCase = this._container.getInstance(ThreadUseCase.name);
      const thread = await threadUseCase.get(req.params.threadId);

      const commentUseCase = this._container.getInstance(CommentUseCase.name);
      const comments = await commentUseCase.get(req.params.threadId);

      const replyUseCase = this._container.getInstance(ReplyUseCase.name);
      const replies = await replyUseCase.get(req.params.threadId);

      const newThread = {
        id: thread.id,
        title: thread.title,
        body: thread.body,
        date: thread.createdAt,
        username: thread.username,
      };
      newThread.comments = comments.map((comment) => {
        return {
          id: comment.id,
          username: comment.username,
          content: comment.deletedAt ? '**komentar telah dihapus**' : comment.content,
          date: comment.createdAt,
          replies: replies.filter((reply) => reply.commentId === comment.id).map((reply) => {
            return {
              id: reply.id,
              username: reply.username,
              content: reply.deletedAt ? '**balasan telah dihapus**' : reply.content,
              date: reply.createdAt,
            };
          })
        };
      });

      res.json({
        status: 'success',
        data: {
          thread: newThread,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async postCommentHandler(req, res, next) {
    try {
      const commentUseCase = this._container.getInstance(CommentUseCase.name);
      const addedComment = await commentUseCase.create({ ...req.body, threadId: req.params.threadId, userId: res.locals.user.id });

      res.status(201).json({
        status: 'success',
        data: {
          addedComment: {
            id: addedComment.id,
            content: addedComment.content,
            owner: addedComment.userId,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCommentHandler(req, res, next) {
    try {
      const commentUseCase = this._container.getInstance(CommentUseCase.name);
      await commentUseCase.delete({ id: req.params.commentId, userId: res.locals.user.id });

      res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }

  async postReplyHandler(req, res, next) {
    try {
      const replyUseCase = this._container.getInstance(ReplyUseCase.name);
      const addedReply = await replyUseCase.create({ ...req.body, threadId: req.params.threadId, commentId: req.params.commentId, userId: res.locals.user.id });

      res.status(201).json({
        status: 'success',
        data: {
          addedReply: {
            id: addedReply.id,
            content: addedReply.content,
            owner: addedReply.userId,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReplyHandler(req, res, next) {
    try {
      const replyUseCase = this._container.getInstance(ReplyUseCase.name);
      await replyUseCase.delete({ id: req.params.replyId, userId: res.locals.user.id });

      res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ThreadsHandler;