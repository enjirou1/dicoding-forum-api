class Comment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, threadId, userId, createdAt, updatedAt, username, deletedAt, likedBy } = payload;

    this.id = id;
    this.content = content;
    this.threadId = threadId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.deletedAt = deletedAt;
    this.likedBy = likedBy || [];
  }

  _verifyPayload({ id, content, threadId, userId, createdAt, updatedAt, likedBy }) {
    if (!id || !content || !threadId || !userId || !createdAt || (updatedAt && !updatedAt)) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof threadId !== 'string' || typeof userId !== 'string' || !(createdAt instanceof Date) || (updatedAt && !(updatedAt instanceof Date)) || (likedBy && !Array.isArray(likedBy))) {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default Comment;