/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool.js';

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'thread title',
    body = 'thread body',
    userId = 'user-123',
    createdAt = new Date('2025-01-01T00:00:00.000Z'),
    updatedAt = new Date('2025-01-01T00:00:00.000Z'),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, userId, title, body, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async addComment({
    id = 'comment-123',
    threadId = 'thread-123',
    userId = 'user-123',
    content = 'This is content',
    createdAt = new Date('2025-01-01T00:00:00.000Z'),
    updatedAt = new Date('2025-01-01T00:00:00.000Z'),
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, threadId, userId, content, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteComment(id) {
    const query = {
      text: 'DELETE FROM comments WHERE id = $1',
      values: [id],
    };

    await pool.query(query);
  },

  async addReply({
    id = 'reply-123',
    commentId = 'comment-123',
    userId = 'user-123',
    content = 'This is content',
    createdAt = new Date('2025-01-01T00:00:00.000Z'),
    updatedAt = new Date('2025-01-01T00:00:00.000Z'),
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, commentId, userId, content, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findRepliesById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteReply(id) {
    const query = {
      text: 'DELETE FROM replies WHERE id = $1 AND deleted_at IS NULL',
      values: [id],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
    await pool.query('DELETE FROM comments WHERE 1=1');
    await pool.query('DELETE FROM threads WHERE 1=1');
  }
};

export default ThreadsTableTestHelper;