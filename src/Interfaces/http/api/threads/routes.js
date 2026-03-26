import express from 'express';
import AuthenticationMiddleware from '../../../../Commons/middlewares/AuthenticationMiddleware.js';
import container from '../../../../Infrastructures/container.js';

const createThreadsRouter = (handler) => {
  const router = express.Router();
  const authenticationMiddleware = container.getInstance(AuthenticationMiddleware.name);

  router.post('/', [authenticationMiddleware.requireAuthentication], handler.postThreadHandler);
  router.get('/:threadId', handler.getThreadHandler);
  router.post('/:threadId/comments', [authenticationMiddleware.requireAuthentication], handler.postCommentHandler);
  router.delete('/:threadId/comments/:commentId', [authenticationMiddleware.requireAuthentication], handler.deleteCommentHandler);
  router.post('/:threadId/comments/:commentId/replies', [authenticationMiddleware.requireAuthentication], handler.postReplyHandler);
  router.delete('/:threadId/comments/:commentId/replies/:replyId', [authenticationMiddleware.requireAuthentication], handler.deleteReplyHandler);

  return router;
};

export default createThreadsRouter;