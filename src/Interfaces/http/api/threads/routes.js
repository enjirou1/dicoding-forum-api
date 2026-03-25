import express from 'express';

const createThreadsRouter = (handler) => {
  const router = express.Router();

  router.post('/', handler.postThreadHandler);
  router.get('/:threadId', handler.getThreadHandler);
  router.post('/:threadId/comments', handler.postCommentHandler);
  router.delete('/:threadId/comments/:commentId', handler.deleteCommentHandler);
  router.post('/:threadId/comments/:commentId/replies', handler.postReplyHandler);
  router.delete('/:threadId/comments/:commentId/replies/:replyId', handler.deleteReplyHandler);

  return router;
};

export default createThreadsRouter;