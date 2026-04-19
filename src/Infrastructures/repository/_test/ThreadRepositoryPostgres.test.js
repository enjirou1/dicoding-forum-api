import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import CreateThread from '../../../Domains/threads/entities/CreateThread.js';
import pool from '../../database/postgres/pool.js';
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres.js';
import CreateComment from '../../../Domains/threads/entities/CreateComment.js';
import CreateReply from '../../../Domains/threads/entities/CreateReply.js';
import { nanoid } from 'nanoid';

describe('ThreadRepositoryPostgres', () => {
  // afterEach(async () => {
  //   await ThreadsTableTestHelper.cleanTable();
  //   await UsersTableTestHelper.cleanTable();
  // });

  beforeEach(async () => {
    await pool.query('BEGIN');
  });

  afterEach(async () => {
    await pool.query('ROLLBACK');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread and return thread correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${nanoid()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      const createThread = new CreateThread({ title: 'Title', body: 'This is body', userId });
      const fakeIdGenerator = () => 'abc';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepository.addThread(createThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-abc');
      expect(threads).toHaveLength(1);
    });

    it('should return thread correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${nanoid()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      const createThread = new CreateThread({ title: 'Title', body: 'This is body', userId });
      const fakeIdGenerator = () => 'def';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const thread = await threadRepository.addThread(createThread);

      // Assert
      expect(thread.id).toBe('thread-def');
      expect(thread.title).toBe(createThread.title);
      expect(thread.body).toBe(createThread.body);
      expect(thread.userId).toBe(createThread.userId);
      expect(thread.createdAt).toBeInstanceOf(Date);
      expect(thread.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('addComment function', () => {
    it('should persist new comment and return comment correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      const threadId = `thread-${Date.now()}`;
      await ThreadsTableTestHelper.addThread({ id: threadId, userId });
      const createComment = new CreateComment({ content: 'This is content', threadId, userId });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepository.addComment(createComment);

      // Assert
      const comments = await ThreadsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return comment correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      await ThreadsTableTestHelper.addThread({ id: 'thread-456', userId });
      const createComment = new CreateComment({ content: 'This is content', threadId: 'thread-456', userId });
      const fakeIdGenerator = () => '456';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const comment = await threadRepository.addComment(createComment);

      // Assert
      expect(comment.id).toBe(`comment-${fakeIdGenerator()}`);
      expect(comment.content).toBe(createComment.content);
      expect(comment.threadId).toBe(createComment.threadId);
      expect(comment.userId).toBe(createComment.userId);
      expect(comment.createdAt).toBeInstanceOf(Date);
      expect(comment.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId });
      await ThreadsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepository.deleteComment('comment-123');

      // Assert
      const comments = await ThreadsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(0);
    });
  });

  describe('addReply function', () => {
    it('should persist new reply and return reply correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId });
      await ThreadsTableTestHelper.addComment({ id: 'comment-123', userId });
      const createReply = new CreateReply({ content: 'This is content', commentId: 'comment-123', userId });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepository.replyComment(createReply);

      // Assert
      const replies = await ThreadsTableTestHelper.findRepliesById('reply-123');
      expect(replies).toHaveLength(1);
    });

    it('should return reply correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId });
      await ThreadsTableTestHelper.addComment({ id: 'comment-123', userId });
      const createReply = new CreateReply({ content: 'This is content', commentId: 'comment-123', userId });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const reply = await threadRepository.replyComment(createReply);

      // Assert
      expect(reply.id).toBe(`reply-${fakeIdGenerator()}`);
      expect(reply.content).toBe(createReply.content);
      expect(reply.commentId).toBe(createReply.commentId);
      expect(reply.userId).toBe(createReply.userId);
      expect(reply.createdAt).toBeInstanceOf(Date);
      expect(reply.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('deleteReply function', () => {
    it('should delete reply correctly', async () => {
      // Arrange
      const userId = `user-${nanoid()}`;
      const username = `dicoding-${Date.now()}-${Math.random()}`;
      await UsersTableTestHelper.addUser({ id: userId, username });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId });
      await ThreadsTableTestHelper.addComment({ id: 'comment-123', userId });
      await ThreadsTableTestHelper.addReply({ id: 'reply-123', userId });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepository.deleteReplyComment('reply-123');

      // Assert
      const replies = await ThreadsTableTestHelper.findRepliesById('reply-123');
      expect(replies).toHaveLength(0);
    });
  });
});