import Thread from '../../Domains/threads/entities/Thread.js';
import ThreadRepository from '../../Domains/threads/ThreadRepository.js';
import Comment from '../../Domains/threads/entities/Comment.js';
import Reply from '../../Domains/threads/entities/Reply.js';

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(createThread) {
    const { title, body, userId } = createThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING id, user_id AS "userId", title, body, created_at AS "createdAt", updated_at AS "updatedAt"',
      values: [id, userId, title, body],
    };

    const result = await this._pool.query(query);

    return new Thread(result.rows[0]);
  }

  async getThreadById(id) {
    const query = {
      text: `SELECT t.id, t.user_id AS "userId", t.title, t.body, t.created_at AS "createdAt", t.updated_at AS "updatedAt", u.username
             FROM threads t
             JOIN users u ON t.user_id = u.id
             WHERE t.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0] && new Thread(result.rows[0]);
  }

  async addComment(createComment) {
    const { content, threadId, userId } = createComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING id, thread_id AS "threadId", user_id AS "userId", content, created_at AS "createdAt", updated_at AS "updatedAt"',
      values: [id, threadId, userId, content],
    };

    const result = await this._pool.query(query);

    return new Comment(result.rows[0]);
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT c.id, c.thread_id AS "threadId", c.user_id AS "userId", c.content, c.created_at AS "createdAt", c.updated_at AS "updatedAt", u.username, c.deleted_at AS "deletedAt"
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.thread_id = $1
             ORDER BY c.created_at
            `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((comment) => new Comment(comment));
  }

  async getCommentById(id) {
    const query = {
      text: `SELECT c.id, c.thread_id AS "threadId", c.user_id AS "userId", c.content, c.created_at AS "createdAt", c.updated_at AS "updatedAt", u.username
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0] && new Comment(result.rows[0]);
  }

  async deleteComment(id) {
    const query = {
      text: 'UPDATE comments SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async replyComment(createReply) {
    const { content, commentId, userId } = createReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING id, comment_id AS "commentId", user_id AS "userId", content, created_at AS "createdAt", updated_at AS "updatedAt"',
      values: [id, commentId, userId, content],
    };

    const result = await this._pool.query(query);

    return new Reply(result.rows[0]);
  }

  async getRepliesByThreadId(threadId) {
    const query = {
      text: `SELECT r.id, r.comment_id AS "commentId", r.user_id AS "userId", r.content, r.created_at AS "createdAt", r.updated_at AS "updatedAt", u.username, r.deleted_at AS "deletedAt"
             FROM replies r
             JOIN users u ON r.user_id = u.id
             LEFT JOIN comments c ON r.comment_id = c.id
             WHERE c.thread_id = $1
             ORDER BY r.created_at
            `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((reply) => new Reply(reply));
  }

  async getReplyById(id) {
    const query = {
      text: `SELECT r.id, r.comment_id AS "commentId", r.user_id AS "userId", r.content, r.created_at AS "createdAt", r.updated_at AS "updatedAt", u.username
             FROM replies r
             JOIN users u ON r.user_id = u.id
             WHERE r.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0] && new Reply(result.rows[0]);
  }

  async deleteReplyComment(id) {
    const query = {
      text: 'UPDATE replies SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }
}

export default ThreadRepositoryPostgres;